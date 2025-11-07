<template>
  <div class="auth-card">
    <h3>Roʻyxatdan oʻtish</h3>
    <form @submit.prevent="onSubmit">
      <input v-model="fullname" placeholder="To'liq ism" class="form-control mb-2"/>
      <input v-model="email" placeholder="Email" class="form-control mb-2"/>
      <input v-model="phone" placeholder="Telefon" class="form-control mb-2"/>
      <input v-model="password" type="password" placeholder="Parol" class="form-control mb-2"/>
      <div class="mb-2">
        <input type="file" @change="onAvatar" />
        <div v-if="avatarPreview" class="mt-2">
          <img :src="avatarPreview" style="width:80px;height:80px;border-radius:50%;" />
        </div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-primary" :disabled="loading">Roʻyxatdan oʻtish</button>
        <button class="btn btn-outline-secondary" type="button" @click="$router.push('/signin')">Sign in</button>
      </div>
      <div v-if="err" class="text-danger mt-2">{{ err }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const auth = useAuth();

const fullname = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const avatarPreview = ref(null);
const avatarFile = ref(null);
const loading = ref(false);
const err = ref(null);

function onAvatar(e) {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  avatarFile.value = f;
  const reader = new FileReader();
  reader.onload = () => avatarPreview.value = reader.result;
  reader.readAsDataURL(f);
}

async function onSubmit() {
  err.value = null;
  loading.value = true;
  try {
    await auth.register({
      fullname: fullname.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      avatarDataUrl: avatarPreview.value
    });
    // registered and logged in
    // redirect to protected page
    window.location.href = '/profile'; // yoki router.push
  } catch (e) {
    err.value = e.message || String(e);
  } finally { loading.value = false; }
}
</script>

<style scoped>
.auth-card { max-width:480px; margin:30px auto; padding:20px; border-radius:10px; background:#fff; box-shadow:0 6px 24px rgba(0,0,0,0.06);}
</style>
