<template>
  <div class="rankedu">
    <!-- Top Navbar -->
    <nav class="navbar navbar-expand bg-white shadow-sm sticky-top">
      <div class="container-fluid px-3">
        <!-- Sidebar toggle + Breadcrumb -->
        <div class="d-flex align-items-center gap-2">
          <button
            class="btn btn-outline-secondary d-flex align-items-center justify-content-center"
            type="button"
            aria-label="Sidebar"
            @click="toggleSidebar"
          >
            <i class="bi bi-list fs-5"></i>
          </button>

          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <a href="#" class="text-decoration-none fw-semibold brand"
                  >RankEdu</a
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Asosiy sahifa
              </li>
            </ol>
          </nav>
        </div>

        <!-- Right side icons -->
        <div class="d-flex align-items-center gap-2">
          <button class="icon-btn" aria-label="Qidiruv">
            <i class="bi bi-search"></i>
          </button>
          <button class="icon-btn" aria-label="Bildirishnomalar">
            <i class="bi bi-bell"></i>
          </button>
          <button class="icon-btn" aria-label="Xabarlar">
            <i class="bi bi-chat-dots"></i>
          </button>

          <!-- Profile avatar -->
          <div class="position-relative" ref="profileWrapper">
            <button
              class="btn p-0 border-0 bg-transparent"
              aria-haspopup="true"
              :aria-expanded="showProfile"
              @click="toggleProfile"
              ref="profileBtn"
            >
              <img :src="profile.photo" alt="Profil rasmi" class="avatar" />
            </button>

            <!-- Profile dropdown -->
            <transition name="fade-scale">
              <div
                v-if="showProfile"
                class="profile-card shadow-lg"
                role="menu"
                aria-label="Profil menyusi"
                ref="profileMenu"
              >
                <div class="text-center pt-3 pb-2">
                  <div class="small text-muted">{{ profile.phone }}</div>
                  <img
                    :src="profile.photo"
                    alt="Avatar"
                    class="avatar xl my-3"
                  />
                  <div class="fw-semibold fs-5">{{ profile.fullname }}</div>
                  <div class="text-muted">{{ profile.email }}</div>
                </div>

                <div class="list-group list-group-flush">
                  <button
                    class="list-group-item d-flex align-items-center gap-2"
                  >
                    <i class="bi bi-gear"></i>
                    <span>Sozlamalar</span>
                  </button>
                  <button
                    class="list-group-item d-flex align-items-center gap-2"
                  >
                    <i class="bi bi-palette2"></i>
                    <span>Mavzu</span>
                  </button>
                  <button
                    class="list-group-item d-flex align-items-center gap-2"
                  >
                    <i class="bi bi-translate"></i>
                    <span>Til</span>
                  </button>
                </div>

                <div class="p-3">
                  <button
                    class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                  >
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Chiqish</span>
                  </button>
                </div>

                <button
                  class="profile-close btn btn-light"
                  @click="showProfile = false"
                  aria-label="Yopish"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </nav>

    <div class="app-body">
      <!-- Mini Sidebar (icon-only) -->
      <aside class="sidebar-mini bg-white border-end">
        <ul class="nav flex-column align-items-center py-3">
          <li class="nav-item">
            <a class="smini-link active" href="#" title="Bosh sahifa">
              <i class="bi bi-house"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="smini-link" href="#" title="Profil"
              ><i class="bi bi-person"></i
            ></a>
          </li>
          <li class="nav-item">
            <a class="smini-link" href="#" title="Kurslar"
              ><i class="bi bi-journal-bookmark"></i
            ></a>
          </li>
          <li class="nav-item">
            <a class="smini-link" href="#" title="Reyting"
              ><i class="bi bi-trophy"></i
            ></a>
          </li>
          <li class="nav-item">
            <a class="smini-link" href="#" title="AI Tavsiyalar"
              ><i class="bi bi-stars"></i
            ></a>
          </li>
        </ul>
      </aside>

      <!-- Slide-out Sidebar Drawer -->
      <transition name="drawer">
        <aside
          v-if="isSidebarOpen"
          class="sidebar-drawer shadow-lg"
          role="dialog"
          aria-label="Yon menyu"
        >
          <div class="d-flex align-items-center gap-2 p-3">
            <div class="logo-square">R</div>
            <span class="fw-bold fs-5">RankEdu</span>
          </div>
          <ul class="nav flex-column px-3">
            <li class="nav-item">
              <a class="nav-link sdw-link active" href="#"
                ><i class="bi bi-house"></i> Bosh sahifa</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link sdw-link" href="#"
                ><i class="bi bi-person"></i> Profil</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link sdw-link" href="#"
                ><i class="bi bi-journal-bookmark"></i> Kurslar</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link sdw-link" href="#"
                ><i class="bi bi-trophy"></i> Reyting</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link sdw-link" href="#"
                ><i class="bi bi-stars"></i> AI Tavsiyalar</a
              >
            </li>
          </ul>
        </aside>
      </transition>

      <!-- Backdrop when drawer open -->
      <transition name="fade">
        <div
          v-if="isSidebarOpen"
          class="backdrop"
          @click="isSidebarOpen = false"
        ></div>
      </transition>

      <!-- Main Content Area (light gray) -->
      <main class="content">
        <!-- Hero inside single gray frame -->
        <section class="hero-frame">
          <div class="row g-4 align-items-center">
            <div class="col-lg-7">
              <div class="badge bg-light text-primary fw-semibold mb-3">
                UZ O‘zbekiston milliy ta’lim platformasi
              </div>
              <h1 class="display-5 fw-bolder lh-sm mb-3 title">
                Bilimga baho emas,
                <span class="text-primary">o‘sishga daraja</span> beramiz
              </h1>
              <p class="text-muted mb-4">
                Raqobat qiling, o‘sishing va e’tirof oling. Yutuqlaringizni XP
                ga aylantiring va reytingda yuqoriga ko‘tariling.
              </p>
              <div class="d-flex gap-3">
                <button class="btn btn-primary btn-lg">Boshlash</button>
                <button class="btn btn-outline-secondary btn-lg">
                  Reytingni ko‘rish
                </button>
              </div>

              <div class="d-flex gap-5 mt-4 stats">
                <div>
                  <div class="h4 fw-bold mb-0 text-primary">10K+</div>
                  <div class="small text-muted">Faol Talabalar</div>
                </div>
                <div>
                  <div class="h4 fw-bold mb-0 text-primary">50+</div>
                  <div class="small text-muted">Universitetlar</div>
                </div>
                <div>
                  <div class="h4 fw-bold mb-0 text-primary">1M+</div>
                  <div class="small text-muted">Ishlab topilgan XP</div>
                </div>
              </div>
            </div>

            <div class="col-lg-5">
              <div
                class="illustration rounded-4 d-flex align-items-center justify-content-center"
              >
                <span class="illus-text">Platforma Illustratsiya</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Three cards -->
        <section class="mt-4">
          <div class="row g-3">
            <div class="col-md-4">
              <div class="card border-0 shadow-sm h-100 p-3">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <i class="bi bi-graph-up-arrow fs-4"></i>
                  <h6 class="mb-0">Yutuqlar</h6>
                </div>
                <p class="text-muted mb-0">
                  Keyingi iteratsiyada real ma’lumotlar bilan to‘ldiriladi.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card border-0 shadow-sm h-100 p-3">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <i class="bi bi-journal-text fs-4"></i>
                  <h6 class="mb-0">So‘nggi kurslar</h6>
                </div>
                <p class="text-muted mb-0">
                  Kurslar ro‘yxati backenddan kelganda bog‘lanadi.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card border-0 shadow-sm h-100 p-3">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <i class="bi bi-emoji-smile fs-4"></i>
                  <h6 class="mb-0">AI tavsiyalar</h6>
                </div>
                <p class="text-muted mb-0">
                  AI modul ulanishidan so‘ng bu blok faollashadi.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

