<template>
  <div class="auth-card">
    <h3>Kirish</h3>
    <form @submit.prevent="onSubmit">
      <input v-model="email" placeholder="Email" class="form-control mb-2" />
      <input
        v-model="password"
        type="password"
        placeholder="Parol"
        class="form-control mb-2"
      />
      <div class="d-flex gap-2">
        <button class="btn btn-primary" :disabled="loading">Kirish</button>
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="goSignup"
        >
          Roʻyxatdan oʻtish
        </button>
      </div>
      <div v-if="err" class="text-danger mt-2">{{ err }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth"; // sizning composable joylashuvingizga moslang

const router = useRouter();
const auth = useAuth();

const email = ref("");
const password = ref("");
const loading = ref(false);
const err = ref(null);

function goSignup() {
  router.push("/signup");
}

async function onSubmit() {
  err.value = null;
  loading.value = true;
  try {
    await auth.login({ email: email.value, password: password.value });
    // muvaffaqiyat: yo'naltirish
    window.location.href = "/profile";
  } catch (e) {
    // e obyektida Supabase xabar bo'lishi mumkin
    const msg =
      e && (e.message || e.error_description)
        ? e.message || e.error_description
        : String(e);
    if (
      typeof msg === "string" &&
      msg.toLowerCase().includes("email not confirmed")
    ) {
      err.value = "Email tasdiqlanmagan. Iltimos emailingizni tekshiring.";
    } else if (
      typeof msg === "string" &&
      (msg.toLowerCase().includes("invalid login") ||
        msg.toLowerCase().includes("invalid login credentials"))
    ) {
      err.value = "Email yoki parol noto‘g‘ri.";
    } else {
      err.value = msg;
    }
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
