// /composables/useAuth.ts
import { ref, readonly } from "vue";
import { useNuxtApp } from "#app";

type SupabaseClientLike = any;
type UserLike = any;

let _supabase: SupabaseClientLike | null = null;
let _initialized = false;
let _subscription: any = null;

/**
 * Shared reactive state so multiple imports share the same user/loading/error
 */
const user = ref<UserLike | null>(null);
const loading = ref<boolean>(false);
const error = ref<any>(null);
const ready = ref<boolean>(false);

/**
 * waitForSupabase: nuxt plugin orqali $supabase paydo bo'lishini kutadi
 */
async function waitForSupabase(timeout = 3000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const nuxtApp = useNuxtApp();
      if ((nuxtApp as any).$supabase) {
        _supabase = (nuxtApp as any).$supabase;
        return _supabase;
      }
    } catch (e) {
      // ignore until plugin ready
    }
    await new Promise((r) => setTimeout(r, 50));
  }
  return null;
}

/**
 * init: supabase client topilgach sessiyani o'qiydi va auth change listener o'rnatadi.
 * init() bir martadan ortiq chaqirilmasa yaxshi; bu singleton ga mos.
 */
async function init() {
  // agar allaqachon init qilingan bo'lsa, faqat ready ni kutish kifoya
  if (_initialized) return;
  _initialized = true;
  ready.value = false;

  const s = await waitForSupabase();
  if (!s) {
    console.warn("[useAuth] $supabase client not available within timeout");
    ready.value = true;
    return;
  }

  try {
    loading.value = true;
    // Supabase v2 API: getSession()
    const { data: sessionData, error: sessErr } = await _supabase.auth.getSession();
    if (sessErr) {
      console.warn("[useAuth] getSession error", sessErr);
    }
    user.value = sessionData?.session?.user ?? null;
  } catch (e) {
    console.error("[useAuth] init error", e);
    user.value = null;
  } finally {
    loading.value = false;
  }

  // unsubscribe old subscription if any
  try {
    if (_subscription && typeof _subscription.unsubscribe === "function") {
      _subscription.unsubscribe();
      _subscription = null;
    }
  } catch {}

  // Supabase v2: onAuthStateChange returns { data: { subscription } }
  try {
    const subRes = _supabase.auth.onAuthStateChange((_event: string, session: any) => {
      user.value = session?.user ?? null;
    });
    // normalize subscription object (supports both forms)
    _subscription = subRes?.data?.subscription ?? subRes;
  } catch (e) {
    console.warn("[useAuth] onAuthStateChange setup failed", e);
  }

  ready.value = true;
}

/**
 * register / login / logout funksiyalari
 * Bu funksiyalar init() bajarilganini taxmin qiladi; agar kerak bo'lsa init() chaqirishni o'z ichiga oladi.
 */
async function register({
  email,
  password,
  fullname,
  phone,
}: {
  email: string;
  password: string;
  fullname?: string;
  phone?: string;
}) {
  error.value = null;
  loading.value = true;
  try {
    if (!_supabase) await init();
    const res = await _supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullname ?? null,
          phone: phone ?? null,
        },
      },
    });
    // signUp returns data / error. Supabase may require email confirmation depending on settings.
    return res;
  } catch (e) {
    error.value = e;
    throw e;
  } finally {
    loading.value = false;
  }
}

async function login({ email, password }: { email: string; password: string }) {
  error.value = null;
  loading.value = true;
  try {
    if (!_supabase) await init();
    const res = await _supabase.auth.signInWithPassword({
      email,
      password,
    });
    // after successful sign in onAuthStateChange will update user
    return res;
  } catch (e) {
    error.value = e;
    throw e;
  } finally {
    loading.value = false;
  }
}

async function logout() {
  loading.value = true;
  try {
    if (!_supabase) await init();
    const { error: signOutErr } = await _supabase.auth.signOut();
    if (signOutErr) throw signOutErr;
    user.value = null;
    return true;
  } catch (e) {
    error.value = e;
    throw e;
  } finally {
    loading.value = false;
  }
}

/**
 * Public API: init() avtomatik chaqiriladi — ammo siz xohlasangiz qo'lda ham chaqirishingiz mumkin.
 */
export function useAuth() {
  // avtomatik init qilish (qo'lda ham chaqirish mumkin)
  void init();

  return {
    // readonly ni tashqi kodga bevosita yozmaslik uchun
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    ready: readonly(ready),

    // operatsiyalar
    init,
    register,
    login,
    logout,
  };
}

export default useAuth;
