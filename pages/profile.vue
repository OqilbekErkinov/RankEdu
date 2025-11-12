<template>
  <div class="profile-page container-fluid py-4">
    <div class="row g-3 align-items-stretch">
      <!-- LEFT MINI -->
      <div class="col-lg-3">
        <div class="card border-0 shadow-sm h-100 p-3">
          <div class="d-flex align-items-center gap-3">
            <div :class="['ava-circle', 'sm']">
              <img
                v-if="user.avatar"
                :src="user.avatar"
                alt="avatar"
                class="mini-avatar"
              />
              <span v-else class="initials">{{ initials }}</span>
            </div>
            <div class="flex-grow-1">
              <div class="fw-semibold">{{ user.fullname }}</div>
              <div class="small text-muted">{{ user.universityShort }}</div>
            </div>
          </div>

          <div
            class="d-flex align-items-center justify-content-between mt-3 small text-muted"
          >
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-mortarboard"></i>
              <span>Level {{ levelComputed }}</span>
            </div>
            <div
              class="d-flex align-items-center gap-2 text-warning fw-semibold"
            >
              <i class="bi bi-star-fill"></i>
              <span>{{ formatNumber(user.xp || 0) }} XP</span>
            </div>
          </div>

          <div class="mt-3">
            <div class="progress prog-thin">
              <div
                class="progress-bar bg-warning"
                :style="{ width: progressPercent + '%' }"
              ></div>
            </div>
            <div class="d-flex justify-content-between small text-muted mt-1">
              <span>
                {{ formatNumber(xpToNext) }} XP to Level
                {{ levelComputed + 1 }}
              </span>
            </div>
          </div>

          <div class="mt-3 d-grid">
            <button class="btn btn-outline-danger" @click="removeAvatar">
              Profil rasmini o'chirish
            </button>
          </div>
        </div>
      </div>

      <!-- MAIN -->
      <div class="col-lg-9">
        <div class="card border-0 shadow-sm p-4 position-relative">
          <button
            class="btn btn-light border position-absolute top-3 end-3 rounded-3"
            style="right: 1.4rem"
            @click="openEditProfile"
          >
            Edit Profile
          </button>

          <div class="d-flex align-items-center gap-4">
            <div class="ava-circle xl">
              <img
                v-if="user.avatar"
                :src="user.avatar"
                alt="avatar"
                class="profilavatar"
              />
              <span v-else class="initials">{{ initials }}</span>
            </div>

            <div class="flex-grow-1">
              <h3 class="mb-1">{{ user.fullname }}</h3>
              <div class="text-muted">
                {{ user.universityFull }} <span class="mx-1">•</span>
                {{ user.major }}
              </div>

              <div class="d-flex flex-wrap align-items-center gap-4 mt-3">
                <div>
                  <div class="text-primary fw-semibold fs-5">
                    Level {{ levelComputed }}
                  </div>
                  <div class="small text-muted">Senior Rank</div>
                </div>
                <div>
                  <div class="fw-semibold fs-5 text-warning">
                    {{ formatNumber(user.xp || 0) }} XP
                  </div>
                  <div class="small text-muted">Total Experience</div>
                </div>
                <div>
                  <div class="fw-semibold fs-5 text-warning">
                    #{{ user.globalRank || "-" }}
                  </div>
                  <div class="small text-muted">Global Rank</div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <div class="progress prog-fat">
              <div
                class="progress-bar bg-warning"
                :style="{ width: overallPercent + '%' }"
              ></div>
            </div>
            <div class="d-flex justify-content-end small text-muted mt-1">
              <span>
                {{ formatNumber(user.xp || 0) }} /
                {{ formatNumber(MAX_TOTAL_XP) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Achievements header -->
        <div
          class="d-flex align-items-center justify-content-between mt-4 mb-2"
        >
          <h5 class="mb-0">Badges & Achievements ({{ badges.length }})</h5>
          <div>
            <button class="btn btn-primary" @click="openAddAchievement">
              Yutuq qo'shish
            </button>
          </div>
        </div>

        <!-- Achievements list -->
        <div class="card border-0 shadow-sm p-3">
          <div class="row g-3">
            <div v-if="badges.length === 0" class="col-12">
              <div class="text-muted">Hozircha yutuq topilmadi.</div>
            </div>

            <div
              v-for="a in badges"
              :key="a.id"
              class="col-6 col-md-4 col-lg-3"
            >
              <div class="badge-card h-100 position-relative">
                <div class="badge-icon small">{{ a.icon || "🏅" }}</div>
                <div class="fw-semibold text-center mt-2">{{ a.title }}</div>
                <div class="small text-center text-muted mt-1">
                  {{ a.metaLine || a.code }}
                </div>
                <div class="text-center mt-2">
                  <span class="pill" :class="tierClass(a.xp_count)">
                    {{ tierLabel(a.xp_count) }}
                  </span>
                </div>
                <div class="small text-muted text-center mt-1">
                  {{ formatDate(a.created_at) }}
                </div>

                <div class="d-flex gap-2 mt-3">
                  <button
                    class="btn btn-sm btn-outline-secondary w-100"
                    @click="editAchievement(a)"
                  >
                    Tahrirlash
                  </button>
                  <button
                    class="btn btn-sm btn-outline-danger w-100"
                    @click="deleteAchievement(a.id)"
                  >
                    O'chirish
                  </button>
                </div>

                <div v-if="a.proof_url" class="mt-2 text-center">
                  <a :href="a.proof_url" target="_blank" class="small"
                    >Isbotni ko'rish</a
                  >
                </div>

                <div
                  class="xp-badge position-absolute"
                  title="this achievement XP"
                >
                  +{{ formatNumber(a.xp_count || 0) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal (dark themed) -->
    <div
      class="modal fade"
      id="editProfileModal"
      tabindex="-1"
      aria-hidden="true"
      ref="editProfileModalRef"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content dark-modal">
          <div class="modal-header border-0">
            <h5 class="modal-title">Profilni tahrirlash</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Yopish"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">To'liq ism</label>
              <input
                v-model="editProfileForm.fullname"
                type="text"
                class="form-control"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Universitet (Qisqa)</label>
              <input
                v-model="editProfileForm.universityShort"
                type="text"
                class="form-control"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Universitet (To'liq)</label>
              <input
                v-model="editProfileForm.universityFull"
                type="text"
                class="form-control"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Mutaxassislik</label>
              <input
                v-model="editProfileForm.major"
                type="text"
                class="form-control"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Profil rasm (jpg/png)</label>
              <input
                type="file"
                class="form-control"
                accept="image/*"
                @change="onAvatarSelected"
              />
            </div>

            <div v-if="user.avatar" class="text-center mb-3">
              <img :src="user.avatar" alt="preview" class="preview-avatar" />
              <div class="mt-2">
                <button class="btn btn-sm btn-danger" @click="removeAvatar">
                  O'chirish
                </button>
              </div>
            </div>
          </div>

          <div class="modal-footer border-0">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Bekor qilish
            </button>
            <button type="button" class="btn btn-primary" @click="saveProfile">
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Achievement modal (dark themed) -->
    <div
      class="modal fade"
      id="achievementModal"
      tabindex="-1"
      aria-hidden="true"
      ref="achievementModalRef"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content dark-modal">
          <div class="modal-header border-0">
            <h5 class="modal-title">
              {{ achForm.editing ? "Yutuqni tahrirlash" : "Yutuq qo'shish" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Yopish"
            ></button>
          </div>

          <div class="modal-body">
            <div class="d-flex gap-2 mb-3">
              <button
                class="btn"
                :class="step === 1 ? 'btn-primary' : 'btn-outline-secondary'"
              >
                1. Kategoriya
              </button>
              <button
                class="btn"
                :class="step === 2 ? 'btn-primary' : 'btn-outline-secondary'"
              >
                2. Detallar
              </button>
              <button
                class="btn"
                :class="step === 3 ? 'btn-primary' : 'btn-outline-secondary'"
              >
                3. Isbot & Qo'shish
              </button>
            </div>

            <div v-if="step === 1">
              <div class="mb-3 text-muted">Kategoriyani tanlang:</div>
              <div class="d-flex flex-wrap gap-2">
                <button
                  v-for="c in categories"
                  :key="c.key"
                  class="btn"
                  :class="
                    achForm.category === c.key
                      ? 'btn-primary'
                      : 'btn-outline-secondary'
                  "
                  @click="selectCategory(c.key)"
                >
                  {{ c.label }}
                </button>
              </div>
              <div class="mt-3">
                <small class="text-light">
                  Qayta tanlash uchun kategoriya ustiga qayta bossangiz yetadi.
                </small>
              </div>
            </div>

            <div v-if="step === 2">
              <div class="mb-3">
                <label class="form-label">Yutuq nomi (ko'rinish uchun)</label>
                <input
                  v-model="achForm.title"
                  type="text"
                  class="form-control text-light"
                  placeholder="Masalan: IELTS 7.5 yoki Hackathon Winner"
                />
              </div>

              <!-- international cert -->
              <div v-if="achForm.category === 'international_cert'">
                <label class="form-label"
                  >Til sertifikatni tanlang yoki qo'lda kiriting</label
                >
                <div class="d-flex gap-2 flex-wrap mb-2">
                  <button
                    v-for="s in intlCerts"
                    :key="s"
                    class="btn"
                    :class="
                      achForm.sub === s
                        ? 'btn-outline-primary active'
                        : 'btn-outline-secondary'
                    "
                    @click="achForm.sub = s"
                  >
                    {{ s }}
                  </button>
                  <input
                    v-model="achForm.subCustom"
                    placeholder="Qo'lda kiritish..."
                    class="form-control w-auto"
                  />
                </div>

                <label class="form-label mt-3"
                  >Daraja (C2, C1, B2... yoki qo'lda)</label
                >
                <div class="d-flex gap-2 flex-wrap">
                  <button
                    v-for="d in intlLevels"
                    :key="d"
                    class="btn"
                    :class="
                      achForm.level === d
                        ? 'btn-outline-primary active'
                        : 'btn-outline-secondary'
                    "
                    @click="achForm.level = d"
                  >
                    {{ d }}
                  </button>
                  <input
                    v-model="achForm.levelCustom"
                    placeholder="Qo'lda daraja..."
                    class="form-control w-auto"
                  />
                </div>
              </div>

              <!-- national cert -->
              <div v-if="achForm.category === 'national_cert'">
                <label class="form-label"
                  >Milliy sertifikat turini tanlang yoki qo'lda kiriting</label
                >
                <div class="d-flex gap-2 flex-wrap mb-2">
                  <button
                    v-for="s in nationalTypes"
                    :key="s"
                    class="btn"
                    :class="
                      achForm.sub === s
                        ? 'btn-outline-primary active'
                        : 'btn-outline-secondary'
                    "
                    @click="achForm.sub = s"
                  >
                    {{ s }}
                  </button>
                  <input
                    v-model="achForm.subCustom"
                    placeholder="Qo'lda kiriting..."
                    class="form-control w-auto"
                  />
                </div>

                <label class="form-label mt-3">Daraja (A+, A, B+ ...)</label>
                <div class="d-flex gap-2 flex-wrap">
                  <button
                    v-for="d in nationalLevels"
                    :key="d"
                    class="btn"
                    :class="
                      achForm.level === d
                        ? 'btn-outline-primary active'
                        : 'btn-outline-secondary'
                    "
                    @click="achForm.level = d"
                  >
                    {{ d }}
                  </button>
                  <input
                    v-model="achForm.levelCustom"
                    placeholder="Qo'lda daraja..."
                    class="form-control w-auto"
                  />
                </div>
              </div>

              <!-- articles -->
              <div
                v-if="
                  achForm.category === 'intl_article' ||
                  achForm.category === 'rep_article'
                "
              >
                <label class="form-label">Maqola nomi</label>
                <input
                  v-model="achForm.title"
                  type="text"
                  class="form-control"
                  placeholder="Maqola nomi..."
                />
                <div class="mt-3">
                  <label class="form-label"
                    >Nashr / Konferensiya (ixtiyoriy)</label
                  >
                  <input
                    v-model="achForm.subCustom"
                    type="text"
                    class="form-control"
                    placeholder="Nashr, jurnal yoki konferensiya..."
                  />
                </div>
              </div>

              <!-- activity -->
              <div v-if="achForm.category === 'activity'">
                <label class="form-label">Faollik turini tanlang</label>
                <div class="d-flex gap-2 flex-wrap mb-2">
                  <button
                    v-for="act in activities"
                    :key="act.key"
                    class="btn"
                    :class="
                      achForm.sub === act.key
                        ? 'btn-outline-primary active'
                        : 'btn-outline-secondary'
                    "
                    @click="achForm.sub = act.key"
                  >
                    {{ act.label }}
                  </button>
                  <input
                    v-model="achForm.subCustom"
                    placeholder="Qo'lda kiriting..."
                    class="form-control w-auto"
                  />
                </div>

                <div class="mt-3">
                  <label class="form-label">Natija turini tanlang</label>
                  <div class="d-flex gap-2 flex-wrap">
                    <button
                      v-for="res in activityResults"
                      :key="res.key"
                      class="btn"
                      :class="
                        achForm.level === res.key
                          ? 'btn-outline-primary active'
                          : 'btn-outline-secondary'
                      "
                      @click="achForm.level = res.key"
                    >
                      {{ res.label }}
                    </button>
                    <input
                      v-model="achForm.levelCustom"
                      placeholder="Qo'lda kiriting..."
                      class="form-control w-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div v-if="step === 3">
              <div class="mb-3">
                <label class="form-label">Qo'shimcha izoh</label>
                <textarea
                  v-model="achForm.note"
                  class="form-control"
                  rows="3"
                  placeholder="Masalan: sertifikat raqami yoki izoh..."
                ></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Isbot (rasm yoki video)</label>
                <input
                  type="file"
                  class="form-control"
                  @change="onProofSelected"
                />
                <div v-if="achForm.proofUrl" class="mt-2">
                  <a :href="achForm.proofUrl" target="_blank"
                    >Yuklangan faylni ko'rish</a
                  >
                </div>
              </div>

              <div class="mb-3">
                <strong>Taxminiy XP:</strong>
                <span class="fw-semibold">{{ formatNumber(previewXp) }}</span>
                <div class="text-light small mt-1">
                  XP avtomatik ravishda tanlangan kategoriya va darajaga qarab
                  hisoblanadi.
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer border-0">
            <div class="w-100 d-flex justify-content-between">
              <div>
                <button
                  class="btn btn-secondary"
                  :disabled="step === 1"
                  @click="prevStep"
                >
                  Ortga
                </button>
              </div>
              <div>
                <button
                  v-if="step < 3"
                  class="btn btn-outline-primary"
                  @click="nextStep"
                >
                  Keyingi
                </button>

                <!-- Submit button: disabled during submitting with spinner -->
                <button
                  v-else
                  class="btn btn-primary"
                  @click="submitAchievement"
                  :disabled="submitting"
                >
                  <template v-if="submitting">
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    &nbsp;Iltimos kuting...
                  </template>
                  <template v-else>
                    {{
                      achForm.editing
                        ? "Saqlash o'zgartirish"
                        : "Yutuqni qo'shish"
                    }}
                  </template>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useNuxtApp, useRouter, useRoute } from "#app";
import useAuth from "@/composables/useAuth";

/* CONFIG */
const XP_PER_LEVEL = 100;
const MAX_LEVEL = 100;
const MAX_TOTAL_XP = XP_PER_LEVEL * MAX_LEVEL;

/* Supabase + auth */
const { $supabase } = useNuxtApp();
const auth = useAuth();

/* router/route for redirects */
const router = useRouter();
const route = useRoute();

/* STATE */
const user = reactive({
  user_id: null,
  fullname: "",
  universityShort: "",
  universityFull: "",
  major: "",
  xp: 0,
  globalRank: null,
  avatar: null,
});

const badges = ref([]);

/* submitting flag to prevent double submits */
const submitting = ref(false);

/* computed */
const levelComputed = computed(() => Math.floor((user.xp || 0) / XP_PER_LEVEL));
const xpProgress = computed(() => (user.xp || 0) % XP_PER_LEVEL);
const progressPercent = computed(() =>
  Math.round((xpProgress.value / XP_PER_LEVEL) * 100)
);
const overallPercent = computed(() =>
  Math.round(((user.xp || 0) / MAX_TOTAL_XP) * 100)
);
const xpToNext = computed(() => Math.max(0, XP_PER_LEVEL - xpProgress.value));
const initials = computed(() =>
  (user.fullname || "")
    .split(" ")
    .map((w) => w[0] || "")
    .slice(0, 2)
    .join("")
    .toUpperCase()
);

/* modals/forms */
const editProfileModalRef = ref(null);
let bsEditModal = null;
const editProfileForm = reactive({
  fullname: "",
  universityShort: "",
  universityFull: "",
  major: "",
  resetXpConfirm: false,
  avatarFile: null,
});

/* Achievement modal data (merged full fields) */
const categories = [
  { key: "international_cert", label: "Xalqaro sertifikat (IELTS, TOEFL...)" },
  { key: "national_cert", label: "Milliy sertifikat" },
  { key: "intl_article", label: "Xalqaro maqola" },
  { key: "rep_article", label: "Respublika maqola" },
  { key: "activity", label: "Ijtimoiy faollik" },
];

const intlCerts = ["IELTS", "TOEFL", "DELF", "TestDaF", "TOPIK", "OTHER"];
const intlLevels = ["C2", "C1", "B2", "B1", "A2", "A1"];
const nationalTypes = [
  "Ingliz tili (CEFR)",
  "Rus tili",
  "O'zbek tili",
  "Matematika",
  "Tarix",
  "Kimyo",
  "Biologiya",
  "OTHER",
];
const nationalLevels = ["A+", "A", "B+", "B", "C+", "C"];

const activities = [
  { key: "hackathon", label: "Hackathon" },
  { key: "museum", label: "Muzey va tarixiy tashrif" },
  { key: "debate", label: "Munozara / Debatlar" },
  { key: "initiative", label: "Besh tashabbus / Olimpiada" },
  { key: "seminar", label: "Seminar" },
  { key: "unicom", label: "Universitet jamoat ishlari" },
];
const activityResults = [
  { key: "winner1", label: "Winner1" },
  { key: "winner2", label: "Winner2" },
  { key: "winner3", label: "Winner3" },
  { key: "participant", label: "Faol ishtirok" },
];

const achForm = reactive({
  editing: false,
  id: null,
  category: null,
  sub: null,
  subCustom: "",
  level: null,
  levelCustom: "",
  title: "",
  note: "",
  proofFile: null,
  proofUrl: null,
  code: "",
  xp: 0,
  meta: {},
});

const step = ref(1);
const achievementModalRef = ref(null);
let bsAchievementModal = null;

/* helpers */
function formatNumber(n) {
  if (n === null || n === undefined) return "0";
  return Number(n).toLocaleString();
}
function formatDate(ts) {
  if (!ts) return "";
  return new Date(ts).toLocaleDateString();
}
function tierLabel(xp) {
  if (!xp) return "—";
  if (xp >= 2000) return "gold";
  if (xp >= 1000) return "silver";
  return "bronze";
}
function tierClass(xp) {
  if (!xp) return "bronze";
  if (xp >= 2000) return "gold";
  if (xp >= 1000) return "silver";
  return "bronze";
}

/* ---------- DB: load profile & badges ---------- */
async function loadProfile(userId) {
  if (!userId) return;
  try {
    const { data, error } = await $supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!error && data) {
      user.user_id = data.user_id ?? data.userId ?? userId;
      user.fullname = data.fullname ?? data.full_name ?? "";
      user.universityShort =
        data.university_short ?? data.universityShort ?? "";
      user.universityFull = data.university_full ?? data.universityFull ?? "";
      user.major = data.major ?? "";
      user.xp = data.xp ?? data.total_xp ?? 0;
      user.globalRank = data.global_rank ?? data.globalRank ?? null;
      user.avatar = data.avatar_url ?? data.avatarUrl ?? data.avatar ?? null;
    } else {
      // fallback: auth metadata
      const res = await $supabase.auth.getUser();
      const u = res?.data?.user;
      if (u) {
        user.user_id = user.user_id || u.id;
        user.fullname = user.fullname || u.user_metadata?.full_name || "";
        user.avatar = user.avatar || u.user_metadata?.avatar_url || null;
      }
    }
  } catch (e) {
    console.error("loadProfile exception:", e);
  }
}

async function loadBadges(userId) {
  if (!userId) return;
  try {
    const { data, error } = await $supabase
      .from("badges")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data)) {
      badges.value = data.map((b) => ({
        ...b,
        metaLine:
          (b.meta &&
            typeof b.meta === "object" &&
            (b.meta.label || b.meta.title)) ||
          "",
      }));
    } else {
      badges.value = [];
      if (error) console.warn("loadBadges error:", error);
    }
  } catch (e) {
    console.error("loadBadges exception:", e);
    badges.value = [];
  }
}

/* ---------- profile edit ---------- */
function openEditProfile() {
  editProfileForm.fullname = user.fullname || "";
  editProfileForm.universityShort = user.universityShort || "";
  editProfileForm.universityFull = user.universityFull || "";
  editProfileForm.major = user.major || "";
  editProfileForm.resetXpConfirm = false;
  if (bsEditModal) bsEditModal.show();
}
function onAvatarSelected(e) {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  editProfileForm.avatarFile = f;
  const reader = new FileReader();
  reader.onload = () => {
    user.avatar = reader.result;
  };
  reader.readAsDataURL(f);
}
function removeAvatar() {
  if (!confirm("Profil rasmini o'chirishni tasdiqlaysizmi?")) return;
  user.avatar = null;
}

/* robust upsert helper (keeps behavior if schema different) */
async function tryUpsertWithFallback(payload) {
  try {
    const { data, error } = await $supabase
      .from("profiles")
      .upsert(payload, { onConflict: ["user_id"] })
      .select()
      .single();
    return { data, error };
  } catch (e) {
    return { data: null, error: e };
  }
}

async function saveProfile() {
  if (!editProfileForm.fullname || !editProfileForm.fullname.trim()) {
    alert("To'liq ism kiriting");
    return;
  }

  let uid = auth?.user?.value?.id;
  if (!uid) {
    try {
      const res = await $supabase.auth.getUser();
      uid = res?.data?.user?.id;
      if (!uid) {
        alert("Foydalanuvchi tizimga kirmagan");
        return;
      }
    } catch (e) {
      console.error("Could not get auth user:", e);
      alert("Foydalanuvchi topilmadi");
      return;
    }
  }

  const newXp = editProfileForm.resetXpConfirm ? 0 : user.xp || 0;
  const avatar_url = user.avatar || null;

  const payload = {
    user_id: uid,
    fullname: editProfileForm.fullname || null,
    university_short: editProfileForm.universityShort || null,
    university_full: editProfileForm.universityFull || null,
    major: editProfileForm.major || null,
    avatar_url,
    xp: newXp,
  };

  try {
    const { data, error } = await $supabase
      .from("profiles")
      .upsert(payload, { onConflict: "user_id" })
      .select()
      .single();

    if (error) {
      console.error("Profile upsert error", error);
      alert("Profilni saqlashda xato: " + (error.message || error));
      return;
    }

    await loadProfile(uid);
    if (bsEditModal) bsEditModal.hide();
  } catch (e) {
    console.error("saveProfile exception:", e);
    alert("Profilni saqlashda xato");
  }
}

/* ---------- Achievements modal logic (merged) ---------- */
function openAddAchievement() {
  resetAchForm();
  step.value = 1;
  achForm.editing = false;
  if (bsAchievementModal) bsAchievementModal.show();
}
function editAchievement(a) {
  achForm.editing = true;
  achForm.id = a.id;
  achForm.category = a.category || null;
  achForm.sub = a.meta?.sub || a.sub || null;
  achForm.subCustom = a.meta?.subCustom || a.subCustom || "";
  achForm.level = a.meta?.level || a.level || null;
  achForm.levelCustom = a.meta?.levelCustom || a.levelCustom || "";
  achForm.title = a.title || "";
  achForm.note = a.note || "";
  achForm.proofUrl = a.proof_url || null;
  achForm.code = a.code || "";
  achForm.xp = a.xp_count || 0;
  step.value = 2;
  if (bsAchievementModal) bsAchievementModal.show();
}
function resetAchForm() {
  achForm.editing = false;
  achForm.id = null;
  achForm.category = null;
  achForm.sub = null;
  achForm.subCustom = "";
  achForm.level = null;
  achForm.levelCustom = "";
  achForm.title = "";
  achForm.note = "";
  achForm.proofFile = null;
  achForm.proofUrl = null;
  achForm.code = "";
  achForm.xp = 0;
  achForm.meta = {};
  step.value = 1;
}
function selectCategory(k) {
  achForm.category = k;
  achForm.sub = null;
  achForm.subCustom = "";
  achForm.level = null;
  achForm.levelCustom = "";
}
function nextStep() {
  if (step.value === 1) {
    if (!achForm.category) {
      alert("Kategoriya tanlang");
      return;
    }
    step.value = 2;
    return;
  }
  if (step.value === 2) {
    if (!achForm.title && !achForm.sub && !achForm.subCustom && !achForm.code) {
      alert("Kamida bir nom yoki sub-kategoriya kiriting.");
      return;
    }
    step.value = 3;
  }
}
function prevStep() {
  if (step.value > 1) step.value--;
}
function onProofSelected(e) {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  achForm.proofFile = f;
  try {
    achForm.proofUrl = URL.createObjectURL(f);
  } catch {
    achForm.proofUrl = null;
  }
}

/* XP mapping (same logic as old code) */
function computeXpFromForm(form) {
  if (!form || !form.category) return 0;
  if (form.category === "international_cert") {
    const level = (form.levelCustom || form.level || "")
      .toString()
      .toUpperCase();
    const map = { C2: 3000, C1: 2500, B2: 2000, B1: 1500, A2: 1000, A1: 500 };
    return map[level] || 0;
  }
  if (form.category === "national_cert") {
    const lvl = (form.levelCustom || form.level || "").toString().toUpperCase();
    const map = { "A+": 2000, A: 1700, "B+": 1400, B: 1100, "C+": 800, C: 500 };
    return map[lvl] || 0;
  }
  if (form.category === "intl_article") return 500;
  if (form.category === "rep_article") return 180;
  if (form.category === "activity") {
    const type = form.sub || form.subCustom;
    const res = form.level || form.levelCustom;
    const resMap = {
      winner1: 1000,
      winner2: 700,
      winner3: 400,
      participant: 100,
    };

    if (type === "hackathon") return resMap[res] || 100;
    if (type === "museum") return 100;
    if (type === "debate") {
      if (res === "winner1") return 1300;
      if (res === "winner2") return 1000;
      if (res === "winner3") return 700;
      return 100;
    }
    if (type === "initiative") {
      if (res === "winner1") return 1000;
      if (res === "winner2") return 700;
      if (res === "winner3") return 500;
      return 200;
    }
    if (type === "seminar") return 100;
    if (type === "unicom") return 100;
    return resMap[res] || 100;
  }
  return 0;
}
const previewXp = computed(() => {
  const manual = achForm.xp || 0;
  const computed = computeXpFromForm(achForm);
  return manual || computed;
});

function uid() {
  return "a_" + Math.random().toString(36).slice(2, 9);
}

/* ---------- NEW: sync helpers ---------- */
async function updateProfileXp(uid) {
  if (!uid) return;
  try {
    const { data: rows, error: rowsErr } = await $supabase
      .from("badges")
      .select("xp_count")
      .eq("user_id", uid);

    if (rowsErr) {
      console.error("updateProfileXp rowsErr:", rowsErr);
      return;
    }
    const total = Array.isArray(rows)
      ? rows.reduce((acc, r) => acc + Number(r.xp_count || 0), 0)
      : 0;

    const { error: upErr } = await $supabase
      .from("profiles")
      .update({ xp: total })
      .eq("user_id", uid);

    if (upErr) {
      console.error("updateProfileXp update error:", upErr);
      return;
    }
    await loadProfile(uid);
  } catch (e) {
    console.error("updateProfileXp exception:", e);
  }
}

async function recalcGlobalRanks() {
  try {
    const { data: allProfiles, error } = await $supabase
      .from("profiles")
      .select("user_id, xp")
      .order("xp", { ascending: false });

    if (error) {
      console.error("recalcGlobalRanks: select error", error);
      return;
    }
    if (!Array.isArray(allProfiles)) return;

    for (let i = 0; i < allProfiles.length; i++) {
      const u = allProfiles[i];
      const rank = i + 1;
      try {
        await $supabase
          .from("profiles")
          .update({ global_rank: rank })
          .eq("user_id", u.user_id);
      } catch (e) {
        console.error("recalcGlobalRanks update error for", u.user_id, e);
      }
    }

    const uid = auth?.user?.value?.id;
    if (uid) await loadProfile(uid);
  } catch (e) {
    console.error("recalcGlobalRanks exception:", e);
  }
}

/* ---------- UPDATED: submitAchievement (double-submit himoya bilan) ---------- */
async function submitAchievement() {
  if (submitting.value) return;
  submitting.value = true;

  const uid = auth?.user?.value?.id;
  if (!uid) {
    alert("Foydalanuvchi topilmadi");
    submitting.value = false;
    return;
  }

  const chosenSub = achForm.subCustom || achForm.sub || "";
  const chosenLevel = achForm.levelCustom || achForm.level || "";
  const xpAuto = computeXpFromForm(achForm);
  const xpToSave = achForm.xp || xpAuto || 0;
  const payload = {
    user_id: uid,
    code: achForm.code || `auto_${Date.now()}`,
    title:
      achForm.title || (chosenSub ? `${chosenSub} ${chosenLevel}` : "Yutuq"),
    xp_count: xpToSave,
    meta: {
      sub: achForm.sub || null,
      subCustom: achForm.subCustom || null,
      level: achForm.level || null,
      levelCustom: achForm.levelCustom || null,
      category: achForm.category || null,
      note: achForm.note || null,
    },
    proof_url: achForm.proofUrl || null,
    category: achForm.category || null,
  };

  try {
    if (achForm.editing && achForm.id) {
      const { data, error } = await $supabase
        .from("badges")
        .update(payload)
        .eq("id", achForm.id)
        .select()
        .single();
      if (error) {
        console.error("Update badge error", error);
        alert("Yutuqni tahrirlashda xato");
        submitting.value = false;
        return;
      }
      await loadBadges(uid);
      await updateProfileXp(uid);
      await recalcGlobalRanks();
    } else {
      const { data, error } = await $supabase
        .from("badges")
        .insert([payload])
        .select()
        .single();
      if (error) {
        console.error("Insert badge error", error);
        alert("Yutuq qo'shishda xato");
        submitting.value = false;
        return;
      }
      await loadBadges(uid);
      await updateProfileXp(uid);
      await recalcGlobalRanks();
    }
    if (bsAchievementModal) bsAchievementModal.hide();
    resetAchForm();
  } catch (e) {
    console.error("submitAchievement exception:", e);
    alert("Yutuq qo'shishda xato");
  } finally {
    submitting.value = false;
  }
}

async function deleteAchievement(id) {
  if (!confirm("Yutuqni o'chirishni tasdiqlaysizmi?")) return;
  try {
    const { error } = await $supabase.from("badges").delete().eq("id", id);
    if (error) {
      console.error("Delete badge error", error);
      alert("O'chirishda xato");
      return;
    }
    const uid = auth?.user?.value?.id;
    await loadBadges(uid);
    await updateProfileXp(uid);
    await recalcGlobalRanks();
  } catch (e) {
    console.error("deleteAchievement exception:", e);
    alert("O'chirishda xato");
  }
}

/* ---------- AUTH GUARD: redirect to /signin if not authenticated ---------- */
function ensureAuthOrRedirect() {
  const uid = auth?.user?.value?.id;
  const path = route.path || "";
  const allowedUnauthPaths = ["/signin", "/signup", "/forgot", "/auth"];
  if (!uid && !allowedUnauthPaths.includes(path)) {
    router.replace("/signin").catch(() => {});
  }
}

/* lifecycle */
onMounted(async () => {
  if (typeof window === "undefined") return;
  const { Modal } = await import("bootstrap");
  if (editProfileModalRef.value)
    bsEditModal = new Modal(editProfileModalRef.value);
  if (achievementModalRef.value)
    bsAchievementModal = new Modal(achievementModalRef.value, {
      backdrop: "static",
    });

  ensureAuthOrRedirect();

  watch(
    () => auth.user?.value?.id,
    async (id) => {
      if (!id) {
        ensureAuthOrRedirect();
        user.user_id = null;
        user.fullname = "";
        user.universityShort = "";
        user.universityFull = "";
        user.major = "";
        user.xp = 0;
        user.avatar = null;
        badges.value = [];
      } else {
        await loadProfile(id);
        await loadBadges(id);
      }
    },
    { immediate: true }
  );

  const uid = auth?.user?.value?.id;
  if (uid) {
    await loadProfile(uid);
    await loadBadges(uid);
  }
});
</script>

<style scoped>
.profile-page {
}

/* Avatar circles */
.ava-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 800;
  color: #0b1220;
  background: radial-gradient(
    120% 120% at 80% 20%,
    #bfe1ff 0%,
    #73b4ff 60%,
    #2d76ff 100%
  );
}
.ava-circle.sm {
  width: 52px;
  height: 52px;
  font-size: 18px;
}
.ava-circle.xl {
  width: 96px;
  height: 96px;
  font-size: 28px;
}

/* avatars */
.mini-avatar,
.profilavatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.mini-avatar {
  width: 52px;
  height: 52px;
}
.profilavatar {
  width: 96px;
  height: 96px;
  border: 4px solid #fff;
  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.12);
}

/* initials fallback */
.initials {
  font-weight: 800;
  color: #0b1220;
}

/* preview avatar in modal */
.preview-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 10px auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}

/* Progress bars */
.prog-fat {
  height: 12px;
  background: #eef1f6;
  border-radius: 999px;
}
.prog-thin {
  height: 8px;
  background: #eef1f6;
  border-radius: 999px;
}
.prog-fat .progress-bar,
.prog-thin .progress-bar {
  border-radius: 999px;
}

/* Badge cards */
.badge-card {
  border: 1px solid var(--line, #edf2f7);
  border-radius: 12px;
  background: #fff;
  padding: 18px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.04);
  min-height: 220px;
  position: relative;
}
.badge-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 22px;
  background: #f5f7fb;
}

.pill {
  text-transform: capitalize;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  display: inline-block;
}
.gold {
  background: #fff7cc;
  color: #8a6d00;
}
.silver {
  background: #eef2f7;
  color: #4b5563;
}
.bronze {
  background: #ffe7d2;
  color: #8b4513;
}

/* XP badge on card */
.xp-badge {
  position: absolute;
  right: 10px;
  top: 10px;
  background: #f7f1d6;
  color: #a56b00;
  padding: 6px 8px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 12px;
}

/* Modal dark theme */
.dark-modal {
  background: linear-gradient(
    180deg,
    rgba(16, 24, 40, 0.92),
    rgba(11, 64, 67, 0.92)
  );
  color: #e9f0f6;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 20px 50px rgba(2, 6, 23, 0.6);
  backdrop-filter: blur(6px) saturate(120%);
}
.dark-modal .modal-header .btn-close {
  filter: invert(1) brightness(2);
}
.dark-modal .btn {
  color: #ffffff;
}
.dark-modal .form-control {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.dark-modal .form-label {
  color: #dbeafe;
}
.dark-modal .modal-footer .btn-light {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}
.dark-modal .btn-primary {
  background: #0d6efd;
  border-color: #0d6efd;
}

input::placeholder {
  color: #fff;
}
textarea::placeholder {
  color: #fff;
}
/* small helpers */
.top-3 {
  top: 12px;
}
.end-3 {
  right: 12px;
}

/* responsive tweaks */
@media (max-width: 992px) {
  .ava-circle.xl {
    width: 84px;
    height: 84px;
    font-size: 26px;
  }
  .badge-card {
    min-height: 160px;
  }
}
</style>
