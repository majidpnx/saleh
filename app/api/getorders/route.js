// app/api/orders/route.js
import { connectDB } from '../..//lib/db';
import Order from '../../models/Order';

export async function POST(req) {
  try {
    await connectDB();
    console.log('werwerwer')
    const body = await req.json();
    const order = await Order.create(body);
    return Response.json({ message: 'سفارش ثبت شد', order });
  } catch (err) {
    console.error(err);
    return Response.json({ message: 'خطا در ثبت سفارش' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return Response.json(orders);
  } catch (err) {
    console.error(err);
    return Response.json({ message: 'خطا در دریافت سفارشات' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    const updated = await Order.findByIdAndUpdate(id, { done: true }, { new: true });
    if (!updated) return Response.json({ message: 'سفارش پیدا نشد' }, { status: 404 });
    return Response.json({ message: 'سفارش بروزرسانی شد', order: updated });
  } catch (err) {
    return Response.json({ message: 'خطا در بروزرسانی' }, { status: 500 });
  }
}
