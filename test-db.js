const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL);
        console.log('Connected to MySQL successfully!');

        const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
        console.log('Test query result:', rows[0].solution);

        await connection.end();
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

testConnection();
