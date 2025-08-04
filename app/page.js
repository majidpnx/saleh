'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
// import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import dynamic from 'next/dynamic';

const OrderForm = dynamic(() => import('./components/OrderForm'), {
  ssr: false
});


export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <About />

      <OrderForm />
      <Footer />
    </main>
  );
}