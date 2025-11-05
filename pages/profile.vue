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
              <span>{{ formatNumber(user.totalXp) }} XP</span>
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
              <span
                >{{ formatNumber(xpToNext) }} XP to Level
                {{ levelComputed + 1 }}</span
              >
            </div>
          </div>

          <div class="mt-3 d-grid">
            <button class="btn btn-outline-danger" @click="clearProfile">
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
                    {{ formatNumber(user.totalXp) }} XP
                  </div>
                  <div class="small text-muted">Total Experience</div>
                </div>
                <div>
                  <div class="fw-semibold fs-5 text-warning">
                    #{{ user.globalRank }}
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
              <span
                >{{ formatNumber(user.totalXp) }} /
                {{ formatNumber(MAX_TOTAL_XP) }}</span
              >
            </div>
          </div>
        </div>

        <!-- Achievements header -->
        <div
          class="d-flex align-items-center justify-content-between mt-4 mb-2"
        >
          <h5 class="mb-0">
            Badges & Achievements ({{ achievements.length }})
          </h5>
          <div>

            <button class="btn btn-primary" @click="openAddAchievement">
              Yutuq qo'shish
            </button>
          </div>
        </div>

        <!-- Achievements list -->
        <div class="card border-0 shadow-sm p-3">
          <div class="row g-3">
            <div v-if="achievements.length === 0" class="col-12">
              <div class="text-muted">Hozircha yutuq topilmadi.</div>
            </div>

            <div
              v-for="a in achievements"
              :key="a.id"
              class="col-6 col-md-4 col-lg-3"
            >
              <div class="badge-card h-100 position-relative">
                <div class="badge-icon small">{{ a.icon || "🏅" }}</div>
                <div class="fw-semibold text-center mt-2">{{ a.title }}</div>
                <div class="small text-center text-muted mt-1">
                  {{ a.metaLine }}
                </div>
                <div class="text-center mt-2">
                  <span class="pill" :class="a.tierClass">{{
                    a.tierLabel
                  }}</span>
                </div>
                <div class="small text-muted text-center mt-1">
                  {{ formatDate(a.date) }}
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

                <div v-if="a.proofUrl" class="mt-2 text-center">
                  <a :href="a.proofUrl" target="_blank" class="small"
                    >Isbotni ko'rish</a
                  >
                </div>

                <div
                  class="xp-badge position-absolute"
                  title="this achievement XP"
                >
                  +{{ formatNumber(a.xp) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- placeholder -->
        <div class="mt-4">
          <div class="card border-0 shadow-sm p-4">
            <div class="text-muted">
              Keyingi bo‘limlar bu yerda paydo bo‘ladi.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal (dark themed like stipend modal) -->
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

            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="editProfileForm.resetXpConfirm"
                id="resetXp"
              />
              <label class="form-check-label" for="resetXp"
                >Agar belgilanadigan bo'lsa, XP va level ni 0 qilib
                qo'yish</label
              >
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
                <small class="text-light"
                  >Qayta tanlash uchun kategoriya ustiga qayta bossangiz
                  yetadi.</small
                >
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
                <button
                  v-else
                  class="btn btn-primary"
                  @click="submitAchievement"
                >
                  {{
                    achForm.editing
                      ? "Saqlash o'zgartirish"
                      : "Yutuqni qo'shish"
                  }}
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
import { reactive, ref, computed, onMounted, watch } from "vue";

/* --------------- STORAGE KEYS --------------- */
const STORAGE_USER = "rankedu_user_v2";
const STORAGE_ACH = "rankedu_achievements_v2";

/* --------------- DEFAULTS --------------- */
const defaultUser = {
  fullname: "Erkinov Oqilbek Alisher o`g`li",
  universityShort: "TIFT",
  universityFull:
    "Toshkent xalqaro moliyaviy boshqaruv va texnalogiyalar universtiteti",
  major: "Menejment",
  totalXp: 0,
  globalRank: 12,
  avatar: null, // base64 string
};

/* --------------- UTIL: localStorage load/save --------------- */
function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_USER);
    return raw ? JSON.parse(raw) : defaultUser;
  } catch {
    return defaultUser;
  }
}
function saveUser(u) {
  try {
    localStorage.setItem(STORAGE_USER, JSON.stringify(u));
  } catch {}
}
const loadAchievements = () => {
  try {
    const raw = localStorage.getItem(STORAGE_ACH);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

/* --------------- REACTIVE STATE --------------- */
const user = reactive(loadUser());
const achievements = ref(loadAchievements());

watch(user, (v) => saveUser(v), { deep: true });
watch(
  achievements,
  (v) => localStorage.setItem(STORAGE_ACH, JSON.stringify(v)),
  { deep: true }
);

/* --------------- XP / LEVEL RULES --------------- */
const XP_PER_LEVEL = 100; // 100 XP = 1 level
const MAX_LEVEL = 100;
const MAX_TOTAL_XP = XP_PER_LEVEL * MAX_LEVEL; // 10000
const MAX_TOTAL_XP_CONST = MAX_TOTAL_XP;
const MAX_TOTAL_XP_LABEL = formatNumber(MAX_TOTAL_XP);

/* expose to template */
// const MAX_TOTAL_XP = MAX_TOTAL_XP_CONST; 

/* computed */
const levelComputed = computed(() =>
  Math.floor((user.totalXp || 0) / XP_PER_LEVEL)
);
const xpProgress = computed(() => (user.totalXp || 0) % XP_PER_LEVEL);
const progressPercent = computed(() =>
  Math.round((xpProgress.value / XP_PER_LEVEL) * 100)
);
const overallPercent = computed(() =>
  Math.round(((user.totalXp || 0) / MAX_TOTAL_XP) * 100)
);
const xpToNext = computed(() => Math.max(0, XP_PER_LEVEL - xpProgress.value));

/* initials */
const initials = computed(() =>
  (user.fullname || "")
    .split(" ")
    .map((w) => w[0] || "")
    .slice(0, 2)
    .join("")
    .toUpperCase()
);

/* helpers */
function formatNumber(n) {
  if (n === null || n === undefined) return "0";
  if (typeof n === "number" && Number.isFinite(n)) return n.toLocaleString();
  const parsed = Number(n);
  if (!Number.isNaN(parsed)) return parsed.toLocaleString();
  return String(n);
}
function formatDate(ts) {
  if (!ts) return "";
  return new Date(ts).toLocaleDateString();
}

/* --------------- EDIT PROFILE modal --------------- */
const editProfileModalRef = ref(null);
let bsEditModal = null;
const editProfileForm = reactive({
  fullname: user.fullname,
  universityShort: user.universityShort,
  universityFull: user.universityFull,
  major: user.major,
  resetXpConfirm: false,
});

/* open/save/remove avatar */
function openEditProfile() {
  editProfileForm.fullname = user.fullname;
  editProfileForm.universityShort = user.universityShort;
  editProfileForm.universityFull = user.universityFull;
  editProfileForm.major = user.major;
  editProfileForm.resetXpConfirm = false;
  if (bsEditModal) bsEditModal.show();
}
function saveProfile() {
  if (!editProfileForm.fullname.trim()) {
    alert("To'liq ism kiriting");
    return;
  }
  user.fullname = editProfileForm.fullname.trim();
  user.universityShort = editProfileForm.universityShort.trim();
  user.universityFull = editProfileForm.universityFull.trim();
  user.major = editProfileForm.major.trim();
  if (editProfileForm.resetXpConfirm) {
    user.totalXp = 0;
  }
  if (bsEditModal) bsEditModal.hide();
  saveUser(user);
}

function onAvatarSelected(e) {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  const reader = new FileReader();
  reader.onload = () => {
    user.avatar = reader.result;
    saveUser(user);
  };
  reader.readAsDataURL(f);
}
function removeAvatar() {
  if (!confirm("Profil rasmini o'chirishni tasdiqlaysizmi?")) return;
  user.avatar = null;
  saveUser(user);
}
function clearProfile() {
  // only avatar clear action
  if (!user.avatar) {
    alert("Rasm yo'q");
    return;
  }
  removeAvatar();
}

/* --------------- ACHIEVEMENTS modal & logic --------------- */
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
});

