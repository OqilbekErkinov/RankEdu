// /middleware/auth.global.js
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth() // endi ishlashi kerak: composable auto-import
  const user = auth.user.value
  const ready = auth.ready.value

  // agar hali init tugamagan bo'lsa, kutish uchun oddiy yondashuv:
  if (!ready) {
    // qisqa kutish strategiyasi: allow navigation and client-side redirect
    return
  }

  // guest sahifalar (signin/signup) - agar allaqachon login bo'lsa bosh sahifaga yo'naltirish
  if ((to.path === '/signin' || to.path === '/signup') && user) {
    return navigateTo('/') // yoki to.meta.home
  }

  // protected routes: agar foydalanuvchi yo'q bo'lsa signin ga yubor
  if (to.meta.requiresAuth && !user) {
    return navigateTo('/signin')
  }
})
