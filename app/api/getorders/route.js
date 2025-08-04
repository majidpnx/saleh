import { connectDB } from '../../lib/db';
import Order from '../../models/Order';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const order = await Order.create(body);
    return new Response(JSON.stringify({ message: 'سفارش ثبت شد', order }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'خطا در ثبت سفارش' }), { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'خطا در دریافت سفارشات' }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    const updated = await Order.findByIdAndUpdate(id, { done: true }, { new: true });
    if (!updated) return new Response(JSON.stringify({ message: 'سفارش پیدا نشد' }), { status: 404 });
    return new Response(JSON.stringify({ message: 'سفارش بروزرسانی شد', order: updated }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'خطا در بروزرسانی' }), { status: 500 });
  }
}
