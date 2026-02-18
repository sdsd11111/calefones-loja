import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM announcements ORDER BY createdAt DESC');
        return NextResponse.json(rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { title, description, image, ctaText } = await request.json();
        const [result]: any = await pool.query(
            'INSERT INTO announcements (title, description, image, ctaText, active) VALUES (?, ?, ?, ?, ?)',
            [title, description, image, ctaText, true]
        );

        return NextResponse.json({
            id: result.insertId,
            title,
            description,
            image,
            ctaText,
            active: true
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
