<template>
  <div>
    <HeroSection />
    <AboutSection class="mt-4" />
    <DiseasesSection id="benefits" class="mt-5" />
    <ExpertsSection class="mt-5" />
  </div>
</template>

<script setup lang="ts">
import AboutSection from '~/components/AboutSection.vue';

useSeoMeta({
  title: 'Nevroslim — Асаб касалликларига табобий ва табиий ечим',
  description: 'Асаб касалликларига табиий таркибли ечим. “Nevroslim” билан ҳаёт сифатини тикланг.',
})
</script>
