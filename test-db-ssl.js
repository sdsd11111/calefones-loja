const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
    console.log('Testing connection to:', process.env.DATABASE_HOST);
    try {
        const connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT || '40427'),
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            ssl: { rejectUnauthorized: false }
        });
        console.log('Connected successfully!');

        const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
        console.log('Query result:', rows[0].solution);

        await connection.end();
    } catch (err) {
        console.error('Connection failed:', err);
    }
}

testConnection();
