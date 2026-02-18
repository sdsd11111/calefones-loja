const mysql = require('mysql2/promise');
require('dotenv').config();

async function createLeadsTable() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT || '40427'),
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD
        });
        console.log('Connected to MySQL successfully!');

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS leads (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                sector VARCHAR(255),
                service VARCHAR(255),
                message TEXT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await connection.execute(createTableQuery);
        console.log('Table "leads" created or already exists.');

        await connection.end();
    } catch (err) {
        console.error('Error creating table:', err);
    }
}

createLeadsTable();
