export default function Header() {
  return (
    <header className="w-full bg-primary text-primary-foreground shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight">امداد باتری خودرو</h1>
      
      <a
        href="tel:09123456789"
        className="bg-primary-foreground text-primary px-4 py-2 rounded-md font-semibold hover:bg-white/90 transition-colors border border-primary"
      >
        تماس فوری
      </a>
    </header>
  );
}
