/**
 * LIMPIEZA AUTOMÁTICA DE IMÁGENES EN LA BASE DE DATOS
 * =====================================================
 * Este script elimina las imágenes (BLOB) de los leads antiguos
 * para evitar que la base de datos crezca sin control.
 * 
 * - Los datos del lead (nombre, sector, servicio, etc.) se MANTIENEN.
 * - Solo se borran los campos de imagen (image_data, image_data_2, image_data_3).
 * - Se ejecuta sobre leads con más de 7 días de antigüedad.
 * 
 * CONFIGURAR EN CPANEL:
 * Cron Job: cada domingo a las 3:00 AM
 * Comando: /usr/bin/node /ruta/al/proyecto/cleanup-images.js
 * 
 * O si prefieres cada día:
 * 0 3 * * * /usr/bin/node /ruta/al/proyecto/cleanup-images.js
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

const DAYS_TO_KEEP = 7; // Mantener imágenes por 7 días

async function cleanupImages() {
    let connection;
    try {
        connection = await mysql.createConnection(process.env.DATABASE_URL);
        console.log(`[${new Date().toISOString()}] Conectado a la base de datos.`);

        // 1. Contar leads con imágenes que serán limpiados
        const [countResult] = await connection.execute(
            `SELECT COUNT(*) as total FROM leads 
             WHERE (image_data IS NOT NULL OR image_data_2 IS NOT NULL OR image_data_3 IS NOT NULL)
             AND createdAt < DATE_SUB(NOW(), INTERVAL ? DAY)`,
            [DAYS_TO_KEEP]
        );
        const totalToClean = countResult[0].total;

        if (totalToClean === 0) {
            console.log(`[${new Date().toISOString()}] No hay imágenes antiguas para limpiar. Todo limpio.`);
            await connection.end();
            return;
        }

        console.log(`[${new Date().toISOString()}] Encontrados ${totalToClean} leads con imágenes de más de ${DAYS_TO_KEEP} días.`);

        // 2. Limpiar solo los campos de imagen (los datos del lead se mantienen)
        const [result] = await connection.execute(
            `UPDATE leads 
             SET image_data = NULL, image_data_2 = NULL, image_data_3 = NULL
             WHERE (image_data IS NOT NULL OR image_data_2 IS NOT NULL OR image_data_3 IS NOT NULL)
             AND createdAt < DATE_SUB(NOW(), INTERVAL ? DAY)`,
            [DAYS_TO_KEEP]
        );

        console.log(`[${new Date().toISOString()}] ✅ Limpieza completada: ${result.affectedRows} leads actualizados (imágenes eliminadas, datos conservados).`);

        // 3. Optimizar la tabla para liberar espacio realmente
        await connection.execute('OPTIMIZE TABLE leads');
        console.log(`[${new Date().toISOString()}] ✅ Tabla 'leads' optimizada. Espacio liberado.`);

        await connection.end();
    } catch (err) {
        console.error(`[${new Date().toISOString()}] ❌ Error en limpieza:`, err.message);
        if (connection) await connection.end().catch(() => {});
        process.exit(1);
    }
}

cleanupImages();
