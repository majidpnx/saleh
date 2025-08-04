
import { connectDB } from '../../lib/db';
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


