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
          @click="goSignin"
        >
          Sign in
        </button>
      </div>

      <div v-if="message" class="mt-2 text-success">{{ message }}</div>
      <div v-if="err" class="mt-2 text-danger">{{ err }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

const router = useRouter();
const auth = useAuth();

const fullname = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const avatarPreview = ref(null);
const avatarFile = ref(null);
const loading = ref(false);
const err = ref(null);
const message = ref(null);

function goSignin() {
  router.push("/signin");
}

function onAvatar(e) {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  avatarFile.value = f;
  const reader = new FileReader();
  reader.onload = () => {
    avatarPreview.value = reader.result;
  };
  reader.readAsDataURL(f);
}

async function onSubmit() {
  err.value = null;
  message.value = null;
  loading.value = true;
  try {
    await auth.register({
      email: email.value,
      password: password.value,
      meta: { fullname: fullname.value, phone: phone.value },
    });
    // Confirmation sozlamasiga qarab — agar tasdiqlash kerak bo'lsa foydalanuvchiga xabar beramiz
    message.value =
      "Roʻyxatdan oʻtish muvaffaqiyatli. Iltimos emailingizni tekshirib tasdiqlang (agar tasdiqlash zarur bo‘lsa).";
  } catch (e) {
    const msg =
      e && (e.message || e.error_description)
        ? e.message || e.error_description
        : String(e);
    err.value = msg;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (typeof auth.init === "function") {
    auth.init().catch(() => {});
  }
});
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
