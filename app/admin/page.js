'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch('/api/getorders');
    const data = await res.json();
    setOrders(data);
    console.log(data)
    setLoading(false);
  };

  const markDone = async (id) => {
    console.log(id)
    const res = await fetch('/api/getorders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
console.log(res)
    if (res.ok) fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">مدیریت سفارش‌ها</h1>

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li
              key={index}
              className={`p-4 border rounded-md ${order.done ? 'bg-green-100' : 'bg-white'}`}
            >
              <p><strong>نام:</strong> {order.name}</p>
              <p><strong>تلفن:</strong> {order.phone}</p>
              <p><strong>آدرس:</strong> {order.address}</p>
              {order.location && (
                <p>
                  <strong>موقعیت:</strong>{' '}
                  <a
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.google.com/maps?q=${order.location.lat},${order.location.lng}`}
                  >
                    نمایش روی نقشه
                  </a>
                </p>
              )}
              <p><strong>تاریخ:</strong> {new Date(order.createdAt).toLocaleString()}</p>

              {!order.done && (
                <button
                  className="mt-2 px-4 py-2 bg-primary text-white rounded"
                  onClick={() => markDone(order._id)}
                >
                  تیک انجام شد ✅
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
