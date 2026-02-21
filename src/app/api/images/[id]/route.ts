import { NextResponse } from 'next/server';
import pool from '@/lib/db';

const SLOT_COLUMNS: Record<string, string> = {
    '1': 'image_data',
    '2': 'image_data_2',
    '3': 'image_data_3',
};

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const slot = searchParams.get('slot') || '1';
        const column = SLOT_COLUMNS[slot] || 'image_data';

        const [rows]: any = await pool.query(`SELECT ${column} AS image_data FROM leads WHERE id = ?`, [id]);

        if (!rows || rows.length === 0 || !rows[0].image_data) {
            return new NextResponse('Image not found', { status: 404 });
        }

        return new NextResponse(rows[0].image_data, {
            headers: {
                'Content-Type': 'image/webp',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error: any) {
        console.error('Error fetching image:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
