<template>
  <div>
    <HeroSection />
    <AboutSection class="" />
    <DiseasesSection class="" />
    <ExpertsSection class="" />
    <AdvisesSection
      :videoThumbs2="['/images/advise1.png', '/images/advise2.png']"
      :gallery4="['/images/advise1.png', '/images/advise2.png', '/images/advise3.png', '/images/advise4.png']"
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
});
</script>
