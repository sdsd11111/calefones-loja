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
        // Ensure standard columns exist (they should, but just in case)
        { sql: 'ALTER TABLE leads ADD COLUMN IF NOT EXISTS sector VARCHAR(255)', label: 'sector column' },
        { sql: 'ALTER TABLE leads ADD COLUMN IF NOT EXISTS service VARCHAR(255)', label: 'service column' },

        // Add the missing new columns
        { sql: 'ALTER TABLE leads ADD COLUMN brand VARCHAR(255) NULL', label: 'brand column' },
        { sql: 'ALTER TABLE leads ADD COLUMN model VARCHAR(255) NULL', label: 'model column' },
        { sql: 'ALTER TABLE leads ADD COLUMN image_data LONGBLOB NULL', label: 'image_data column' },
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

    console.log('Starting migration...');

    for (const q of queries) {
        try {
            // Note: ADD COLUMN IF NOT EXISTS is only supported in newer MariaDB/MySQL. 
            // For standard MySQL, we use a try-catch on the error code.
            await pool.query(q.sql);
            console.log(`✅ ${q.label} - done`);
        } catch (e) {
            if (e.code === 'ER_DUP_FIELDNAME' || e.code === 'ER_TABLE_EXISTS_ERROR' || e.message.includes('already exists')) {
                console.log(`⚠️  ${q.label} - already exists, skipping`);
            } else {
                console.error(`❌ ${q.label} - ERROR:`, e.message);
            }
        }
    }

    console.log('\nMigration complete!');
    await pool.end();
    process.exit(0);
}

migrate();
