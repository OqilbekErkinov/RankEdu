<template>
  <section class="messenger">
    <div class="row g-3">
      <!-- LEFT: users / conversations -->
      <div class="col-lg-4 col-xl-3 p-0">
        <div class="card border-0 shadow-sm h-100">
          <div class="p-3 border-bottom">
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0"
                ><i class="bi bi-search"></i
              ></span>
              <input
                v-model="q"
                type="text"
                class="form-control border-start-0"
                placeholder="Foydalanuvchi email yoki ism bo'yicha qidirish..."
                @keyup.enter="searchUsers"
              />
              <button
                class="btn btn-outline-secondary"
                @click="searchUsers"
                :disabled="loadingSearch"
              >
                <i class="bi bi-search"></i>
              </button>
            </div>
            <div class="small text-muted mt-2">
              Mavjud foydalanuvchilar: {{ users.length }}
            </div>
          </div>

          <div class="list-group list-group-flush conv-list">
            <button
              v-for="u in users"
              :key="u.user_id"
              class="list-group-item list-group-item-action d-flex align-items-center justify-content-between gap-2"
              :class="{
                active: selectedUser && selectedUser.user_id === u.user_id,
              }"
              @click="openChatWith(u)"
            >
              <div class="d-flex align-items-center gap-3">
                <div class="avatar-sm position-relative">
                  <img
                    v-if="u.avatar_url"
                    :src="u.avatar_url"
                    class="avatar-img"
                  />
                  <div v-else class="ava">
                    {{ initials(u.fullname || u.email) }}
                  </div>
                </div>
                <div class="flex-grow-1">
                  <div class="fw-semibold text-truncate">
                    {{ u.fullname || u.email }}
                  </div>
                  <div class="small text-muted text-truncate">
                    {{ u.email }}
                  </div>
                </div>
              </div>

              <div class="text-end">
                <div class="small text-muted">
                  {{ formatLastMsgTime(u.last_message_at) }}
                </div>
                <span
                  v-if="unreadMap[u.user_id] > 0"
                  class="badge rounded-pill bg-danger"
                >
                  {{ unreadMap[u.user_id] }}
                </span>
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
                >Maxfiylik</a
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
              <div class="ava lg">
                <img
                  v-if="selectedUser?.avatar_url"
                  :src="selectedUser.avatar_url"
                  class="avatar-img-lg"
                />
                <div v-else>
                  {{
                    initials(
                      selectedUser?.fullname || selectedUser?.email || "---"
                    )
                  }}
                </div>
              </div>
              <div>
                <div class="fw-semibold">
                  {{
                    selectedUser?.fullname ||
                    selectedUser?.email ||
                    "Foydalanuvchi tanlanmadi"
                  }}
                </div>
                <div class="small text-muted">
                  {{
                    selectedUser
                      ? selectedUser.online
                        ? "Onlayn"
                        : "Oflayn"
                      : ""
                  }}
                </div>
              </div>
            </div>

            <div class="d-flex align-items-center gap-2">
              <button class="icon-btn" title="Qidiruv" @click="focusSearch">
                <i class="bi bi-search"></i>
              </button>
              <button class="icon-btn" title="Yangi chat" @click="openNewChat">
                <i class="bi bi-plus-lg"></i>
              </button>
            </div>
          </div>

          <!-- Messages -->
          <div class="chat-body" ref="chatBody">
            <div v-if="!selectedUser" class="p-4 text-muted">
              Chapdan foydalanuvchini tanlab suhbat boshlang.
            </div>

            <template v-else>
              <div
                v-for="m in messages"
                :key="m.id"
                class="msg-row"
                :class="m.from_id === meId ? 'me' : 'them'"
              >
                <div class="bubble">
                  <div class="bubble-text">{{ m.text }}</div>
                  <div class="time small text-muted mt-1">
                    {{ formatTime(m.created_at) }}
                  </div>
                </div>
              </div>

              <div v-if="typing" class="msg-row them">
                <div class="bubble typing">
                  <span class="dot"></span><span class="dot"></span
                  ><span class="dot"></span>
                </div>
              </div>
            </template>
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
              :disabled="!selectedUser || sending"
            />
            <button
              class="btn btn-success px-3"
              @click="send"
              :disabled="!selectedUser || draft.trim().length === 0 || sending"
            >
              <i v-if="!sending" class="bi bi-send-fill"></i>
              <span
                v-else
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  watch,
  nextTick,
  onBeforeUnmount,
} from "vue";
import { useRouter } from "vue-router";
import useAuth from "@/composables/useAuth";

/*
  Messenger (Django REST edition)
  - useAuth().api — axios instance
  - Fetches /profiles/ and /messages/ from Django REST API
  - Polling-based "realtime" (every 3s). You can adjust interval.
  - Assumes /messages/ returns messages involving current user (MessageViewSet.get_queryset does that).
*/

const auth = useAuth();
const router = useRouter();

