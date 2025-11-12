<template>
  <div class="navprofile-wrap position-relative" ref="wrap">
    <!-- Agar foydalanuvchi autentifikatsiyadan o'tmagan bo'lsa — signin tugmasi -->
    <div v-if="!isAuthenticated" class="d-flex align-items-center gap-2">
      <button class="btn btn-sm btn-outline-primary" @click="goSignIn">
        Sign in
      </button>
      <button class="btn btn-sm btn-outline-secondary" @click="goSignUp">
        Sign up
      </button>
    </div>

    <!-- Auth qilingan bo'lsa — profil tugmasi -->
    <div v-else>
      <button
        class="btn p-0 bg-transparent border-0"
        @click="toggle"
        ref="btn"
        aria-haspopup="true"
        :aria-expanded="open"
      >
        <img
          :src="profile.avatar || defaultAvatar"
          alt="avatar"
          class="avatar"
        />
      </button>

      <transition name="fade-scale">
        <div
          v-if="open"
          class="profile-panel shadow-lg"
          ref="panel"
          role="dialog"
          aria-label="Profile panel"
        >
          <button class="btn btn-light profile-close" @click="open = false">
            <i class="bi bi-x-lg"></i>
          </button>

          <div class="panel-header text-center px-4 pt-2">
            <div class="phone">{{ profile.phoneDisplay }}</div>

            <div class="avatar-wrap mx-auto">
              <img
                :src="profile.avatar || defaultAvatar"
                alt="avatar"
                class="avatar xl"
              />
            </div>

            <div class="fw-semibold fs-5">
              {{ profile.fullname || "Foydalanuvchi Ismi" }}
            </div>
            <div class="text-muted small">
              {{ profile.email || userEmail || "email@misol.uz" }}
            </div>

            <div class="tabs d-flex gap-2 mt-1 justify-content-center">
              <button
                class="btn tab-btn"
                :class="{ active: tab === 'settings' }"
                @click="setTab('settings')"
              >
                Sozlamalar
              </button>
              <button
                class="btn tab-btn"
                :class="{ active: tab === 'theme' }"
                @click="setTab('theme')"
              >
                Mavzu
              </button>
              <button
                class="btn tab-btn"
                :class="{ active: tab === 'lang' }"
                @click="setTab('lang')"
              >
                Til
              </button>
            </div>
          </div>

          <div class="panel-body">
            <div class="panel-content px-3 py-0">
              <div v-if="tab === 'settings'">
                <form @submit.prevent="saveProfile">
                  <div class="">
                    <label class="form-label small mb-0 pb-0">To'liq ism</label>
                    <input v-model="form.fullname" class="form-control" />
                  </div>

                  <div class="">
                    <label class="form-label small mb-0 pb-0">Telefon</label>
                    <input v-model="form.phone" class="form-control" />
                  </div>

                  <div class="">
                    <label class="form-label small mb-0 pb-0">
                      Elektron pochta
                    </label>
                    <input v-model="form.email" class="form-control" />
                  </div>

                  <div class="">
                    <label class="form-label small mb-0 pb-0">
                      Profil rasm (jpg/png)
                    </label>
                    <input
                      type="file"
                      class="form-control"
                      accept="image/*"
                      @change="onAvatarSelected"
                    />
                  </div>

                  <!-- <div v-if="form.avatarPreview" class="mt-2 text-center">
                    <img :src="form.avatarPreview" class="preview" alt="preview" />
                  </div> -->

                  <div class="d-flex gap-2 mb-2 mt-2">
                    <button
                      type="button"
                      class="btn btn-outline-danger w-50"
                      @click="resetProfileImage"
                    >
                      Profil rasmini o'chirish
                    </button>
                    <button type="submit" class="btn btn-primary w-50">
                      Saqlash
                    </button>
                  </div>
                </form>
              </div>

              <div v-if="tab === 'theme'">
                <div class="mb-2 small text-muted">Mavzuni tanlang</div>
                <div class="d-flex gap-2 flex-wrap mb-3">
                  <button
                    class="btn btn-outline-secondary"
                    :class="{ active: theme === 'light' }"
                    @click="setTheme('light')"
                  >
                    Yorug'
                  </button>
                  <button
                    class="btn btn-outline-secondary"
                    :class="{ active: theme === 'dark' }"
                    @click="setTheme('dark')"
                  >
                    Qorong'
                  </button>
                  <button
                    class="btn btn-outline-secondary"
                    :class="{ active: theme === 'system' }"
                    @click="setTheme('system')"
                  >
                    Tizim
                  </button>
                </div>
                <div class="text-muted small">Tanlov brauzerda saqlanadi.</div>
              </div>

              <div v-if="tab === 'lang'">
                <div class="mb-2 small text-muted">Tilni tanlang</div>
                <div class="d-flex gap-2 mb-3">
                  <button
                    class="btn btn-outline-secondary"
                    :class="{ active: lang === 'uz' }"
                    @click="setLang('uz')"
                  >
                    O'zbekcha
                  </button>
                  <button
                    class="btn btn-outline-secondary"
                    :class="{ active: lang === 'ru' }"
                    @click="setLang('ru')"
                  >
                    Русский
                  </button>
                  <button
                    class="btn btn-outline-secondary"
                    :class="{ active: lang === 'en' }"
                    @click="setLang('en')"
                  >
                    English
                  </button>
                </div>
              </div>

              <div class="mt-2">
                <button
                  class="btn btn-light w-100 py-3 mb-3 rounded-4 d-flex align-items-center gap-2 justify-content-start"
                  @click="logoutHandler"
                >
                  <i class="bi bi-box-arrow-right fs-5"></i>
                  <span class="fw-semibold">Chiqish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
