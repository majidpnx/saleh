import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const order = await request.json();

    if (!order.name || !order.phone || !order.address) {
      return new Response(JSON.stringify({ message: 'اطلاعات فرم کامل نیست.' }), { status: 400 });
    }

    // مسیر فایل ذخیره‌سازی (داخل فولدر data در ریشه پروژه)
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'orders.json');

    // اگر فولدر data وجود نداره، بسازش
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir);
    }

    let orders = [];

    try {
      const fileData = await fs.readFile(filePath, 'utf-8');
      orders = JSON.parse(fileData);
    } catch {
      // فایل وجود نداره، آرایه خالی بمونه
    }

    orders.push({ ...order, date: new Date().toISOString() });

    await fs.writeFile(filePath, JSON.stringify(orders, null, 2));

    return new Response(JSON.stringify({ message: 'سفارش با موفقیت ثبت شد.' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'خطا در ثبت سفارش.' }), { status: 500 });
  }
}


