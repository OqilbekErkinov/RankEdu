<template>
  <div class="navprofile-wrap position-relative" ref="wrap">
    <!-- Trigger avatar -->
    <button
      class="btn p-0 bg-transparent border-0"
      @click="toggle"
      ref="btn"
      aria-haspopup="true"
      :aria-expanded="open"
    >
      <img :src="profile.avatar || defaultAvatar" alt="avatar" class="avatar" />
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

        <!-- Header (fixed part) -->
        <div class="panel-header text-center px-4 pt-2">
          <div class="phone ">{{ profile.phoneDisplay }}</div>
          <div class="avatar-wrap mx-auto ">
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
            {{ profile.email || "email@misol.uz" }}
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

        <!-- Scrollable content area -->
        <div class="panel-body">
          <div class="panel-content px-3 py-0">
            <!-- SETTINGS -->
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
                  <label class="form-label small mb-0 pb-0">Elektron pochta</label>
                  <input v-model="form.email" class="form-control" />
                </div>

                <div class="">
                  <label class="form-label small mb-0 pb-0">Profil rasm (jpg/png)</label>
                  <input
                    type="file"
                    class="form-control"
                    accept="image/*"
                    @change="onAvatarSelected"
                  />
                </div>

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

            <!-- THEME -->
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

            <!-- LANG -->
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

            <!-- bottom logout -->
            <div class="mt-2">
              <button
                class="btn btn-light w-100 py-3 rounded-4 d-flex align-items-center gap-2 justify-content-start"
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
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

const defaultAvatar = "/images/default-avatar.png";

const open = ref(false);
const tab = ref("settings");
const theme = ref("light");
const lang = ref("uz");

const wrap = ref(null);

const profile = reactive({
  fullname: "",
  phone: "",
  email: "",
  avatar: "",
  get phoneDisplay() {
    return this.phone || "+998 90 000 00 00";
  },
});

const form = reactive({
  fullname: "",
  phone: "",
  email: "",
  avatarFile: null,
  avatarPreview: null,
});

const STORAGE_KEY = "nav_profile_v2";

function toggle() {
  open.value = !open.value;
  if (open.value) {
    syncFormFromProfile();
  }
}

function setTab(t) {
  tab.value = t;
}

function onDocClick(e) {
  if (!open.value) return;
  const w = wrap.value;
  if (w && !w.contains(e.target)) open.value = false;
}

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

function resetProfileImage() {
  form.avatarFile = null;
  form.avatarPreview = null;
  profile.avatar = "";
  saveToStorage();
}

function saveProfile() {
  profile.fullname = form.fullname.trim();
  profile.phone = form.phone.trim();
  profile.email = form.email.trim();
  if (form.avatarPreview) profile.avatar = form.avatarPreview;
  saveToStorage();
  open.value = false;
}

function setTheme(t) {
  theme.value = t;
  if (typeof window !== "undefined") {
    document.documentElement.setAttribute(
      "data-theme",
      t === "system" ? "light" : t
    );
  }
  saveToStorage();
}

function setLang(l) {
  lang.value = l;
  saveToStorage();
}

function logout() {
  // real app: call auth logout
  alert("Chiqish (demo)");
  open.value = false;
}

function syncFormFromProfile() {
  form.fullname = profile.fullname || "";
  form.phone = profile.phone || "";
  form.email = profile.email || "";
  form.avatarPreview = profile.avatar || null;
}

/* localStorage safe functions */
function loadFromStorage() {
  try {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    Object.assign(profile, parsed.profile || {});
    theme.value = parsed.theme || theme.value;
    lang.value = parsed.lang || lang.value;
  } catch (e) {
    /* ignore */
  }
}

function saveToStorage() {
  try {
    if (typeof window === "undefined") return;
    const payload = {
      profile: {
        fullname: profile.fullname,
        phone: profile.phone,
        email: profile.email,
        avatar: profile.avatar,
      },
      theme: theme.value,
      lang: lang.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    /* ignore */
  }
}

onMounted(() => {
  loadFromStorage();
  document.addEventListener("click", onDocClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick);
});


const auth = useAuth()
const router = useRouter()

function logoutHandler() {
  auth.logout()
  router.push('/signin')
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

/* panel layout */
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

/* tabs */
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

/* preview */
.preview {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 50%;
  border: 6px solid #fff;
  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.12);
}

/* close */
.profile-close {
  position: absolute;
  top: 12px;
  right: 12px;
  border-radius: 50%;
}

/* transition */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.18s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

/* responsive */
@media (max-width: 520px) {
  .profile-panel {
    width: 92vw;
    right: 4%;
    left: 4%;
    max-height: calc(100vh - 40px);
  }
}
</style>
