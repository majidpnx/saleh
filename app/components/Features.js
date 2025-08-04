const features = [
  "تعویض باتری در محل",
  "پشتیبانی ۲۴ ساعته",
  "ضمانت اصل بودن باتری",
  "مشاوره رایگان تلفنی",
];

export default function Features() {
  return (
    <section className="py-12 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold mb-8 text-center">مزایای خدمات ما</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 p-6 rounded shadow text-center">
              <p className="font-medium">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
