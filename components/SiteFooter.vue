<!-- components/FooterSection.vue -->
<template>
  <footer class="site-footer py-5">
    <div class="classformargin">
      <hr class="footer-line mb-4" />

      <div class="text-center mb-3">
        <NuxtLink
          to="/"
          class="brand d-inline-flex align-items-center gap-2 text-decoration-none"
        >
          <img src="/images/logo.svg" alt="Nevroslim" height="61" />
        </NuxtLink>
      </div>

      <nav class="text-center">
        <ul class="list-inline m-0 footer-nav">
          <li
            v-for="(item, i) in items"
            :key="i"
            class="list-inline-item mx-3 mx-md-4 my-2"
          >
            <NuxtLink class="footer-link" :to="item.to">{{
              item.label
            }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
type Item = { label: string; to: string };

const props = withDefaults(defineProps<{ items?: Item[] }>(), {
  items: () => [
    { label: "Неврослим ҳақида", to: "#about" },
    { label: "Касалликлар", to: "#diseases" },
    { label: "Мутахассис", to: "#experts" },
    { label: "Натижалар", to: "#results" },
    { label: "Фойдалари", to: "#benefits" },
  ],
});
</script>