<template>
  <section class="service-page">
    <!-- Header -->
    <div class="card border-0 shadow-sm p-4 mb-4">
      <h4 class="mb-1">Servis-markazi</h4>
      <div class="text-muted">Talabalar uchun barcha xizmatlar bir joyda</div>
    </div>

    <!-- Controls -->
    <div class="d-flex flex-wrap gap-2 align-items-center mb-3">
      <div class="input-group" style="max-width: 360px">
        <span class="input-group-text bg-white border-end-0"
          ><i class="bi bi-search"></i
        ></span>
        <input
          v-model="q"
          type="text"
          class="form-control border-start-0"
          placeholder="Xizmatlardan qidirish..."
        />
      </div>

      <div class="ms-auto d-flex flex-wrap gap-2">
        <button
          v-for="f in filters"
          :key="f.key"
          class="btn btn-light filter-btn"
          :class="{ active: activeFilter === f.key }"
          @click="activeFilter = f.key"
        >
          {{ f.label }}
        </button>
      </div>
    </div>

    <!-- Services grid -->
    <div class="row g-3 g-lg-4">
      <div v-for="s in shown" :key="s.id" class="col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-3 position-relative">
          <!-- status badge -->
          <span
            v-if="s.badge"
            class="status-badge"
            :class="
              s.badge.toLowerCase().includes('24')
                ? 'soft-dark'
                : 'soft-success'
            "
          >
            {{ s.badge }}
          </span>

          <div class="d-flex align-items-start gap-3">
            <div class="icon-wrap" :class="s.color">
              <i :class="s.icon"></i>
            </div>
            <div class="flex-grow-1">
              <h6 class="mb-1">{{ s.title }}</h6>
              <div class="text-muted small">{{ s.desc }}</div>

              <div class="mt-3">
                <button
                  class="btn btn-outline-secondary w-100"
                  :disabled="s.disabled"
                  @click="openAction(s)"
                >
                  {{ s.cta }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="shown.length === 0" class="col-12">
        <div class="card border-0 shadow-sm p-4 text-center text-muted">
          Hech narsa topilmadi.
        </div>
      </div>
    </div>

    <!-- Modal (demo) -->
    <div
      class="modal fade"
      id="srvModal"
      tabindex="-1"
      aria-hidden="true"
      ref="modalEl"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">{{ modal.title }}</h6>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Yopish"
            ></button>
          </div>
          <div class="modal-body">
            <p class="mb-2 text-muted">
              Hozircha namunaviy oyna. Keyingi iteratsiyada real formalar
              qo‘shiladi.
            </p>
            <ul class="mb-0">
              <li><strong>Xizmat:</strong> {{ modal.title }}</li>
              <li><strong>Holat:</strong> {{ modal.badge || "—" }}</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button class="btn btn-light" data-bs-dismiss="modal">
              Bekor qilish
            </button>
            <button class="btn btn-primary">Davom etish</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({ layout: "default" });

import { computed, onMounted, ref } from "vue";

const q = ref("");
const filters = [
  { key: "all", label: "Barchasi" },
  { key: "available", label: "Mavjud" },
  { key: "247", label: "24/7" },
];
const activeFilter = ref("all");

const services = ref([
  {
    id: 1,
    title: "Ma'lumotnoma olish",
    desc: "Talaba ma'lumotnomasi, akademik ma'lumot",
    badge: "Mavjud",
    icon: "bi bi-file-earmark-text",
    cta: "So'rov yuborish",
    color: "c-green",
  },
  {
    id: 2,
    title: "To'lov xizmatlari",
    desc: "O‘quv to‘lovi, asrama to‘lovi",
    badge: "Mavjud",
    icon: "bi bi-credit-card",
    cta: "To‘lovni amalga oshirish",
    color: "c-mint",
  },
  {
    id: 3,
    title: "Kutubxona xizmatlari",
    desc: "Kitob buyurtma qilish, davr uzaytirish",
    badge: "Mavjud",
    icon: "bi bi-journal-bookmark",
    cta: "Kutubxonaga o‘tish",
    color: "c-olive",
  },
  {
    id: 4,
    title: "O`qituvchilik dasturi",
    desc: "O‘qituvchi yoki mentor bilan uchrashuvni rejalashtirish",
    badge: "Mavjud",
    icon: "bi bi-people",
    cta: "Uchrashuv belgilash",
    color: "c-teal",
  },
  {
    id: 5,
    title: "Yordam markazi",
    desc: "Texnik yordam, savol-javob",
    badge: "24/7",
    icon: "bi bi-question-circle",
    cta: "Yordam so‘rash",
    color: "c-blue",
  },
  {
    id: 6,
    title: "Texnik xizmatlar",
    desc: "Kompyuter, internet muammolari",
    badge: "Mavjud",
    icon: "bi bi-wrench-adjustable",
    cta: "Ariza topshirish",
    color: "c-lime",
  },
]);

const shown = computed(() => {
  const term = q.value.trim().toLowerCase();
  const base = services.value.filter((s) => {
    const ok =
      activeFilter.value === "all" ||
      (activeFilter.value === "available" &&
        s.badge?.toLowerCase() === "mavjud") ||
      (activeFilter.value === "247" && s.badge?.includes("24"));
    const matches =
      !term ||
      s.title.toLowerCase().includes(term) ||
      s.desc.toLowerCase().includes(term);
    return ok && matches;
  });
  return base;
});

/* Modal demo */
const modal = ref({ title: "", badge: "" });
let bsModal = null;
const modalEl = ref(null);

function openAction(srv) {
  modal.value = { title: srv.title, badge: srv.badge };
  if (bsModal) bsModal.show();
}

onMounted(async () => {
  // Bootstrap modal instance
  const { Modal } = await import("bootstrap");
  bsModal = new Modal(modalEl.value);
});
</script>

<style scoped>
/* filter buttons */
.filter-btn {
  border: 1px solid var(--line);
  border-radius: 10px;
}
.filter-btn.active {
  background: #e9f2ff;
  color: var(--primary);
  border-color: #cfe3ff;
}

/* badge positions */
.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}
.soft-success {
  background: #e7f7ed;
  color: #106a2b;
}
.soft-dark {
  background: #eef2f7;
  color: #374151;
}

/* icon circle */
.icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 20px;
  border: 1px solid var(--line);
  background: #f6f9ff;
}
.c-green {
  background: #ebf8f1;
  border-color: #d7f0e2;
  color: #1c7f4d;
}
.c-mint {
  background: #e8fbfa;
  border-color: #d3f6f4;
  color: #0f766e;
}
.c-olive {
  background: #eef8ec;
  border-color: #ddefda;
  color: #2f6b2f;
}
.c-teal {
  background: #e9f7fb;
  border-color: #d4eef7;
  color: #0e7490;
}
.c-blue {
  background: #eaf2ff;
  border-color: #d7e6ff;
  color: #2563eb;
}
.c-lime {
  background: #f2fbeb;
  border-color: #e3f6d5;
  color: #3f6212;
}
</style>