/*
  NavProfile.vue (to'liq, tuzatilgan)
  - localStorage endi har user uchun alohida kalit ("nav_profile_{uid}")
  - panel faqat auth qilingan foydalanuvchi uchun ishlaydi
  - auth o'zgarishida DB dan qayta yuklaydi va localStorage ni moslashtiradi
  - avatar preview qo'shildi; agar kerak bo'lsa Supabase Storage yuklash joyi komment qoldirildi
*/

import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  watch,
  computed,
} from "vue";
import { useRouter } from "vue-router";
import { useNuxtApp } from "#app";
import useAuth from "@/composables/useAuth";

const defaultAvatar = "/images/default-avatar.png";

/* reactive state */
const open = ref(false);
const tab = ref("settings");
const theme = ref("light");
const lang = ref("uz");
const wrap = ref(null);

/* profile reactive object (DB source of truth when logged in) */
const profile = reactive({
  user_id: null,
  fullname: "",
  phone: "",
  email: "",
  avatar: "", // avatar_url yoki dataURL
  get phoneDisplay() {
    return this.phone || "+998 90 000 00 00";
  },
});

/* form for edits */
const form = reactive({
  fullname: "",
  phone: "",
  email: "",
  avatarFile: null,
  avatarPreview: null, // used for preview before saving
});

/* dependencies */
const { $supabase } = useNuxtApp();
const auth = useAuth();
const router = useRouter();

/* computed helpers */
const userId = computed(() => auth.user?.value?.id || null);
const isAuthenticated = computed(() => !!userId.value);
const userEmail = computed(() => auth.user?.value?.email || "");

/* localStorage key builder - per-user */
function storageKeyFor(uid) {
  if (!uid) return "nav_profile_anonymous";
  return `nav_profile_${uid}`;
}

/* sync form from current profile reactive object */
function syncFormFromProfile() {
  form.fullname = profile.fullname || "";
  form.phone = profile.phone || "";
  form.email = profile.email || "";
  form.avatarPreview = profile.avatar || null;
  form.avatarFile = null;
}

/* toggle panel - only if authenticated */
function toggle() {
  if (!isAuthenticated.value) {
    // Prevent opening panel if not logged in
    goSignIn();
    return;
  }
  open.value = !open.value;
  if (open.value) syncFormFromProfile();
}

function setTab(t) {
  tab.value = t;
}

/* click outside handler to close panel */
function onDocClick(e) {
  if (!open.value) return;
  const w = wrap.value;
  if (w && !w.contains(e.target)) open.value = false;
}

/* Avatar file select */
function onAvatarSelected(e) {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  form.avatarFile = f;
  const reader = new FileReader();
  reader.onload = () => {
    form.avatarPreview = reader.result;
  };
  reader.readAsDataURL(f);
}

/* Reset avatar in form and profile (and persist) */
function resetProfileImage() {
  form.avatarFile = null;
  form.avatarPreview = null;
  profile.avatar = "";
  saveToStorageForCurrent();
}

