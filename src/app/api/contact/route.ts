import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import sharp from 'sharp';

async function compressImage(file: File): Promise<Buffer | null> {
  if (!file || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  let compressed = await sharp(buffer)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 75 })
    .toBuffer();
  // Fallback to lower quality if still over 1MB
  if (compressed.length > 1024 * 1024) {
    compressed = await sharp(compressed).webp({ quality: 50 }).toBuffer();
  }
  return compressed;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const sector = formData.get('sector') as string;
    const service = formData.get('service') as string;
    const brand = formData.get('brand') as string;
    const model = formData.get('model') as string;
    const message = (formData.get('message') as string) || 'Ninguno';

    // Process up to 3 images in parallel
    const imageFiles = [
      formData.get('image_1') as File | null,
      formData.get('image_2') as File | null,
      formData.get('image_3') as File | null,
    ];

    const [img1, img2, img3] = await Promise.all(imageFiles.map(f => f && f.size > 0 ? compressImage(f) : Promise.resolve(null)));

    // Save lead with all image slots to the DB
    const [result]: any = await pool.query(
      'INSERT INTO leads (name, sector, service, brand, model, message, image_data, image_data_2, image_data_3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, sector, service, brand, model, message, img1, img2, img3]
    );

    const insertId = result.insertId;
    const imageCount = [img1, img2, img3].filter(Boolean).length;

    return NextResponse.json({ success: true, id: insertId, imageCount });
  } catch (error: any) {
    console.error('Error in contact API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
