<template>
  <section class="py-4">
    <div class="container">
      <h3 class="mb-3">Мижозлар фикри</h3>
      <div class="row g-3">
        <div class="col-12 col-md-4" v-for="i in 3" :key="i">
          <div class="card-soft p-3 h-100">
            <div class="d-flex align-items-center gap-2 mb-2">
              <img :src="`/images/user${i}.jpg`" class="rounded-circle" width="40" height="40" alt="user">
              <div class="fw-semibold">Фойдаланувчи {{ i }}</div>
            </div>
            <p class="mb-0 text-muted">“Бир ойда аҳволим сезиларли яхшиланди, стресс камайди.”</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