const step = ref(1);
const achievementModalRef = ref(null);
let bsAchievementModal = null;

function openAddAchievement() {
  resetAchForm();
  step.value = 1;
  achForm.editing = false;
  if (bsAchievementModal) bsAchievementModal.show();
}
function editAchievement(a) {
  achForm.editing = true;
  achForm.id = a.id;
  achForm.category = a.category;
  achForm.sub = a.sub;
  achForm.subCustom = a.subCustom || "";
  achForm.level = a.level;
  achForm.levelCustom = a.levelCustom || "";
  achForm.title = a.title;
  achForm.note = a.note || "";
  achForm.proofUrl = a.proofUrl || null;
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
}
function selectCategory(key) {
  achForm.category = key;
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
    if (!achForm.title && !achForm.sub && !achForm.subCustom) {
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

/* --------------- XP MAPPING (original large numbers) --------------- */
function computeXpFromForm(form) {
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
    }; // adapted to large scale in examples

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

const previewXp = computed(() => computeXpFromForm(achForm));

function uid() {
  return "a_" + Math.random().toString(36).slice(2, 9);
}

function submitAchievement() {
  if (!achForm.category) {
    alert("Kategoriya tanlanmagan");
    return;
  }
  const xp = computeXpFromForm(achForm);
  const subName = achForm.subCustom || achForm.sub || "";
  const levelName = achForm.levelCustom || achForm.level || "";
  const metaLine = [subName, levelName].filter(Boolean).join(" • ");

  if (achForm.editing) {
    const idx = achievements.value.findIndex((x) => x.id === achForm.id);
    if (idx !== -1) {
      const oldXp = achievements.value[idx].xp || 0;
      achievements.value[idx] = {
        ...achievements.value[idx],
        category: achForm.category,
        sub: achForm.sub,
        subCustom: achForm.subCustom,
        level: achForm.level,
        levelCustom: achForm.levelCustom,
        title: achForm.title || (subName ? `${subName} ${levelName}` : "Yutuq"),
        metaLine,
        note: achForm.note,
        proofUrl: achForm.proofUrl,
        xp,
        date: Date.now(),
      };
      // adjust totalXp delta
      user.totalXp = Math.max(0, (user.totalXp || 0) - (oldXp || 0) + xp);
    }
  } else {
    const newAch = {
      id: uid(),
      category: achForm.category,
      sub: achForm.sub,
      subCustom: achForm.subCustom,
      level: achForm.level,
      levelCustom: achForm.levelCustom,
      title: achForm.title || (subName ? `${subName} ${levelName}` : "Yutuq"),
      metaLine,
      note: achForm.note,
      proofUrl: achForm.proofUrl,
      xp,
      date: Date.now(),
      icon: "🏅",
      tierLabel: achForm.levelCustom || achForm.level || (xp ? `+${xp}` : "—"),
      tierClass: xp >= 2000 ? "gold" : xp >= 1000 ? "silver" : "bronze",
    };
    achievements.value.unshift(newAch);

    // add xp to user.totalXp (va level automatik hisoblanadi)
    user.totalXp = (user.totalXp || 0) + xp;
    // clamp to reasonable max so progress bar works
    if (user.totalXp > MAX_TOTAL_XP) {
      // allow > MAX_TOTAL_XP, but for display clamp? we keep value but overallPercent uses MAX_TOTAL_XP denominator
    }
  }

  if (bsAchievementModal) bsAchievementModal.hide();
  resetAchForm();
}

/* delete achievement */
function deleteAchievement(id) {
  if (!confirm("Yutuqni o'chirishni tasdiqlaysizmi?")) return;
  const idx = achievements.value.findIndex((x) => x.id === id);
  if (idx !== -1) {
    const xp = achievements.value[idx].xp || 0;
    achievements.value.splice(idx, 1);
    user.totalXp = Math.max(0, (user.totalXp || 0) - xp);
  }
}

/* export */
function exportAchievements() {
  const data = JSON.stringify(achievements.value, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "achievements.json";
  a.click();
  URL.revokeObjectURL(url);
}

/* ----------------- INIT BOOTSTRAP MODALS & DARK THEME ----------------- */
onMounted(async () => {
  if (typeof window === "undefined") return;
  const { Modal } = await import("bootstrap");

  if (editProfileModalRef.value) {
    bsEditModal = new Modal(editProfileModalRef.value);
    // ensure dark-modal class present on modal-content (we set in template already),
    // add event listeners for backdrop blur if needed
  }
  if (achievementModalRef.value) {
    bsAchievementModal = new Modal(achievementModalRef.value, {
      backdrop: "static",
    });
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

/* Modal dark theme (stpendiya-like) */
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
