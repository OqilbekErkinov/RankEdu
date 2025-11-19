<template>
  <section class="service-page container-fluid py-3">
    <!-- HEADER -->
    <div class="card border-0 shadow-sm p-4 mb-4">
      <h4 class="mb-1">Servis-markazi</h4>
      <div class="text-muted">Talabalar uchun barcha xizmatlar bir joyda</div>
    </div>

    <!-- SEARCH + FILTER -->
    <div class="d-flex flex-wrap gap-2 align-items-center mb-3">
      <div class="input-group" style="max-width: 360px">
        <span class="input-group-text bg-white border-end-0">
          <i class="bi bi-search"></i>
        </span>
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

    <!-- SERVICES GRID -->
    <div class="row g-3 g-lg-4">
      <div v-for="s in shown" :key="s.id" class="col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-3 position-relative">
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
                  @click="openService(s)"
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

    <!-- SERVICE MODAL -->
    <div
      class="modal fade"
      id="serviceModal"
      tabindex="-1"
      aria-hidden="true"
      ref="modalEl"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modal.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" />
          </div>

          <div class="modal-body">
            <!-- RESUME -->
            <template v-if="modal.type === 'resume'">
              <p class="text-muted">
                Sayt siz kiritgan maʼlumotlar va tizimdagi profildan olgan
                ma'lumotlar asosida rasmiy PDF resume tayyorlaydi va chat orqali
                yuboradi.
              </p>

              <form @submit.prevent="handleGenerateResume">
                <div class="row g-2">
                  <div class="col-md-6 mb-2">
                    <label class="form-label small">To'liq ism</label>
                    <input
                      v-model="resume.fullname"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="col-md-6 mb-2">
                    <label class="form-label small"
                      >Email (qabul qiluvchi)</label
                    >
                    <input
                      v-model="resume.email"
                      type="email"
                      class="form-control"
                      required
                    />
                  </div>
                </div>

                <div class="mb-2">
                  <label class="form-label small"
                    >Qisqacha ma'lumot (summary)</label
                  >
                  <textarea
                    v-model="resume.about"
                    class="form-control"
                    rows="3"
                  />
                </div>

                <div class="d-flex gap-2 justify-content-end mt-3">
                  <button
                    class="btn btn-light"
                    type="button"
                    @click="closeModal"
                  >
                    Bekor qilish
                  </button>
                  <button class="btn btn-primary" :disabled="busy">
                    {{
                      busy ? "Ishlanmoqda..." : "Resume tayyorlash va yuborish"
                    }}
                  </button>
                </div>
              </form>
            </template>

            <!-- CONTRACT TEXT -->
            <template v-else-if="modal.type === 'contract'">
              <p class="text-muted">{{ infoTexts.contract }}</p>
            </template>

            <!-- TRANSFER TEXT -->
            <template v-else-if="modal.type === 'transfer'">
              <p class="text-muted">{{ infoTexts.transfer }}</p>
            </template>

            <!-- DEAN / TEACHERS -->
            <template v-else-if="modal.type === 'dean'">
              <p class="text-muted">
                Dekan yoki o‘qituvchini tanlang va so‘rov yuboring:
              </p>
              <ul class="list-group mb-3">
                <li
                  v-for="t in teachers"
                  :key="t.id"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <div class="fw-semibold">{{ t.name }}</div>
                    <div class="small text-muted">{{ t.position || "" }}</div>
                  </div>
                  <button
                    class="btn btn-outline-primary btn-sm"
                    @click="sendMeeting(t)"
                  >
                    So'rov yuborish
                  </button>
                </li>
              </ul>
            </template>

            <!-- HEMIS -->
            <template v-else-if="modal.type === 'hemis'">
              <p class="text-muted">
                Hemis login/parol olish uchun passport rasmini yuklang
                (JPG/PNG).
              </p>
              <input
                type="file"
                class="form-control mb-3"
                @change="onPassportFile"
                accept="image/*"
              />
              <div class="d-flex gap-2 justify-content-end">
                <button class="btn btn-light" @click="closeModal">Bekor</button>
                <button
                  class="btn btn-primary"
                  :disabled="!passportFile || busy"
                  @click="submitPassport"
                >
                  {{ busy ? "Yuborilmoqda..." : "Yuborish" }}
                </button>
              </div>
            </template>

            <!-- SUPPORT -->
            <template v-else-if="modal.type === 'support'">
              <p class="text-muted">
                Sayt ishlashida qanday yordam kerak bo‘lsa, yozib qoldiring.
              </p>
              <textarea
                v-model="supportText"
                class="form-control mb-3"
                rows="4"
              />
              <div class="d-flex gap-2 justify-content-end">
                <button class="btn btn-light" @click="closeModal">Bekor</button>
                <button
                  class="btn btn-primary"
                  :disabled="!supportText || busy"
                  @click="sendSupport"
                >
                  {{ busy ? "Yuborilmoqda..." : "Yuborish" }}
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- BOTTOM-RIGHT NOTIFICATIONS -->
    <div class="notifications-wrap" aria-live="polite" aria-atomic="true">
      <div
        v-for="(n, i) in notifications"
        :key="n.id"
        class="notification toast show shadow-sm"
        :class="n.type === 'error' ? 'bg-danger text-white' : 'bg-white'"
      >
        <div class="d-flex align-items-start gap-2 p-3">
          <div class="flex-grow-1">
            <div class="fw-semibold">{{ n.title }}</div>
            <div class="small text-muted" v-if="n.subtitle">
              {{ n.subtitle }}
            </div>
            <div class="small" v-if="n.message">{{ n.message }}</div>
          </div>
          <button class="btn btn-sm btn-link" @click="removeNotification(i)">
            ✕
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/*
  service.vue - yangilangan script
  - jsPDF bilan PDF yaratadi
  - Blob -> File qilib Supabase Storage-ga yuklaydi
  - RLS (row level security) xatolarini tutadi va foydalanuvchiga tushunarli ogohlantirish beradi
  - Telegram fallback mavjud (NUXT_PUBLIC_TELEGRAM_* env kerak)
*/

