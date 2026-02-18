import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { sendEmail } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const { name, sector, service, message } = await request.json();

    // 1. Save to Database
    await pool.query(
      'INSERT INTO leads (name, sector, service, message) VALUES (?, ?, ?, ?)',
      [name, sector, service, message]
    );

    // 2. Send Email
    const subject = `Nuevo mensaje de contacto: ${service}`;
    const text = `
      Nombre: ${name}
      Sector/Barrio: ${sector}
      Servicio: ${service}
      Mensaje: ${message}
    `;
    const html = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Sector/Barrio:</strong> ${sector}</p>
      <p><strong>Servicio:</strong> ${service}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
    `;

    await sendEmail(process.env.EMAIL_USER!, subject, text, html);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in contact API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
