'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

const LocationButton = dynamic(() => import('./LocationButton'), {
  ssr: false
});
// import LocationButton from './LocationButton'

export default function OrderForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        location: null,

    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // اینجا می‌تونی فرم رو به بک‌اند یا API بفرستی
    //     alert('درخواست شما با موفقیت ثبت شد ✅');
    //   };
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message);
                setFormData({ name: '', phone: '', address: '' });
        alert('درخواست شما با موفقیت ثبت شد ✅');

            } else {
                setMessage(data.message || 'مشکلی پیش آمد.');
            }
        } catch {
            setMessage('ارتباط با سرور برقرار نشد.');
        }
    };
    return (
        <section className="w-full bg-background py-12 px-4 sm:px-8">
            <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-700">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">
                    درخواست امداد باتری خودرو
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                     <LocationButton onLocationSelect={(location) => {
  setFormData((prev) => ({ ...prev, location }));
}} />
                    
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            نام و نام خانوادگی
                        </label>
                        <input
                            name="name"
                            type="text"
                            placeholder="مثلاً علی رضایی"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            شماره تماس
                        </label>
                        <input
                            name="phone"
                            type="tel"
                            placeholder="09121234567"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            آدرس دقیق
                        </label>
                        <textarea
                            name="address"
                            placeholder="تهران، خیابان آزادی، پلاک ۱۰"
                            value={formData.address}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-md bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
                    >
                        ارسال درخواست
                    </button>
                </form>
            </div>
        </section>
    );
}
