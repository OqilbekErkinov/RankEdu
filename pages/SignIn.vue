<template>
  <div class="auth-card">
    <h3>Kirish</h3>
    <form @submit.prevent="onSubmit">
      <input v-model="email" placeholder="Email" class="form-control mb-2"/>
      <input v-model="password" type="password" placeholder="Parol" class="form-control mb-2"/>
      <div class="d-flex gap-2">
        <button class="btn btn-primary" :disabled="loading">Kirish</button>
        <button class="btn btn-outline-secondary" type="button" @click="$router.push('/signup')">Roʻyxatdan oʻtish</button>
      </div>
      <div v-if="err" class="text-danger mt-2">{{ err }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const auth = useAuth();
const email = ref('');
const password = ref('');
const loading = ref(false);
const err = ref(null);

async function onSubmit() {
  err.value = null;
  loading.value = true;
  try {
    await auth.login({ email: email.value, password: password.value });
    window.location.href = '/profile';
  } catch (e) {
    err.value = e.message || String(e);
  } finally { loading.value = false; }
}
</script>

<style scoped>
.auth-card { max-width:480px; margin:30px auto; padding:20px; border-radius:10px; background:#fff; box-shadow:0 6px 24px rgba(0,0,0,0.06);}
</style>
