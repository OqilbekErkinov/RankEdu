<template>
  <div>
    <SiteNavbar />
    <main>
      <slot />
    </main>
    <SiteFooter />
    <OrderModal /> <!-- Har doim mavjud, headerdan ham ochiladi -->
  </div>
</template>