/* State */
const isSidebarOpen = ref(false);
const showProfile = ref(false);

/* Mock user profile */
const profile = {
  fullname: "Окилбек Эркинов",
  email: "erkinovoqilbek@gmail.com",
  phone: "+998 93 643 99 77",
  photo:
    "images/avatar.jpg",
};

/* Outside click handler for profile dropdown */
const profileMenu = ref(null);
const profileBtn = ref(null);
const profileWrapper = ref(null);

const onDocClick = (e) => {
  const menu = profileMenu.value;
  const btn = profileBtn.value;
  const wrap = profileWrapper.value;
  if (!showProfile.value) return;
  if (wrap && !wrap.contains(e.target)) {
    showProfile.value = false;
  } else if (
    menu &&
    btn &&
    e.target !== btn &&
    !menu.contains(e.target) &&
    !btn.contains(e.target)
  ) {
    showProfile.value = false;
  }
};

const toggleProfile = () => (showProfile.value = !showProfile.value);
const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);

onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));
</script>

<style scoped>
:root {
  --primary: #1c7ef2;
  --ink: #0f172a;
  --muted: #6b7280;
  --bg: #f5f7fb; /* kulrang kontent foni */
  --card: #ffffff; /* oq kartalar */
  --line: #e8ecf3;
}

