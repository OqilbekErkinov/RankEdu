<template>
  <section class="messenger">
    <div class="row g-3">
      <!-- LEFT: dialogs -->
      <div class="col-lg-4 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="p-3 border-bottom">
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0"
                ><i class="bi bi-search"></i
              ></span>
              <input
                v-model="qidiruv"
                type="text"
                class="form-control border-start-0"
                placeholder="Qidirish..."
              />
            </div>
          </div>

          <div class="list-group list-group-flush conv-list">
            <button
              v-for="c in filteredConvs"
              :key="c.id"
              class="list-group-item list-group-item-action d-flex align-items-center justify-content-between gap-2"
              :class="{ active: c.id === selectedId }"
              @click="selectConv(c.id)"
            >
              <div class="d-flex align-items-center gap-3">
                <div class="avatar-sm position-relative">
                  <div class="ava">{{ initials(c.name) }}</div>
                  <span v-if="c.online" class="online-dot"></span>
                </div>
                <div>
                  <div class="fw-semibold">{{ c.name }}</div>
                  <div
                    class="small text-muted text-truncate"
                    style="max-width: 180px"
                  >
                    {{ c.lastMessage }}
                  </div>
                </div>
              </div>

              <div class="text-end">
                <div class="small text-muted">{{ c.time }}</div>
                <span
                  v-if="c.unread > 0"
                  class="badge rounded-pill bg-success"
                  >{{ c.unread }}</span
                >
              </div>
            </button>
          </div>

          <div class="mt-auto px-3 py-2 small text-muted border-top">
            <div class="d-flex flex-wrap gap-3">
              <a href="#" class="link-secondary text-decoration-none"
                >Biz haqimizda</a
              >
              <a href="#" class="link-secondary text-decoration-none">Aloqa</a>
              <a href="#" class="link-secondary text-decoration-none"
                >Maxfiylik siyosati</a
              >
              <a href="#" class="link-secondary text-decoration-none"
                >Fikr yuborish</a
              >
            </div>
          </div>
        </div>
      </div>

      <!-- CENTER: chat -->
      <div class="col-lg-8 col-xl-9">
        <div class="card border-0 shadow-sm chat-card">
          <!-- Header -->
          <div
            class="chat-header d-flex align-items-center justify-content-between p-3 border-bottom"
          >
            <div class="d-flex align-items-center gap-3">
              <div class="ava lg">{{ initials(current.name) }}</div>
              <div>
                <div class="fw-semibold">{{ current.name }}</div>
                <div
                  class="small"
                  :class="current.online ? 'text-success' : 'text-muted'"
                >
                  {{ current.online ? "Onlayn" : "Oflayn" }}
                </div>
              </div>
            </div>

            <div class="d-flex align-items-center gap-2">
              <button class="icon-btn" title="Qidiruv">
                <i class="bi bi-search"></i>
              </button>
              <button class="icon-btn" title="Sozlamalar">
                <i class="bi bi-three-dots-vertical"></i>
              </button>
            </div>
          </div>

          <!-- Messages -->
          <div class="chat-body" ref="chatBody">
            <div
              v-for="(m, idx) in current.messages"
              :key="idx"
              class="msg-row"
              :class="m.from === 'me' ? 'me' : 'them'"
            >
              <div class="bubble">
                <div class="bubble-text">{{ m.text }}</div>
                <div class="time small text-muted mt-1">{{ m.time }}</div>
              </div>
            </div>

            <div v-if="typing" class="msg-row them">
              <div class="bubble typing">
                <span class="dot"></span><span class="dot"></span
                ><span class="dot"></span>
              </div>
            </div>
          </div>

          <!-- Input -->
          <div
            class="chat-input d-flex align-items-center gap-2 p-3 border-top"
          >
            <input
              v-model="draft"
              @keyup.enter="send"
              type="text"
              class="form-control"
              placeholder="Xabar yozish..."
            />
            <button
              class="btn btn-success px-3"
              @click="send"
              :disabled="draft.trim().length === 0"
            >
              <i class="bi bi-send-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({ layout: "default" });

import { computed, nextTick, onMounted, ref, watch } from "vue";

