const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
    const pool = mysql.createPool({
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || '40427'),
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    });

    const queries = [
        // Add image_data_2 and image_data_3 columns to leads
        { sql: 'ALTER TABLE leads ADD COLUMN image_data_2 LONGBLOB NULL', label: 'image_data_2 column' },
        { sql: 'ALTER TABLE leads ADD COLUMN image_data_3 LONGBLOB NULL', label: 'image_data_3 column' },
        // Create announcements table if it doesn't exist
        {
            sql: `CREATE TABLE IF NOT EXISTS announcements (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                image VARCHAR(500),
                ctaText VARCHAR(255),
                active BOOLEAN DEFAULT TRUE,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
            label: 'announcements table'
        }
    ];

    for (const q of queries) {
        try {
            await pool.query(q.sql);
            console.log(`✅ ${q.label} - done`);
        } catch (e) {
            if (e.code === 'ER_DUP_FIELDNAME' || e.code === 'ER_TABLE_EXISTS_ERROR') {
                console.log(`⚠️  ${q.label} - already exists, skipping`);
            } else {
                console.error(`❌ ${q.label} - ERROR:`, e.message);
            }
        }
    }

    console.log('\nMigration complete!');
    process.exit(0);
}

migrate();
