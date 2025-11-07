// composables/useAuth.ts
import { ref } from "vue";

export function useAuth() {
  const nuxtApp = useNuxtApp();
  const $supabase = nuxtApp?.$supabase ?? null;

  const user = ref<any>(null);
  const loading = ref(false);
  const error = ref<any>(null);
  const ready = ref(false);

  async function init() {
    try {
      if (process.server) {
        ready.value = true;
        return;
      }
      if (!$supabase) {
        console.warn("[useAuth] $supabase not available");
        ready.value = true;
        return;
      }

      const { data, error: getErr } = await $supabase.auth.getSession();
      if (getErr) console.warn("[useAuth] getSession error", getErr);
      user.value = data?.session?.user ?? null;

      $supabase.auth.onAuthStateChange((_event: string, session: any) => {
        user.value = session?.user ?? null;
        console.log(
          "[useAuth] onAuthStateChange",
          _event,
          session?.user?.email ?? null
        );
      });

      ready.value = true;
    } catch (e) {
      console.error("[useAuth] init error", e);
      ready.value = true;
    }
  }

  async function register({
    email,
    password,
    meta,
  }: {
    email: string;
    password: string;
    meta?: any;
  }) {
    error.value = null;
    loading.value = true;
    try {
      if (!$supabase) throw new Error("Supabase client not available");
      const res = await $supabase.auth.signUp({
        email,
        password,
        options: { data: meta },
      });
      console.log("[useAuth] signup res:", res);
      if (res.error) throw res.error;
      loading.value = false;
      return res;
    } catch (e) {
      console.error("[useAuth] register error:", e);
      error.value = e;
      loading.value = false;
      throw e;
    }
  }

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    error.value = null;
    loading.value = true;
    try {
      if (!$supabase) throw new Error("Supabase client not available");
      const res = await $supabase.auth.signInWithPassword({ email, password });
      console.log("[useAuth] login res:", res);
      if (res.error) throw res.error;
      user.value = res.data?.user ?? user.value;
      loading.value = false;
      return res;
    } catch (e: any) {
      console.error("[useAuth] login error:", e);
      error.value = e;
      loading.value = false;
      throw e;
    }
  }

  async function logout() {
    try {
      if (!$supabase) return;
      await $supabase.auth.signOut();
      user.value = null;
    } catch (e) {
      console.error("[useAuth] logout error", e);
    }
  }

  return { user, loading, error, ready, init, register, login, logout };
}