import { ref, computed, onMounted, reactive } from "vue";
import { useNuxtApp, useRuntimeConfig } from "#app";
import useAuth from "@/composables/useAuth";

const { $supabase } = useNuxtApp();
const auth = useAuth();
const config = useRuntimeConfig();
const TELEGRAM_TOKEN = config.public?.NUXT_PUBLIC_TELEGRAM_BOT_TOKEN || null;
const TELEGRAM_ADMIN_ID = config.public?.NUXT_PUBLIC_TELEGRAM_ADMIN_ID || null;

// UI state
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
    title: "Rasmiy Resume olish",
    desc: "Sayt siz kiritgan maʼlumotlar asosida rasmiy Resume PDF shaklida yaratadi",
    badge: "Mavjud",
    icon: "bi bi-file-earmark-text",
    cta: "So‘rov yuborish",
    color: "c-green",
    type: "resume",
  },
  {
    id: 2,
    title: "To‘lov-shartnoma haqida maʼlumot",
    desc: "Kontrakt haqida",
    badge: "Mavjud",
    icon: "bi bi-credit-card",
    cta: "Ko‘rish",
    color: "c-mint",
    type: "contract",
  },
  {
    id: 3,
    title: "O‘qishni ko‘chirish",
    desc: "O‘qishni ko‘chirish",
    badge: "Mavjud",
    icon: "bi bi-journal-bookmark",
    cta: "Ko‘rish",
    color: "c-olive",
    type: "transfer",
  },
  {
    id: 4,
    title: "Dekan bilan bog‘lanish",
    desc: "Uchrashuv so‘rovi yuborish",
    badge: "Mavjud",
    icon: "bi bi-people",
    cta: "Uchrashuv belgilash",
    color: "c-teal",
    type: "dean",
  },
  {
    id: 5,
    title: "Hemis login/parol olish",
    desc: "Pasport rasmni yuborish orqali Hemis login va parol olish",
    badge: "Mavjud",
    icon: "bi bi-key",
    cta: "Ariza yuborish",
    color: "c-lime",
    type: "hemis",
  },
  {
    id: 6,
    title: "Yordam markazi",
    desc: "Texnik yordam",
    badge: "24/7",
    icon: "bi bi-question-circle",
    cta: "Yordam so‘rash",
    color: "c-blue",
    type: "support",
  },
]);

