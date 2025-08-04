export async function POST(req) {
  const body = await req.json();

  console.log("مختصات دریافت شده:", body); // { lat: ..., lng: ... }

  // اینجا می‌تونی اطلاعات رو ذخیره کنی، به پایگاه داده بزنی یا هر کاری
  return Response.json({ success: true, message: "موقعیت دریافت شد" });
}
