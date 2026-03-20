import { NextResponse } from 'next/server';
import pool from '@/lib/db';

const DAYS_TO_KEEP = 7;

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const secret = url.searchParams.get('secret');

        // Simple security check (replace with a real secret in production)
        if (secret !== process.env.CRON_SECRET && secret !== 'calefones2026') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log(`[Cron] Iniciando limpieza de base de datos...`);

        // 1. Contar leads con imágenes que serán limpiados
        const [countResult]: any = await pool.query(
            `SELECT COUNT(*) as total FROM leads 
             WHERE (image_data IS NOT NULL OR image_data_2 IS NOT NULL OR image_data_3 IS NOT NULL)
             AND createdAt < DATE_SUB(NOW(), INTERVAL ? DAY)`,
            [DAYS_TO_KEEP]
        );
        const totalToClean = countResult[0].total;

        if (totalToClean === 0) {
            return NextResponse.json({ message: 'No hay imágenes antiguas para limpiar. Todo limpio.' });
        }

        // 2. Limpiar solo los campos de imagen (los datos del lead se mantienen)
        const [result]: any = await pool.query(
            `UPDATE leads 
             SET image_data = NULL, image_data_2 = NULL, image_data_3 = NULL
             WHERE (image_data IS NOT NULL OR image_data_2 IS NOT NULL OR image_data_3 IS NOT NULL)
             AND createdAt < DATE_SUB(NOW(), INTERVAL ? DAY)`,
            [DAYS_TO_KEEP]
        );

        // 3. Optimizar la tabla para liberar espacio realmente
        await pool.query('OPTIMIZE TABLE leads');

        return NextResponse.json({
            success: true,
            message: `Limpieza completada: ${result.affectedRows} leads actualizados. Tabla optimizada.`
        });
    } catch (error: any) {
        console.error('[Cron] Error en limpieza:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
