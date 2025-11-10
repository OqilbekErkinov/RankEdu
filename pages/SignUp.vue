<template>
  <div class="auth-card">
    <h3>Roʻyxatdan oʻtish</h3>
    <form @submit.prevent="onSubmit">
      <input
        v-model="fullname"
        placeholder="To'liq ism"
        class="form-control mb-2"
      />
      <input v-model="email" placeholder="Email" class="form-control mb-2" />
      <input v-model="phone" placeholder="Telefon" class="form-control mb-2" />
      <input
        v-model="password"
        type="password"
        placeholder="Parol"
        class="form-control mb-2"
      />
      <div class="mb-2">
        <input type="file" @change="onAvatar" />
        <div v-if="avatarPreview" class="mt-2">
          <img
            :src="avatarPreview"
            style="width: 80px; height: 80px; border-radius: 50%"
          />
        </div>
      </div>

      <div class="d-flex gap-2">
        <button class="btn btn-primary" :disabled="loading">
          Roʻyxatdan oʻtish
        </button>
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="goToSignin"
        >
          Sign in
        </button>
      </div>

      <div v-if="err" class="text-danger mt-2">{{ err }}</div>
      <div v-if="message" class="text-success mt-2">{{ message }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import useAuth from "~/composables/useAuth";
import { useRouter } from "vue-router";

const auth = useAuth();
const router = useRouter();

const fullname = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const avatarFile = ref<File | null>(null);
const avatarPreview = ref<string | null>(null);
const loading = ref(false);
const err = ref<string | null>(null);
const message = ref<string | null>(null);

onMounted(async () => {
  await auth.init();
  if (auth.user.value) router.push("/");
});

function onAvatar(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0];
  if (!f) return;
  avatarFile.value = f;
  const reader = new FileReader();
  reader.onload = () => (avatarPreview.value = reader.result as string);
  reader.readAsDataURL(f);
}

async function onSubmit() {
  err.value = null;
  message.value = null;
  loading.value = true;
  try {
    const res = await auth.register({
      fullname: fullname.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      avatarDataUrl: avatarPreview.value,
    });
    // supabase signUp response
    if (res.error) {
      err.value = res.error.message || "Roʻyxatdan oʻtishda xato";
      return;
    }
    // agar email tasdiqlash talab etilsa:
    message.value =
      "Roʻyxatdan oʻtish muvaffaqiyatli. Iltimos emailingizni tekshirib tasdiqlang.";
    // agar avtomatik login bo'lsa, supabase onAuthStateChange orqali user ga kirishi mumkin.
    // Agar siz darhol profilga o'tmoqchi bo'lsangiz va foydalanuvchi session bo'lsa:
    if (res.data?.session) {
      router.push("/profile");
    }
  } catch (e: any) {
    err.value = e?.message || String(e);
  } finally {
    loading.value = false;
  }
}

function goToSignin() {
  router.push("/signin");
}
</script>

<style scoped>
.auth-card {
  max-width: 480px;
  margin: 30px auto;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
}
</style>