/* Save profile changes: persist to DB and localStorage */
async function saveProfile() {
  // update local reactive first
  profile.fullname = form.fullname.trim();
  profile.phone = form.phone.trim();
  profile.email = form.email.trim();

  // prefer file upload if provided - here preview is used; ideally upload file to Supabase Storage and get public URL
  if (form.avatarPreview) {
    profile.avatar = form.avatarPreview;
  }

  // persist to localStorage per-user
  saveToStorageForCurrent();

  // if user logged in, upsert to profiles table
  if (userId.value) {
    const payload = {
      user_id: userId.value,
      fullname: profile.fullname || null,
      phone: profile.phone || null,
      email: profile.email || null,
      avatar_url: profile.avatar || null, // you may want to upload file and use url
    };

    try {
      const { data, error } = await $supabase
        .from("profiles")
        .upsert(payload, { onConflict: "user_id" })
        .select()
        .single();

      if (error) {
        console.warn("profile upsert error", error);
      } else if (data) {
        // ensure reactive profile matches DB row
        Object.assign(profile, data);
        // update storage again (in case DB returns normalized fields)
        saveToStorageForCurrent();
      }
    } catch (e) {
      console.error("saveProfile exception", e);
    }
  }

  open.value = false;
}

/* Theme / Lang handlers */
function setTheme(t) {
  theme.value = t;
  if (typeof window !== "undefined") {
    document.documentElement.setAttribute(
      "data-theme",
      t === "system" ? "light" : t
    );
  }
  saveToStorageForCurrent();
}
function setLang(l) {
  lang.value = l;
  saveToStorageForCurrent();
}

/* Logout handler */
async function logoutHandler() {
  try {
    if (auth && auth.logout) {
      await auth.logout();
    } else {
      // fallback: supabase signOut
      await $supabase.auth.signOut();
    }
  } catch (e) {
    console.error("logout error", e);
  } finally {
    // on logout, clear in-memory and localStorage
    clearProfileLocal();
    router.push("/signin");
  }
}

/* Redirect helpers for non-auth users */
function goSignIn() {
  router.push({ path: "/signin" });
}
function goSignUp() {
  router.push({ path: "/signup" });
}

