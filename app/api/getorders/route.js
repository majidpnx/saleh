import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

const dataDir = join(process.cwd(), 'data');
const filePath = join(dataDir, 'orders.json'); // 👈 این باید بالا تعریف بشه و در همه توابع استفاده بشه

export async function GET() {
  const data = await readFile(filePath, 'utf8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req) {
  const body = await req.json();
  const orders = JSON.parse(await readFile(filePath, 'utf8'));

  orders.push({ ...body, createdAt: new Date().toISOString(), done: false });

  await writeFile(filePath, JSON.stringify(orders, null, 2));
  return NextResponse.json({ message: 'سفارش ثبت شد.' });
}

export async function PUT(req) {
  const { index } = await req.json();
  const orders = JSON.parse(await readFile(filePath, 'utf8'));

  if (orders[index]) {
    orders[index].done = true;
    await writeFile(filePath, JSON.stringify(orders, null, 2));
    return NextResponse.json({ message: 'سفارش تیک خورد.' });
  }

  return NextResponse.json({ message: 'سفارش پیدا نشد.' }, { status: 404 });
}
