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
    title: "Rasmiy CV olish",
    desc: "Talaba ma'lumotnomasi, akademik ma'lumot",
    badge: "Mavjud",
    icon: "bi bi-file-earmark-text",
    cta: "So'rov yuborish",
    color: "c-green",
  },
  {
    id: 2,
    title: "To'lov-shartnoma",
    desc: "O‘quv to‘lovi, yotoqxona to‘lovi",
    badge: "Mavjud",
    icon: "bi bi-credit-card",
    cta: "Ma`lumot olish",
    color: "c-mint",
  },
  {
    id: 3,
    title: "O`qishni ko`chirish",
    desc: "Kitob buyurtma qilish, davr uzaytirish",
    badge: "Mavjud",
    icon: "bi bi-journal-bookmark",
    cta: "Ma'lumot olish",
    color: "c-olive",
  },
  {
    id: 4,
    title: "Dekan bilan bog`lanish",
    desc: "O‘qituvchi yoki dekan bilan uchrashuvni rejalashtirish",
    badge: "Mavjud",
    icon: "bi bi-people",
    cta: "Uchrashuvni belgilash",
    color: "c-teal",
  },
  {
    id: 5,
    title: "Hemisga kirish",
    desc: "Login va parol muammolari",
    badge: "Mavjud",
    icon: "bi bi-wrench-adjustable",
    cta: "Ariza topshirish",
    color: "c-lime",
  },
  {
    id: 6,
    title: "Yordam markazi",
    desc: "Texnik yordam, savol-javob",
    badge: "24/7",
    icon: "bi bi-question-circle",
    cta: "Yordam so‘rash",
    color: "c-blue",
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







qaragin, bu service pagini kodi, va biz bu pageni ham real qilishimiz kerak ya`ni bizni porojectka moslashtirishimiz kerak.
Ya`ni rasmda ko`rib turganindek 6 turdagi service xizmatlarimiz mavjuda va har biri alohida vazifani bajaradi. Birinchisidan boshlemiz, Rasmiy Resume olish, bu juda ham ajoyib va creative xizmatlarimizdan biri bunda nima bo`ladi? Biz ya`ni saytimiz foydalanuvchi kiritgan ma`lumotlaridan foydalangan holda Rasmiy Resume tuzib beradi ya`ni hozirgi kunda soxta resumelar ko`payganligi tifayli bizni saytni ishonchliligini hisobga olib resumeni foydalanuvchi joylagan sertifikatlari, yutuqlarini hisobga olgan holda tayyorlab ularning shaxsiy chatiga pdf formatda yuborishimiz kerak. Va bu resumeni dizayinini manu 2-rasmdagi resumedaqa qilishimiz kerak. BU birinchi xizmat edi.


Ikkinchisi to`lov shartnoma tog`risida ma`lumot olish xizmati bunga bo`lsa faqat ma`lumotlar kiritiladi xolos va bu ma`lumot "To‘lov-shartnoma (kontrakt) asosida o‘qish tartibi: 
O‘zbekistondagi oliy ta’lim muassasalarida o‘qish davlat granti yoki to‘lov-shartnoma asosida amalga oshiriladi. To‘lov-shartnoma asosida o‘qiyotgan talabalar belgilangan miqdordagi kontrakt to‘lovini har semestr yoki yil boshida amalga oshiradilar. Kontrakt miqdori har yili Oliy ta’lim vazirligi tomonidan belgilanadi va ta’lim yo‘nalishi, oliygoh toifasi (davlat yoki nodavlat), hamda o‘qish shakliga (kunduzgi, sirtqi, kechki) qarab farq qiladi. Talaba kontrakt summasini to‘lashni to‘liq yoki bo‘lib-bo‘lib amalga oshirishi mumkin. Ba’zi hollarda, kam ta’minlangan oilalar, iqtidorli talabalar yoki yetimlar uchun to‘lovni kamaytirish yoki kechiktirish imkoniyatlari mavjud. Shuningdek, hozirda ko‘plab banklar ta’lim krediti orqali kontraktni to‘lab berish xizmatini ham taklif qilmoqda." shundan iborat.


Uchinchi xizmat bo`lsa O`qishni ko`chirish bo`ycha ma`lumot olish xizmati bunda ham to`lov shartnoma kabi bir xil dizaynda bo`ladi va bunda faqat ma`lumotlar " O‘zbekistondagi bir universitetdan boshqasiga o‘qishni ko‘chirish tartibi: 
O‘zbekiston Respublikasi Oliy ta’lim, fan va innovatsiyalar vazirligi belgilagan tartibga ko‘ra, talaba o‘zining o‘qishini bir universitetdan boshqasiga, shuningdek, bir yo‘nalishdan boshqasiga o‘tkazishi mumkin. Buning uchun avvalo talaba o‘qishni ko‘chirmoqchi bo‘lgan oliygohga ariza bilan murojaat qiladi. Arizaga akademik ma’lumotnoma, reyting daftarchasi yoki transcript nusxasi, shuningdek, pasport nusxasi ilova qilinadi. Universitet rahbariyati hujjatlarni ko‘rib chiqib, o‘qishni davom ettirish uchun fanlar farqini belgilaydi. Agar fanlar farqi katta bo‘lmasa, talaba test yoki suhbat asosida o‘qishga qabul qilinadi. Bu jarayon asosan har yili yozgi ta’til vaqtida, ya’ni iyul–avgust oylarida amalga oshiriladi." bunga o`zgaradi.



To`rtinchi xizmatimiz bo`lsa Dekan bilan bog`lanish, bunda biz dekan bilan bog`lanish buttonini bosishimiz bilan oyna ochiladi va unda dekan va o`qituvchilar ro`yxati bo`ladi va undan foydalanuvchi keraklisini topadi va u bilan bog`lanish uchun o`qituvchi yoki dekanni chatiga so`rov jo`natadi, va dekan yoki o`qituvchi uchrashuv uchun o`zini qulay vaqtini belgilab talabaga javob yuboradi. Bu xizmat shu tarzda ishledi. (Dekan va o`qituvchilar ham saytdan ro`yxatdan o`tishadi va damin tomonidan ular bu ro`yxatga qo`shib qo`yladi.)




Beshinchi xizmatga keladigan bo`lsak bu hemis uchun login va parolni olish bo`yicha bo`ladi bu qande ishledi? Qachonki talaba bu xizmatdan foydalanmoqchi bo`lsa unga oyna ochiladi va oynada qisqa ko`rsatma "Hemis kirish uchun login va parolni olishga passport rasmini qoldiring!" bo`ladi va passport rasmini yuklash uchun input bo`ladi va talaba o`z pasportini rasmini yuklaydi va pastdagi yuborish tugamsi bosilganda adminning telegram lichkasiga rasm yuboriladi va adminning telegram lichkasida talabaning email manzili, pasport rasmi va  bu hemis uchun login parol xizmati bo`lganiligi tufayli unda "hemis uchun login parol lozim" yozuvi bilan birga yuboriladi admin bo`lsa uni ko`rgandan so`ng aniqlab qayta javob yozib qoldiradi.



Oltinchi xizmat bo`lsa Yordam markazi. Bu xizmatning ishlashi oddiy ya`ni oyna ochilganda unda ko`rsatma bo`ladi "Saytning ishlashida qanday yordam kerak bo`lsa yozib qoldiring" degan va tepada bitta input muammoni yozish uchun va bitta button muammoni yuborish uchun, button bosilgandan so`ng esa bu muammo matn ko`rinishda adminning telegram manziliga yuboriladi.




qani san shu barcha narsalarni hisobga olgan holda kodni qaytdan yaxshilab mukammal qilib yozib, to`liq xolda manga yuborgin.