const POLL_MS = 3000;

const q = ref("");
const users = ref([]); // profiles (other users)
const loadingSearch = ref(false);
const selectedUser = ref(null);
const messages = ref([]);
const meId = ref(null);
const draft = ref("");
const sending = ref(false);
const chatBody = ref(null);
const unreadMap = ref({}); // { user_id: count }
const pollingHandle = ref(null);

// total unread
const totalUnread = computed(() =>
  Object.values(unreadMap.value).reduce((s, v) => s + (v || 0), 0)
);

// helpers
function initials(text = "") {
  if (!text) return "--";
  return text
    .split(" ")
    .map((w) => w[0] || "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
function formatTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function focusSearch() {
  const el = document.querySelector(".input-group input");
  if (el) el.focus();
}

async function ensureAuth() {
  let uid = auth?.user?.value?.id;
  if (!uid) {
    // try to read from auth composable (init might have set it)
    await auth.init?.();
    uid = auth?.user?.value?.id;
  }
  if (!uid) {
    router.push("/signin");
    return false;
  }
  meId.value = uid;
  return true;
}

/* ---------- USERS (profiles) ---------- */
async function searchUsers() {
  if (!(await ensureAuth())) return;
  loadingSearch.value = true;
  try {
    // fetch all profiles and filter client-side (small scale)
    const resp = await auth.api.get(`/profiles/`);
    if (resp.status === 200) {
      let data = Array.isArray(resp.data) ? resp.data : resp.data.results ?? [];
      // exclude current user
      data = data.filter((p) => (p.user?.id ?? p.user_id) !== meId.value);
      const term = (q.value || "").trim().toLowerCase();
      if (term) {
        data = data.filter(
          (it) =>
            (it.email && it.email.toLowerCase().includes(term)) ||
            (it.full_name && it.full_name.toLowerCase().includes(term)) ||
            (it.fullname && it.fullname.toLowerCase().includes(term))
        );
      }
      // normalize fields
      users.value = data.map((p) => ({
        user_id: p.user?.id ?? p.user_id,
        email: p.email ?? "",
        fullname: p.full_name ?? p.fullname ?? "",
        avatar: p.avatar_url ?? p.avatar ?? null,
        last_message_at: null,
      }));
      // load message meta (unread + last message) for these users
      await computeMetaForUsers();
    } else {
      users.value = [];
    }
  } catch (e) {
    console.error("searchUsers error", e);
    users.value = [];
  } finally {
    loadingSearch.value = false;
  }
}

async function computeMetaForUsers() {
  // fetch all messages for current user then compute per-peer data
  try {
    const resp = await auth.api.get(`/messages/`); // returns messages involving me
    if (resp.status !== 200) return;
    const all = Array.isArray(resp.data) ? resp.data : resp.data.results ?? [];
    // reset maps
    const lastMap = {};
    const unread = {};
    all.forEach((m) => {
      const fromId = m.from_user?.id ?? m.from_id;
      const toId = m.to_user?.id ?? m.to_id;
      const peer = fromId === meId.value ? toId : fromId;
      // last message time per peer (take newest)
      const t = m.created_at || m.createdAt || m.createdAt || m.created;
      if (!lastMap[peer] || new Date(t) > new Date(lastMap[peer])) {
        lastMap[peer] = t;
      }
      // unread counting: messages TO me and read false
      if (toId === meId.value && !m.read) {
        unread[fromId] = (unread[fromId] || 0) + 1;
      }
    });

    // apply to users list
    users.value = users.value.map((u) => ({
      ...u,
      last_message_at: lastMap[u.user_id] || u.last_message_at || null,
    }));
    // set unread map
    unreadMap.value = { ...(unreadMap.value || {}), ...unread };
    dispatchUnread();
  } catch (e) {
    console.error("computeMetaForUsers error", e);
  }
}

/* ---------- MESSAGES ---------- */
async function loadMessagesWith(peerId) {
  try {
    // fetch all messages involving current user, then filter client-side for this peer
    const resp = await auth.api.get(`/messages/`);
    if (resp.status === 200) {
      const all = Array.isArray(resp.data)
        ? resp.data
        : resp.data.results ?? [];
      messages.value = all
        .filter((m) => {
          const fromId = m.from_user?.id ?? m.from_id;
          const toId = m.to_user?.id ?? m.to_id;
          return (
            (fromId === meId.value && toId === peerId) ||
            (fromId === peerId && toId === meId.value)
          );
        })
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else {
      messages.value = [];
    }
  } catch (e) {
    console.error("loadMessagesWith error", e);
    messages.value = [];
  }
}

async function openChatWith(profile) {
  if (!(await ensureAuth())) return;
  selectedUser.value = profile;
  await loadMessagesWith(profile.user_id);
  await markMessagesReadFrom(profile.user_id);
  // scroll
  nextTick(scrollToBottom);
}

async function markMessagesReadFrom(peerId) {
  try {
    // find local message ids that are unread and from peer
    const toPatch = messages.value
      .filter((m) => {
        const fromId = m.from_user?.id ?? m.from_id;
        const toId = m.to_user?.id ?? m.to_id;
        return fromId === peerId && toId === meId.value && !m.read;
      })
      .map((m) => m.id);

    // PATCH each message read=true (backend should allow)
    await Promise.all(
      toPatch.map((id) =>
        auth.api.patch(`/messages/${id}/`, { read: true }).catch((e) => {
          console.warn(
            "mark single message read failed",
            id,
            e?.response?.data ?? e.message
          );
        })
      )
    );

    // reset unread counter
    unreadMap.value[peerId] = 0;
    dispatchUnread();
  } catch (e) {
    console.error("markMessagesReadFrom error", e);
  }
}

async function send() {
  if (!selectedUser.value) return;
  if (!draft.value.trim()) return;
  if (sending.value) return;
  sending.value = true;
  const text = draft.value.trim();
  const payload = {
    from_user: auth.user?.value?.id ?? meId.value,
    to_user: selectedUser.value.user_id,
    text,
  };
  try {
    const resp = await auth.api.post(`/messages/`, payload);
    if (resp.status === 201 || resp.status === 200) {
      // add returned item or optimistic push
      const item = resp.data || {
        ...payload,
        created_at: new Date().toISOString(),
        id: Date.now(),
      };
      messages.value.push(item);
      draft.value = "";
      // ensure other metadata updated
      await computeMetaForUsers();
      nextTick(scrollToBottom);
    } else {
      console.error("send unexpected response", resp);
    }
  } catch (e) {
    console.error("send error", e);
    alert(
      "Xabar yuborilmadi: " +
        (e?.response?.data ? JSON.stringify(e.response.data) : e.message || e)
    );
  } finally {
    setTimeout(() => (sending.value = false), 400);
  }
}

/* Polling: refresh messages & users metadata */
async function pollTick() {
  try {
    // refresh messages list (global) and recompute unread counts/meta
    const resp = await auth.api.get(`/messages/`);
    if (resp.status === 200) {
      const all = Array.isArray(resp.data)
        ? resp.data
        : resp.data.results ?? [];
      // update unreadMap
      const unread = {};
      all.forEach((m) => {
        const fromId = m.from_user?.id ?? m.from_id;
        const toId = m.to_user?.id ?? m.to_id;
        if (toId === meId.value && !m.read) {
          unread[fromId] = (unread[fromId] || 0) + 1;
        }
      });
      unreadMap.value = { ...(unreadMap.value || {}), ...unread };
      // if a chat open, update messages for that peer
      if (selectedUser.value) {
        const peerId = selectedUser.value.user_id;
        messages.value = all
          .filter((m) => {
            const fromId = m.from_user?.id ?? m.from_id;
            const toId = m.to_user?.id ?? m.to_id;
            return (
              (fromId === meId.value && toId === peerId) ||
              (fromId === peerId && toId === meId.value)
            );
          })
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      }
      // recompute user meta
      await computeMetaForUsers();
      dispatchUnread();
    }
  } catch (e) {
    console.warn("pollTick error", e);
  }
}

function startPolling() {
  stopPolling();
  pollingHandle.value = setInterval(pollTick, POLL_MS);
}
function stopPolling() {
  if (pollingHandle.value) {
    clearInterval(pollingHandle.value);
    pollingHandle.value = null;
  }
}

function scrollToBottom() {
  const el = chatBody.value;
  if (!el) return;
  el.scrollTop = el.scrollHeight + 100;
}

function dispatchUnread() {
  const ev = new CustomEvent("messages:unread", { detail: totalUnread.value });
  window.dispatchEvent(ev);
}

/* lifecycle */
onMounted(async () => {
  const ok = await ensureAuth();
  if (!ok) return;
  await searchUsers();
  // initial messages load via pollTick
  await pollTick();
  startPolling();
});

onBeforeUnmount(() => {
  stopPolling();
});
</script>

<style scoped>
.messenger {
}

/* left list */
.conv-list {
  max-height: 62vh;
  overflow: auto;
}
.avatar-sm {
  width: 36px;
  height: 36px;
  position: relative;
  display: inline-grid;
  place-items: center;
  border-radius: 50%;
  overflow: hidden;
}
.avatar-img {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
}
.avatar-img-lg {
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 50%;
}

/* chat layout */
.chat-card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 68vh;
  height: calc(100% - 0px);
  overflow: hidden;
}
.chat-header .ava.lg {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #eef3fb;
  color: #0b1220;
}
.ava {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #eef3fb;
  color: #0b1220;
}

/* messages */
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
  opacity: 0.85;
  font-size: 12px;
}

/* typing */
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

/* input */
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

/* badges */
.list-group-item.active {
  background: #eef6ff;
  color: inherit;
}
</style>
