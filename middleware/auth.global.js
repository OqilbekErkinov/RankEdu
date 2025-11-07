// /middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // useAuth composable-ni chaqirish (auto-import bilan)
  const auth = useAuth()

  // auth.ready.value - init tugagani haqida flag bo'lishi mumkin.
  // Agar init hali tugamagan bo'lsa, middleware muammosiz davom etsin (clientda init keyin redirect ishlaydi)
  if (!auth.ready.value) {
    // serverda yoki init vaqtida navga to'liq aralashmaslik uchun return qilamiz
    // qayta clientda redirect qilinadi (auth ready bo'lgach)
    return
  }

  const user = auth.user.value

  // Agar tashrif buyurilayotgan sahifa signin/signup bo'lsa va user mavjud bo'lsa -> home ga yo'naltir
  if ((to.path === '/signin' || to.path === '/signup') && user) {
    return navigateTo('/')
  }

  // Barcha boshqa sahifalar: agar user mavjud bo'lmasa, /signin ga yo'naltir
  if (!user && to.path !== '/signin' && to.path !== '/signup') {
    return navigateTo('/signin')
  }

  // aks holda yo'lni davom ettir
})
