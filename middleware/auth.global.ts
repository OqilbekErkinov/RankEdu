// /middleware/auth.global.js
export default defineNuxtRouteMiddleware((to, from) => {
  // public sahifalar – bu ro'yxatga kerak bo'lsa boshqa yo'llarni qo'shing
  const publicPaths = ['/signin', '/signup', '/forgot', '/auth'];

  // agar to.path query param bilan kelgan bo'lsa ham faqat pathname tekshiriladi
  const path = to.path || '';

  // useAuth composable loyihangizda mavjud bo'lsa shu orqali foydalanuvchini tekshiramiz
  // agar siz boshqa composable ishlatsangiz nomini o'zgartiring
  try {
    const auth = useAuth();
    const uid = auth?.user?.value?.id;

    // agar foydalanuvchi login qilmagan va hozirgi path public emas — yo'naltir
    if (!uid && !publicPaths.includes(path)) {
      // agar allaqachon signin sahifasida bo'lsa return true (hech nima qilmasin)
      return navigateTo('/signin');
    }

    // agar foydalanuvchi mavjud va signin/signup sahifalariga kirsa
    // odatda bunday holatda dashboard yoki home ga yo'naltirish kerak bo'ladi
    if (uid && (path === '/signin' || path === '/signup')) {
      return navigateTo('/');
    }

    // hech qanday redirect kerak bo'lmasa davom etadi
    return;
  } catch (e) {
    // agar useAuth topilmasa (kompozable nomi boshqacha) fallback: Supabase auth bilan tekshirish
    try {
      const { $supabase } = useNuxtApp();
      // synchronous getUser ishlamaydi, lekin auth state odatda klientda mavjud
      // xavfsiz fallback: agar to.path public bo'lmasa signin ga yo'naltir
      if (!publicPaths.includes(path)) return navigateTo('/signin');
    } catch (err) {
      // agar hamma yo'q bo'lsa hech qilmaslik (dev muhitda test qiling)
    }
  }
});
