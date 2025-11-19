// /composables/useAuth.ts
import { ref, readonly } from "vue";
import axios, { AxiosInstance } from "axios";

const API_BASE =
  (import.meta.env.VITE_API_BASE as string) ||
  (typeof window !== "undefined"
    ? window.location.origin + "/api"
    : "http://127.0.0.1:8000/api");

const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// reactive state
const user = ref<any | null>(null);
const loading = ref<boolean>(false);
const error = ref<any | null>(null);
const ready = ref<boolean>(false);

// SSR-safer localStorage wrapper
function safeLocalStorageGet(key: string): string | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key);
    }
  } catch (e) {}
  return null;
}
function safeLocalStorageSet(key: string, value: string) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(key, value);
    }
  } catch (e) {}
}
function safeLocalStorageRemove(key: string) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(key);
    }
  } catch (e) {}
}

const tokenKey = "access";
const token = ref<string | null>(safeLocalStorageGet(tokenKey));

if (token.value) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
}

/** init: agar access token localStorage da bo'lsa /auth/me/ ni chaqiradi */
async function init() {
  if (ready.value) return;
  ready.value = false;
  loading.value = true;
  error.value = null;
  try {
    if (token.value) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
      const resp = await api.get("/auth/me/");
      if (resp.status === 200) {
        user.value = resp.data.user ?? resp.data;
      } else {
        clearAuth();
      }
    }
  } catch (e) {
    clearAuth();
  } finally {
    loading.value = false;
    ready.value = true;
  }
}

/** register: agar avatar fayl bo'lsa FormData, aks holda JSON */
async function register(payload: {
  fullname?: string;
  email: string;
  phone?: string;
  password: string;
  avatarFile?: File | null;
  avatarDataUrl?: string | null;
}) {
  loading.value = true;
  error.value = null;
  try {
    let resp;
    if (payload.avatarFile) {
      const fd = new FormData();
      fd.append("fullname", payload.fullname ?? "");
      fd.append("email", payload.email);
      fd.append("phone", payload.phone ?? "");
      fd.append("password", payload.password);
      fd.append("avatar", payload.avatarFile);
      // Do not set Content-Type header; axios will set boundary
      resp = await api.post("/auth/register/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else if (payload.avatarDataUrl) {
      // If backend accepts avatarDataUrl in JSON
      resp = await api.post("/auth/register/", {
        fullname: payload.fullname ?? "",
        email: payload.email,
        phone: payload.phone ?? "",
        password: payload.password,
        avatarDataUrl: payload.avatarDataUrl,
      });
    } else {
      resp = await api.post("/auth/register/", {
        fullname: payload.fullname ?? "",
        email: payload.email,
        phone: payload.phone ?? "",
        password: payload.password,
      });
    }

    if (resp.status === 201 || resp.status === 200) {
      const data = resp.data;
      // backend may or may not return token; if returns access -> set it
      const access = data.access || data.token || data.access_token;
      if (access) {
        setAuth(access);
      }
      user.value = data.user ?? data;
      return { data };
    }
    return { error: resp.data };
  } catch (e: any) {
    error.value = e.response?.data ?? e.message ?? e;
    throw e;
  } finally {
    loading.value = false;
  }
}

/** login: backend /auth/login/ (expects email+password in body) */
async function login({ email, password }: { email: string; password: string }) {
  loading.value = true;
  error.value = null;
  try {
    const resp = await api.post("/auth/login/", { email, password });
    if (resp.status === 200) {
      const data = resp.data;
      const access = data.access || data.token || data.access_token;
      if (access) {
        setAuth(access);
      }
      user.value = data.user ?? data;
      return { data };
    }
    return { error: resp.data };
  } catch (e: any) {
    error.value = e.response?.data ?? e.message ?? e;
    throw e;
  } finally {
    loading.value = false;
  }
}

/** logout client-side */
async function logout() {
  loading.value = true;
  try {
    clearAuth();
    return true;
  } catch (e) {
    error.value = e;
    throw e;
  } finally {
    loading.value = false;
  }
}

/* helpers */
function setAuth(accessToken: string) {
  token.value = accessToken;
  safeLocalStorageSet(tokenKey, accessToken);
  api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}
function clearAuth() {
  token.value = null;
  user.value = null;
  safeLocalStorageRemove(tokenKey);
  try {
    delete api.defaults.headers.common["Authorization"];
  } catch {}
}

/* export */
export function useAuth() {
  void init();
  return {
    api,
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    ready: readonly(ready),
    init,
    register,
    login,
    logout,
  };
}

export default useAuth;
