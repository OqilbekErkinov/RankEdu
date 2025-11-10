// middleware/auth.global.ts
import { watch } from "vue";

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth();

  // agar init hali chaqirilmagan bo'lsa, chaqiring
  if (!auth.ready.value) {
    await auth.init();
    // agar init asenkron bo'lib, hali ham ready false bo'lsa, kutamiz
    if (!auth.ready.value) {
      await new Promise((res) => {
        const unwatch = watch(auth.ready, (v) => {
          if (v) {
            unwatch();
            res(true);
          }
        });
      });
    }
  }

  // foydalanuvchi mavjud bo'lsa va guest sahifalariga (signin/signup) kirmoqchi bo'lsa -> bosh sahifaga
  if (auth.user.value && (to.path === "/signin" || to.path === "/signup")) {
    return navigateTo("/");
  }

  // himoyalangan routelar uchun misol
  const protectedRoutes = ["/profile", "/dashboard"];
  if (protectedRoutes.includes(to.path) && !auth.user.value) {
    return navigateTo("/signin");
  }
});