const shown = computed(() => {
  const term = q.value.trim().toLowerCase();
  return services.value.filter((s) => {
    const match =
      !term ||
      s.title.toLowerCase().includes(term) ||
      s.desc.toLowerCase().includes(term);
    const ok =
      activeFilter.value === "all" ||
      (activeFilter.value === "available" && s.badge === "Mavjud") ||
      (activeFilter.value === "247" && s.badge.includes("24"));
    return match && ok;
  });
});

// modal init
const modalEl = ref(null);
const modal = reactive({ title: "", type: "" });
let bsModal = null;
onMounted(async () => {
  try {
    const { Modal } = await import("bootstrap");
    bsModal = new Modal(modalEl.value);
  } catch (e) {
    console.warn("Bootstrap modal init failed:", e);
  }
});

// notifications
const notifications = ref([]);
function pushNotification({
  title,
  subtitle = "",
  message = "",
  type = "info",
  ttl = 6000,
}) {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
  notifications.value.push({ id, title, subtitle, message, type });
  if (ttl > 0)
    setTimeout(() => {
      const i = notifications.value.findIndex((n) => n.id === id);
      if (i !== -1) notifications.value.splice(i, 1);
    }, ttl);
}
function removeNotification(i) {
  notifications.value.splice(i, 1);
}

const busy = ref(false);

// form state
const resume = reactive({ fullname: "", email: "", about: "" });
const passportFile = ref(null);
const supportText = ref("");

// open service modal
function openService(s) {
  modal.title = s.title;
  modal.type = s.type;
  resume.fullname = auth.user?.value?.user_metadata?.full_name || "";
  resume.email = auth.user?.value?.email || "";
  resume.about = "";
  supportText.value = "";
  passportFile.value = null;
  if (bsModal) bsModal.show();
}
function closeModal() {
  if (bsModal) bsModal.hide();
  modal.title = "";
  modal.type = "";
}

// DB helpers
async function fetchProfileByEmail(email) {
  if (!email) return null;
  try {
    const { data, error } = await $supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .single();
    if (error) return null;
    return data;
  } catch (e) {
    console.error("fetchProfileByEmail", e);
    return null;
  }
}

async function insertMessageToUser({
  from_id,
  to_id,
  text,
  attachment_url = null,
}) {
  const payload = {
    from_id,
    to_id,
    text,
    attachment_url,
    created_at: new Date().toISOString(),
    read: false,
  };
  const { data, error } = await $supabase
    .from("messages")
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function findAdminId() {
  try {
    const { data } = await $supabase
      .from("profiles")
      .select("user_id")
      .eq("role", "admin")
      .limit(1)
      .single();
    return data?.user_id || null;
  } catch (e) {
    return null;
  }
}

// Storage helpers
async function getFileUrl(bucket, path) {
  try {
    const maybe = await $supabase.storage.from(bucket).getPublicUrl(path);
    // handle variations of SDK return shape
    const publicUrl =
      maybe?.data?.publicUrl || maybe?.publicURL || maybe?.publicUrl || null;
    if (publicUrl) return publicUrl;
  } catch (e) {
    /* ignore */
  }
  try {
    const { data, error } = await $supabase.storage
      .from(bucket)
      .createSignedUrl(path, 60 * 60);
    if (error) throw error;
    return data?.signedUrl || null;
  } catch (e) {
    console.error("getFileUrl error", e);
    return null;
  }
}

// uploadToBucket — foydalanish oson va xavfsiz
async function uploadToBucket(bucket, path, file, opts = {}) {
  // opts may include contentType, cacheControl, upsert
  const uploadOptions = { ...opts, upsert: opts.upsert ?? true };
  try {
    const { data, error } = await $supabase.storage
      .from(bucket)
      .upload(path, file, uploadOptions);
    if (error) {
      console.error("Supabase storage upload error:", error);
      throw error;
    }
    return data;
  } catch (e) {
    // ruxsat yoki boshqa xatoliklarni callerda ishlatish uchun qaytar
    throw e;
  }
}

// PDF builder (jsPDF)
async function buildPdfBlob(profileObj = {}, input = {}) {
  try {
    const mod = await import("jspdf");
    const { jsPDF } = mod;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 40;
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text(
      input.fullname || profileObj.fullname || "Foydalanuvchi",
      margin,
      80
    );
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const aboutText = input.about || profileObj.about || profileObj.bio || "—";
    doc.text(doc.splitTextToSize(aboutText, 480), margin, 120);
    const xp = Number(profileObj.xp || profileObj.total_xp || 0);
    const level = Math.floor(xp / 100);
    doc.setFontSize(11);
    doc.text(`XP: ${xp.toLocaleString()}   Level: ${level}`, margin, 220);
    const badges = Array.isArray(profileObj.badges)
      ? profileObj.badges
      : profileObj.badges_text
      ? [profileObj.badges_text]
      : [];
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Achievements / Badges", margin, 260);
    doc.setFont("helvetica", "normal");
    if (badges.length) {
      let y = 280;
      badges.slice(0, 12).forEach((b) => {
        doc.text("- " + (b.title || b.name || b), margin + 8, y);
        y += 14;
      });
    } else {
      doc.text("—", margin + 8, 280);
    }
    doc.setFontSize(9);
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, 820);
    return doc.output("blob");
  } catch (e) {
    console.error("buildPdfBlob error", e);
    throw e;
  }
}