const nowTime = () => {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const conversations = ref([
  {
    id: 1,
    name: "Ozodbek",
    online: true,
    lastMessage: "Vazifani yuborish muddati yakunlandi",
    time: "10:30",
    unread: 2,
    messages: [
      {
        from: "them",
        text: "Salom! Web dasturlash bo‘yicha vazifani qachon topshirasiz?",
        time: "10:25",
      },
      {
        from: "me",
        text: "Assalomu alaykum! Bugun kechqurun topshiraman.",
        time: "10:27",
      },
      {
        from: "them",
        text: "Yaxshi. Agar savollar bo‘lsa, so‘rang.",
        time: "10:28",
      },
      {
        from: "them",
        text: "Vazifani yuborish muddati yakunlandi",
        time: "10:30",
      },
    ],
  },
  {
    id: 2,
    name: "Hamza Ilhom",
    online: false,
    lastMessage: "Men ham kelaman",
    time: "09:15",
    unread: 5,
    messages: [
      { from: "them", text: "Bugun 16:00 da uchrashuv", time: "09:10" },
      { from: "them", text: "Men ham kelaman", time: "09:15" },
    ],
  },
  {
    id: 3,
    name: "❈Зийнатбегим_Абдусаломова❈",
    online: false,
    lastMessage: "Rahmat, tushunarli",
    time: "Kecha",
    unread: 0,
    messages: [
      { from: "me", text: "Havolani jo‘natdim", time: "Kecha" },
      { from: "them", text: "Rahmat, tushunarli", time: "Kecha" },
    ],
  },
  {
    id: 4,
    name: "Rayxona Akmalovna",
    online: false,
    lastMessage: "Bugun uchrashuv bo‘ladi",
    time: "Kecha",
    unread: 0,
    messages: [
      { from: "them", text: "Bugun uchrashuv bo‘ladi", time: "Kecha" },
    ],
  },
]);

const qidiruv = ref("");
const selectedId = ref(conversations.value[0].id);
const draft = ref("");
const typing = ref(false);
const chatBody = ref(null);

const filteredConvs = computed(() => {
  const q = qidiruv.value.trim().toLowerCase();
  const arr = conversations.value;
  return q ? arr.filter((c) => c.name.toLowerCase().includes(q)) : arr;
});

const current = computed(
  () =>
    conversations.value.find((c) => c.id === selectedId.value) ||
    conversations.value[0]
);

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function selectConv(id) {
  selectedId.value = id;
  const c = conversations.value.find((x) => x.id === id);
  if (c) c.unread = 0;
  nextTick(scrollToBottom);
}

function send() {
  const text = draft.value.trim();
  if (!text) return;
  current.value.messages.push({ from: "me", text, time: nowTime() });
  draft.value = "";
  current.value.lastMessage = text;
  current.value.time = "Hozir";
  nextTick(scrollToBottom);

  // Demo typing javobi
  typing.value = true;
  setTimeout(() => {
    current.value.messages.push({
      from: "them",
      text: "Qabul qilindi ✅",
      time: nowTime(),
    });
    current.value.lastMessage = "Qabul qilindi ✅";
    current.value.time = "Hozir";
    typing.value = false;
    nextTick(scrollToBottom);
  }, 900);
}

function scrollToBottom() {
  const el = chatBody.value;
  if (!el) return;
  el.scrollTop = el.scrollHeight;
}

onMounted(scrollToBottom);
watch(selectedId, () => nextTick(scrollToBottom));
</script>

<style scoped>
.messenger {
}

.conv-list {
  max-height: 58vh;
  overflow: auto;
}
.chat-card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: calc(100% - 0px);
  min-height: 68vh;
  overflow: hidden;
}
.chat-header .ava.lg {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 800;
  background: #eef3fb;
  color: #0b1220;
}

/* Avatars */
.ava {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 800;
  background: #eef3fb;
  color: #0b1220;
}
.avatar-sm {
  width: 36px;
  height: 36px;
}
.online-dot {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid #fff;
}

/* Messages */
.chat-body {
  padding: 16px;
  background: #fafbfe;
  overflow-y: auto;
}
.msg-row {
  display: flex;
  margin-bottom: 10px;
}
.msg-row.me {
  justify-content: flex-end;
}
.msg-row.them {
  justify-content: flex-start;
}

.bubble {
  max-width: 68%;
  border-radius: 14px;
  padding: 10px 12px;
  background: #e9f2ff;
  border: 1px solid var(--line);
}
.msg-row.me .bubble {
  background: #16a34a;
  color: #fff;
  border-color: #16a34a;
}
.bubble .time {
  opacity: 0.8;
}

/* Typing indicator */
.typing {
  display: inline-flex;
  gap: 6px;
  align-items: center;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #94a3b8;
  animation: blink 1s infinite ease-in-out;
}
.dot:nth-child(2) {
  animation-delay: 0.15s;
}
.dot:nth-child(3) {
  animation-delay: 0.3s;
}
@keyframes blink {
  0%,
  80%,
  100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  40% {
    opacity: 1;
    transform: translateY(-2px);
  }
}

/* Input */
.chat-input .form-control {
  border-radius: 12px;
}
.icon-btn {
  border: 1px solid var(--line);
  background: #fff;
  width: 38px;
  height: 38px;
  border-radius: 10px;
}
.icon-btn:hover {
  background: #f5f7fb;
}

/* Active state left list */
.list-group-item.active {
  background: #eef6ff;
  color: inherit;
}
</style>