/* Base */
.rankedu {
  background: var(--card);
  min-height: 100vh;
}
.brand {
  color: var(--primary);
}
.text-primary {
  color: var(--primary) !important;
}

/* Navbar */
.icon-btn {
  border: 1px solid var(--line);
  background: #fff;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.icon-btn:hover {
  background: var(--bg);
}
.icon-btn i {
  font-size: 1.1rem;
}

/* Layout grid */
.app-body {
  display: grid;
  grid-template-columns: 72px 1fr; /* mini sidebar + content */
  gap: 0;
}

/* Mini sidebar (icon-only) */
.sidebar-mini {
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  z-index: 10;
}
.smini-link {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #2b3038;
  border: 1px solid var(--line);
  margin: 10px 0;
  transition: 0.15s;
}
.smini-link:hover {
  background: var(--bg);
  color: var(--primary);
}
.smini-link.active {
  background: var(--primary);
  /* color: #fff; */
  border-color: var(--primary);
}

/* Slide-out drawer */
.sidebar-drawer {
  position: fixed;
  inset: 64px auto auto 0; /* from under navbar */
  width: 320px;
  height: calc(100vh - 64px);
  background: #fff;
  border-right: 1px solid var(--line);
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  z-index: 1050;
  overflow-y: auto;
}
.logo-square {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--primary);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
}
.sdw-link {
  color: #3b4453;
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.sdw-link:hover {
  background: #f2f6ff;
  color: var(--primary);
}
.sdw-link.active {
  background: var(--primary);
  /* color: #fff; */
}

/* Drawer transitions */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.2s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(-100%);
}

.backdrop {
  position: fixed;
  inset: 64px 0 0 0;
  background: rgba(17, 24, 39, 0.35);
  backdrop-filter: blur(1px);
  z-index: 1040;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Content zone with light gray bg */
.content {
  background: var(--bg);
  padding: 24px;
  min-height: calc(100vh - 64px);
}

/* Hero frame as single gray card */
.hero-frame {
  background: #eef3fb;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 6px 16px rgba(16, 24, 40, 0.06);
}
.title {
  letter-spacing: -0.3px;
  color: #0b1220;
}

/* Illustration placeholder */
.illustration {
  background: #0d1324;
  height: 260px;
}
.illus-text {
  color: #9fd0ff;
  font-size: 28px;
  opacity: 0.9;
}

/* Avatar + profile menu */
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9eef7;
}
.avatar.xl {
  width: 72px;
  height: 72px;
}

.profile-card {
  position: absolute;
  right: 0;
  margin-top: 10px;
  width: 360px;
  background: #fff;
  border-radius: 18px;
  border: 1px solid var(--line);
  overflow: hidden;
  z-index: 2000;
}
.profile-card .list-group-item {
  border: 0;
  padding: 12px 16px;
}
.profile-card .profile-close {
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
}

/* Animations */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.18s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

/* Responsive */
@media (max-width: 992px) {
  .app-body {
    grid-template-columns: 56px 1fr;
  }
  .sidebar-drawer {
    width: 300px;
  }
  .illustration {
    height: 220px;
  }
}
</style>
