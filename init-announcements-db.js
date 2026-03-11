const mysql = require('mysql2/promise');
require('dotenv').config();

async function createAnnouncementsTable() {
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
            CREATE TABLE IF NOT EXISTS announcements (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                image VARCHAR(255),
                ctaText VARCHAR(255),
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

createAnnouncementsTable();
