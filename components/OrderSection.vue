<script setup lang="ts">
const name = ref('');
const phone = ref('');
const loading = ref(false);
const ok = ref(false);

const submit = async () => {
  loading.value = true
  ok.value = false
  try {
    await $fetch('/api/order', { method:'POST', body:{ name:name.value, phone:phone.value, source:'order-section' }})
    name.value = ''; phone.value = ''; ok.value = true
  } catch (e) {
    alert('Юборишда хатолик. Кейинроқ уриниб кўринг.')
  } finally { loading.value = false }
}
</script>

<template>
  <section class="py-4">
    <div class="container">
      <div class="row g-4 align-items-center">
        <div class="col-12 col-md-6">
          <h3>Ҳозироқ буюртма беринг</h3>
          <p class="text-muted">Қисқа форма, операторимиз тез орада боғланади.</p>
          <form class="row gy-3" @submit.prevent="submit">
            <div class="col-12">
              <input class="form-control form-control-lg" v-model="name" required placeholder="Исмингиз">
            </div>
            <div class="col-12">
              <input class="form-control form-control-lg" v-model="phone" required placeholder="+998 ** *** ** **">
            </div>
            <div class="col-12 d-flex align-items-center gap-3">
              <button class="btn btn-brand" :disabled="loading">
                {{ loading ? 'Юкланмоқда…' : 'Юбориш' }}
              </button>
              <span v-if="ok" class="text-success">Юборилди! Қўнғироқ кутиб туринг.</span>
            </div>
          </form>
        </div>
        <div class="col-12 col-md-6">
          <img src="/images/order-side.png" class="img-fluid" alt="Order" />
        </div>
      </div>
    </div>
  </section>
</template>
