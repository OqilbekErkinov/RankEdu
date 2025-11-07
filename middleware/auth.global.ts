// middleware/auth.global.ts
import { watch } from "vue";

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth();
  // init ni chaqiramiz faqat clientda
  if (process.client && !auth.ready.value) {
    // agar hali init chaqirilmagan bo'lsa, chaqiring
    await auth.init();
  }

  // Agar hajmiy sahifalar ro'yxati
  const protectedRoutes = ["/profile", "/dashboard"];

  if (auth.user.value && (to.path === "/signin" || to.path === "/signup")) {
    return navigateTo("/");
  }

  if (protectedRoutes.includes(to.path) && !auth.user.value) {
    return navigateTo("/signin");
  }
});