// Telegram fallback
async function sendToTelegramFallback(
  email,
  attachment_url = null,
  messageText = ""
) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_ADMIN_ID) return false;
  try {
    const text = `New service message\nEmail: ${email}\n\n${messageText}\n\nAttachment: ${
      attachment_url || "—"
    }`;
    const resp = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_ADMIN_ID, text }),
      }
    );
    const json = await resp.json();
    return json?.ok === true;
  } catch (e) {
    console.error("telegram error", e);
    return false;
  }
}

// main: generate -> upload -> send
async function handleGenerateResume() {
  if (!resume.email) {
    pushNotification({
      title: "Xatolik",
      message: "Email kiriting.",
      type: "error",
    });
    return;
  }
  if (!auth.user?.value?.id) {
    pushNotification({
      title: "Login kerak",
      message: "Tizimga kiring.",
      type: "error",
    });
    return;
  }
  busy.value = true;
  pushNotification({ title: "Jarayon", message: "Resume tayyorlanmoqda..." });
  try {
    const profileObj = (await fetchProfileByEmail(resume.email)) || {
      fullname: resume.fullname,
      email: resume.email,
      about: resume.about,
      xp: 0,
      badges: [],
    };
    // build pdf
    const pdfBlob = await buildPdfBlob(profileObj, resume);
    const safeName = (profileObj.user_id || resume.email)
      .toString()
      .replace(/[^a-z0-9_\-\.]/gi, "_");
    const filePath = `resumes/${safeName}_${Date.now()}.pdf`;
    // upload
    // fayl yuklash
    try {
      await uploadToBucket("resumes", filePath, pdfBlob, {
        contentType: "application/pdf",
        upsert: true,
      });
    } catch (uploadErr) {
      console.error("Upload failed:", uploadErr);
      // agar uploadErr.message ichida "bucket" bo'lsa - bucket yo'q deb xabar bering
      if ((uploadErr?.message || "").toLowerCase().includes("bucket")) {
        pushNotification({
          title: "Storage xato",
          message: 'Bucket "resumes" topilmadi. Dashboard orqali yarating.',
          type: "error",
        });
      } else {
        pushNotification({
          title: "Upload xatolik",
          message: uploadErr.message || "Yuklashda xatolik",
          type: "error",
        });
      }
      throw uploadErr;
    }

    const publicUrl = await getFileUrl("resumes", filePath);
    // try insert into resumes table (optional) - RLS mumkin
    try {
      await $supabase.from("resumes").insert([
        {
          user_id: profileObj.user_id || null,
          filename: filePath.split("/").pop(),
          path: filePath,
          url: publicUrl,
          metadata: { generated_by: auth.user.value?.id },
          status: "ready",
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (e) {
      // RLS kiritish xatosi bo'lsa bu yerga tushadi. Foydalanuvchini ogohlantirib o'tamiz lekin davom etamiz.
      const lower = (e?.message || "").toLowerCase();
      if (lower.includes("row-level") || lower.includes("security")) {
        pushNotification({
          title: "DB Ruxsat muammosi",
          message:
            "Resumeni DBga yozish uchun jadval siyosati ruxsat bermadi. Dashboard->Policies ga policy qo‘shing (quyida SQL misol berilgan).",
          type: "error",
          ttl: 12000,
        });
      } else {
        console.warn("resumes table insert failed:", e);
      }
    }
    // send to user as chat message if user exists
    let toUserId = profileObj.user_id || null;
    if (!toUserId) {
      try {
        const { data: u } = await $supabase
          .from("users")
          .select("id")
          .eq("email", resume.email)
          .single();
        if (u) toUserId = u.id;
      } catch (e) {}
    }
    if (toUserId) {
      try {
        await insertMessageToUser({
          from_id: auth.user.value.id,
          to_id: toUserId,
          text: "Sizga rasmiy resume yuborildi.",
          attachment_url: publicUrl,
        });
        pushNotification({
          title: "Yuborildi",
          message: "Resume chat orqali yuborildi.",
        });
      } catch (e) {
        // messages table RLS mumkin
        const lower = (e?.message || "").toLowerCase();
        if (lower.includes("row-level") || lower.includes("security")) {
          pushNotification({
            title: "Xatolik",
            message:
              "Messages jadvalida RLS siyosati sababli xabar qo‘shib bo‘lmadi. Dashboard->Policies ga policy qo‘shing.",
            type: "error",
            ttl: 12000,
          });
        } else {
          console.error("insertMessageToUser error", e);
          pushNotification({
            title: "Xatolik",
            message: "Xabar yuborishda xatolik.",
            type: "error",
          });
        }
      }
    } else {
      // fallback to telegram
      const sent = await sendToTelegramFallback(
        resume.email,
        publicUrl,
        `Resume for ${resume.fullname || profileObj.fullname}`
      );
      if (sent) {
        pushNotification({
          title: "Yuborildi",
          message: "Resume Telegram orqali yuborildi.",
        });
      } else {
        pushNotification({
          title: "Xatolik",
          message: "Maqsadli foydalanuvchi topilmadi va Telegram sozlanmagan.",
          type: "error",
        });
      }
    }
    closeModal();
  } catch (e) {
    console.error("handleGenerateResume error", e);
    if ((e?.message || "").toLowerCase().includes("bucket")) {
      // explained earlier
    } else {
      pushNotification({
        title: "Xatolik",
        message: e?.message || "Resume yaratishda xatolik yuz berdi.",
        type: "error",
      });
    }
  } finally {
    busy.value = false;
  }

  console.log("auth user:", auth.user?.value);
console.log("will insert message from:", auth.user?.value?.id, "toUser:", toUserId);

}

// Hemis passport
function onPassportFile(e) {
  passportFile.value = e.target.files?.[0] || null;
}
async function submitPassport() {
  if (!passportFile.value) {
    pushNotification({
      title: "Xatolik",
      message: "Passport faylini tanlang.",
      type: "error",
    });
    return;
  }
  if (!auth.user?.value?.id) {
    pushNotification({
      title: "Login kerak",
      message: "Tizimga kiring.",
      type: "error",
    });
    return;
  }
  busy.value = true;
  try {
    const filePath = `passports/${(auth.user.value.id || auth.user.value.email)
      .toString()
      .replace(/[^a-z0-9_\-]/gi, "_")}_${Date.now()}_${
      passportFile.value.name
    }`;
    try {
      await uploadToBucket("passports", filePath, passportFile.value, {
        contentType: passportFile.value.type,
      });
    } catch (uErr) {
      const msg = (uErr?.message || "").toLowerCase();
      if (msg.includes("bucket") || msg.includes("not found")) {
        pushNotification({
          title: "Storage xatolik",
          message:
            'Supabase storage da "passports" bucket topilmadi. Dashboard orqali bucket yarating.',
          type: "error",
          ttl: 10000,
        });
        throw uErr;
      }
      throw uErr;
    }
    const fileUrl = await getFileUrl("passports", filePath);
    const adminId = await findAdminId();
    if (adminId) {
      try {
        await insertMessageToUser({
          from_id: auth.user.value.id,
          to_id: adminId,
          text: `Hemis passport: ${auth.user.value.email}`,
          attachment_url: fileUrl,
        });
        pushNotification({
          title: "Yuborildi",
          message: "Passport admin chatiga yuborildi.",
        });
      } catch (e) {
        pushNotification({
          title: "Ogohlantirish",
          message:
            "Adminga chat orqali yuborib bo‘lmadi (DB RLS). Telegram fallback sinanadi.",
          type: "warning",
        });
        const sent = await sendToTelegramFallback(
          auth.user.value.email,
          fileUrl,
          "Hemis passport"
        );
        if (sent)
          pushNotification({
            title: "Yuborildi",
            message: "Passport Telegram orqali yuborildi.",
          });
      }
    } else {
      const sent = await sendToTelegramFallback(
        auth.user.value.email,
        fileUrl,
        "Hemis passport"
      );
      if (sent)
        pushNotification({
          title: "Yuborildi",
          message: "Passport Telegram orqali yuborildi.",
        });
      else
        pushNotification({
          title: "Ogohlantirish",
          message: "Admin topilmadi va Telegram sozlanmagan.",
          type: "error",
        });
    }
    passportFile.value = null;
    closeModal();
  } catch (e) {
    console.error("submitPassport error", e);
    pushNotification({
      title: "Xatolik",
      message: "Passport yuborishda xatolik.",
      type: "error",
    });
  } finally {
    busy.value = false;
  }
}

// dean support
const teachers = ref([
  { id: 1, name: "Dekan: Karimov Alisher", position: "Dekan", user_id: null },
  {
    id: 2,
    name: "Dotsent: Qodirova Nilufar",
    position: "Dotsent",
    user_id: null,
  },
]);
async function sendMeeting(teacher) {
  if (!auth.user?.value?.id) {
    pushNotification({
      title: "Login kerak",
      message: "Tizimga kiring.",
      type: "error",
    });
    return;
  }
  try {
    if (teacher.user_id) {
      await insertMessageToUser({
        from_id: auth.user.value.id,
        to_id: teacher.user_id,
        text: `Uchrashuv so‘rovi: ${teacher.name}`,
      });
      pushNotification({
        title: "Yuborildi",
        message: `${teacher.name} ga so'rov yuborildi.`,
      });
    } else {
      const adminId = await findAdminId();
      if (adminId) {
        await insertMessageToUser({
          from_id: auth.user.value.id,
          to_id: adminId,
          text: `Uchrashuv so'rovi: ${teacher.name}`,
        });
        pushNotification({
          title: "Yuborildi",
          message: "Administratorga so'rov yuborildi.",
        });
      } else
        pushNotification({
          title: "Ogohlantirish",
          message: "Teacher aloqasi topilmadi.",
          type: "error",
        });
    }
    closeModal();
  } catch (e) {
    console.error("sendMeeting error", e);
    pushNotification({
      title: "Xatolik",
      message: "So'rov yuborishda xatolik.",
      type: "error",
    });
  }
}

async function sendSupport() {
  if (!supportText.value) {
    pushNotification({
      title: "Xatolik",
      message: "Muammoni yozing.",
      type: "error",
    });
    return;
  }
  try {
    const adminId = await findAdminId();
    if (adminId) {
      await insertMessageToUser({
        from_id: auth.user.value.id,
        to_id: adminId,
        text: `Support: ${supportText.value}`,
      });
      pushNotification({
        title: "Yuborildi",
        message: "Support so'rovi adminga yuborildi.",
      });
    } else {
      const sent = await sendToTelegramFallback(
        auth.user.value.email,
        null,
        `Support: ${supportText.value}`
      );
      if (sent)
        pushNotification({
          title: "Yuborildi",
          message: "Support Telegram orqali yuborildi.",
        });
      else
        pushNotification({
          title: "Xatolik",
          message: "Admin topilmadi va Telegram sozlanmagan.",
          type: "error",
        });
    }
    supportText.value = "";
    closeModal();
  } catch (e) {
    console.error("sendSupport error", e);
    pushNotification({
      title: "Xatolik",
      message: "Support yuborishda xatolik.",
      type: "error",
    });
  }
}

const busyRef = busy;
</script>

<style scoped>
/* Basic visual styles preserved from earlier drafts plus notifications */
.filter-btn {
  border: 1px solid var(--line);
  border-radius: 10px;
}
.filter-btn.active {
  background: #e9f2ff;
  color: var(--primary);
  border-color: #cfe3ff;
}
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

/* notifications bottom-right */
.notifications-wrap {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 320px;
}
.notification.toast {
  border-radius: 10px;
  overflow: hidden;
  min-width: 260px;
}
.notification .btn-link {
  color: inherit;
  text-decoration: none;
}
</style>
