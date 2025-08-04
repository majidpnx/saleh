export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} امداد باتری | تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}
