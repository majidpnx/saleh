'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
// import LocationButton from './components/LocationButton'
// import MapDisplay from './components/MapDisplay'


export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <About />
      {/* <LocationButton /> */}
          {/* <h1 className="text-xl font-bold mb-4">نمایش موقعیت شما</h1> */}
      {/* <MapDisplay /> */}
      <OrderForm />
      <Footer />
    </main>
  );
}