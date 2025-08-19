<template>
  <div>
    <HeroSection />
    <AboutSection class="" />
    <DiseasesSection class="" />
    <ExpertsSection class="" />
    <AdvisesSection
      :videoThumbs2="['/images/advise1.webp', '/images/advise2.webp']"
      :gallery4="['/images/advise1.webp', '/images/advise2.webp', '/images/advise3.webp', '/images/advise4.webp']"
      :audios="[
        '/audio/1.mp3',
        '/audio/2.mp3',
        '/audio/3.mp3',
        '/audio/4.mp3',
        '/audio/5.mp3',
        '/audio/6.mp3',
      ]"
      cover="/img/cover.jpg"
    />
    <BenefitSection class="" />
    <ContactSection class="" />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Nevroslim — Асаб касалликларига табобий ва табиий ечим",
  description:
    "Асаб касалликларига табиий таркибли ечим. “Nevroslim” билан ҳаёт сифатини тикланг.",

  ogTitle: "Nevroslim — Асаб касалликларига табобий ва табиий ечим",
  ogDescription:
    "Асаб касалликларига табиий таркибли ечим. “Nevroslim” билан ҳаёт сифатини тикланг.",
  ogImage: "/images/preview.jpg",
  ogUrl: "https://nevrolism.vercel.app/",
});
</script>

