const mysql = require('mysql2/promise');
require('dotenv').config();

async function createTable() {
    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL);
        console.log('Connected to MySQL successfully!');

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS announcements (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                image LONGTEXT,
                ctaText VARCHAR(255) DEFAULT 'Solicitar Oferta',
                active BOOLEAN DEFAULT TRUE,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await connection.execute(createTableQuery);
        console.log('Table "announcements" created or already exists.');

        await connection.end();
    } catch (err) {
        console.error('Error creating table:', err);
    }
}

createTable();
