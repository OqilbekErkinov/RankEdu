<!-- components/FooterSection.vue -->
<template>
  <footer class="site-footer py-5">
    <div class="container">
      <!-- top hairline -->
      <hr class="footer-line mb-4" />

      <!-- brand -->
      <div class="text-center mb-3">
        <NuxtLink to="/" class="brand d-inline-flex align-items-center gap-2 text-decoration-none">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M7 17c2-3 1-7 5-9 1 4-1 7 3 10 0-5 5-7 8-7-3 3-4 7-9 8-3 0-5-1-7-2z"
                  fill="#5E8CAF" opacity=".85"/>
          </svg>
          <span class="logo-text">NEVROSLIM</span>
        </NuxtLink>
      </div>

      <!-- nav -->
      <nav class="text-center">
        <ul class="list-inline m-0">
          <li v-for="(item,i) in items" :key="i" class="list-inline-item mx-3 mx-md-4 my-2">
            <NuxtLink class="footer-link" :to="item.to">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
type Item = { label: string; to: string }

const props = withDefaults(defineProps<{ items?: Item[] }>(), {
  items: () => ([
    { label: 'Неврослим ҳақида', to: '/about' },
    { label: 'Касалликлар',      to: '/diseases' },
    { label: 'Мутахассис',       to: '/experts' },
    { label: 'Натижалар',        to: '/results' },
    { label: 'Фойдалари',        to: '/benefits' }
  ])
})
</script>

<style scoped>
.site-footer{
}

.footer-line{
  height: 2px;
  background: #ffffff;
  opacity: .8;
  border: 0;
}

.logo-text{
  font-weight: 800;
  letter-spacing: 2px;
  color: #5E8CAF;                    /* brend ko‘k */
  font-size: clamp(20px, 3vw, 32px);
}

.footer-link{
  color: #0f2945;
  font-weight: 600;
  text-decoration: none;
}
.footer-link:hover{
  color: #1f4f86;
  text-decoration: underline;
}
</style>