/* ----- localStorage helpers (per user) ----- */
function saveToStorageForCurrent() {
  try {
    if (typeof window === "undefined") return;
    const uid = userId.value;
    const key = storageKeyFor(uid);
    const payload = {
      profile: {
        user_id: profile.user_id,
        fullname: profile.fullname,
        phone: profile.phone,
        email: profile.email,
        avatar: profile.avatar,
      },
      theme: theme.value,
      lang: lang.value,
      savedAt: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (e) {
    console.error("saveToStorageForCurrent error", e);
  }
}

/* load storage for a specific user */
function loadFromStorageFor(uid) {
  try {
    if (typeof window === "undefined") return null;
    const key = storageKeyFor(uid);
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

/* clear local storage for current user (used on logout) */
function clearProfileLocal() {
  try {
    const uid = userId.value;
    if (uid) {
      localStorage.removeItem(storageKeyFor(uid));
    } else {
      // remove anonymous key if any
      localStorage.removeItem(storageKeyFor(null));
    }
    // reset in-memory profile
    profile.user_id = null;
    profile.fullname = "";
    profile.phone = "";
    profile.email = "";
    profile.avatar = "";
    form.fullname = "";
    form.phone = "";
    form.email = "";
    form.avatarFile = null;
    form.avatarPreview = null;
  } catch (e) {
    console.error("clearProfileLocal error", e);
  }
}

/* ----- Database load ----- */
async function loadProfileFromDb(uid) {
  if (!uid) return;
  try {
    const { data, error } = await $supabase
      .from("profiles")
      .select("*")
      .eq("user_id", uid)
      .maybeSingle();

    if (!error && data) {
      // apply DB values into reactive profile
      profile.user_id = data.user_id || uid;
      profile.fullname = data.fullname || data.full_name || profile.fullname;
      profile.phone = data.phone || profile.phone;
      profile.email = data.email || profile.email;
      profile.avatar = data.avatar_url || data.avatar || profile.avatar;
      // sync form preview to show current avatar
      syncFormFromProfile();
      // persist to per-user localStorage
      saveToStorageForCurrent();
      return;
    }
  } catch (e) {
    console.error("loadProfileFromDb exception:", e);
  }

  // if DB not present, fall back to auth metadata and any localStorage for user
  const stored = loadFromStorageFor(uid);
  if (stored && stored.profile) {
    Object.assign(profile, stored.profile);
    theme.value = stored.theme || theme.value;
    lang.value = stored.lang || lang.value;
    syncFormFromProfile();
    return;
  }

  // fallback: take from auth metadata
  try {
    const { data: userRes } = await $supabase.auth.getUser();
    const u = userRes?.user;
    if (u) {
      profile.user_id = uid;
      profile.email = profile.email || u.email || "";
      profile.fullname = profile.fullname || (u.user_metadata?.full_name || "");
      profile.avatar = profile.avatar || u.user_metadata?.avatar_url || "";
      syncFormFromProfile();
      saveToStorageForCurrent();
    }
  } catch (e) {
    console.error("fallback auth metadata error", e);
  }
}

/* ----- Watch auth changes ----- */
onMounted(() => {
  document.addEventListener("click", onDocClick);

  // watch for auth user changes (login/logout/switch)
  watch(
    () => auth.user?.value?.id,
    async (uid, oldUid) => {
      // if user switched accounts: clear old per-user local fields, then load new user's profile
      if (oldUid && oldUid !== uid) {
        // do not remove storage for oldUid globally, but clear in-memory to avoid showing previous avatar
        profile.user_id = null;
        profile.fullname = "";
        profile.phone = "";
        profile.email = "";
        profile.avatar = "";
        form.fullname = "";
        form.phone = "";
        form.email = "";
        form.avatarPreview = null;
      }

      if (uid) {
        // load db and/or local storage for this uid
        await loadProfileFromDb(uid);
      } else {
        // user logged out -> clear in-memory profile
        profile.user_id = null;
        profile.fullname = "";
        profile.phone = "";
        profile.email = "";
        profile.avatar = "";
        form.fullname = "";
        form.phone = "";
        form.email = "";
        form.avatarPreview = null;
      }
    },
    { immediate: true }
  );
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick);
});

/* ----- Optional: function to upload avatar file to Supabase Storage and return public URL.
   If you prefer to store images in Storage rather than base64 in profiles.avatar_url,
   implement this helper and call it in saveProfile() before upserting. */
async function uploadAvatarToStorage(file, uid) {
  if (!file || !uid) return null;
  try {
    const ext = file.name.split(".").pop();
    const filename = `avatars/${uid}.${ext}`;
    // Example using bucket "public-avatars" (create it in Supabase Storage and set proper policies)
    const { data, error } = await $supabase.storage
      .from("public-avatars")
      .upload(filename, file, { upsert: true });

    if (error) {
      console.warn("uploadAvatarToStorage error", error);
      return null;
    }
    // get public URL:
    const { publicUrl } = $supabase.storage
      .from("public-avatars")
      .getPublicUrl(filename);
    return publicUrl;
  } catch (e) {
    console.error("uploadAvatarToStorage exception", e);
    return null;
  }
}
</script>

<style scoped>
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9eef7;
}
.avatar.xl {
  width: 86px;
  height: 86px;
  border-width: 3px;
  border-radius: 50%;
  box-shadow: 0 6px 20px rgba(16, 24, 40, 0.08);
}
.profile-panel {
  position: absolute;
  right: 0;
  margin-top: 12px;
  width: 420px;
  max-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e6e9f0;
  border-radius: 20px;
  overflow: hidden;
  z-index: 1050;
}
.panel-header {
  flex: 0 0 auto;
  padding-left: 24px;
  padding-right: 24px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.03);
}
.panel-body {
  flex: 1 1 auto;
  overflow: hidden;
}
.panel-content {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-top: 12px;
  padding-bottom: 16px;
}
.tab-btn {
  border-radius: 10px;
  border: 1px solid #dfe6f2;
  background: #fff;
  padding: 8px 12px;
  font-size: 14px;
}
.tab-btn.active {
  background: #0d6efd;
  color: #fff;
  border-color: #0d6efd;
}
.preview {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 50%;
  border: 6px solid #fff;
  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.12);
}
.profile-close {
  position: absolute;
  top: 12px;
  right: 12px;
  border-radius: 50%;
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.18s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
@media (max-width: 520px) {
  .profile-panel {
    width: 92vw;
    right: 4%;
    left: 4%;
    max-height: calc(100vh - 40px);
  }
}
</style>
