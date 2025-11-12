<template>
  <section class="messenger">
    <div class="row g-3">
      <!-- LEFT: users / conversations -->
      <div class="col-lg-4 col-xl-3 p-0 ">
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
/*
  Messenger.vue
  - Supabase bilan real vaqtda xabar almashish
  - users: profiles jadvalidan foydalanuvchilarni yuklaydi (o'zingizni tashlab)
  - messages: messages jadvalidan yüklaydi va realtime obuna bo'ladi
  - unreadMap: har bir user uchun o'qilmagan xabarlar soni
  - Navbar uchun global event: 'messages:unread' (detail: totalUnread)
*/

import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useNuxtApp } from "#app";
import useAuth from "@/composables/useAuth";
import { useRouter } from "vue-router";

const { $supabase } = useNuxtApp();
const auth = useAuth();
const router = useRouter();

const q = ref("");
const users = ref([]); // list of other users (profiles)
const loadingSearch = ref(false);
const selectedUser = ref(null);
const messages = ref([]);
const meId = ref(null);
const draft = ref("");
const sending = ref(false);
const typing = ref(false);
const chatBody = ref(null);

// map { user_id: count }
const unreadMap = ref({});

// total unread for navbar
const totalUnread = computed(() =>
  Object.values(unreadMap.value).reduce((s, v) => s + (v || 0), 0)
);

// helper funcs
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
function formatLastMsgTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// focus search input (UI helper)
function focusSearch() {
  const el = document.querySelector(".input-group input");
  if (el) el.focus();
}

// ensure authenticated — if not redirect to signin
async function ensureAuth() {
  let uid = auth?.user?.value?.id;
  if (!uid) {
    try {
      const res = await $supabase.auth.getUser();
      uid = res?.data?.user?.id;
    } catch {}
  }
  if (!uid) {
    // redirect to signin page
    router.push("/signin");
    return false;
  }
  meId.value = uid;
  return true;
}

// search users in profiles (exclude current user)
async function searchUsers() {
  if (!(await ensureAuth())) return;
  loadingSearch.value = true;
  try {
    let query = $supabase
      .from("profiles")
      .select("user_id, email, fullname, avatar_url, updated_at, created_at")
      .neq("user_id", meId.value)
      .limit(50);

    if (q.value && q.value.trim()) {
      const term = q.value.trim();
      // try searching by email or fullname
      query = query.ilike("email", `%${term}%`).or(`fullname.ilike.%${term}%`);
      // supabase JS does not chain .or after .ilike like that; fallback to rpc-style:
      // but for safety we'll use two queries: email then fullname
    }

    // Simpler robust approach: fetch some records and filter client-side (small scale)
    const { data, error } = await $supabase
      .from("profiles")
      .select("user_id, email, fullname, avatar_url, updated_at, created_at")
      .neq("user_id", meId.value)
      .limit(200);

    if (!error && Array.isArray(data)) {
      const term = q.value.trim().toLowerCase();
      let arr = data;
      if (term) {
        arr = data.filter(
          (it) =>
            (it.email && it.email.toLowerCase().includes(term)) ||
            (it.fullname && it.fullname.toLowerCase().includes(term))
        );
      }
      // load last_message_at and unread counts per user via messages table aggregation
      await loadLastMetaForUsers(arr);
    } else {
      users.value = [];
    }
  } catch (e) {
    console.error("searchUsers exception", e);
    users.value = [];
  } finally {
    loadingSearch.value = false;
  }
}

// load last_message_at and unread counts for each user (small scale)
async function loadLastMetaForUsers(arrProfiles) {
  const ids = arrProfiles.map((p) => p.user_id);
  users.value = arrProfiles.map((p) => ({ ...p, last_message_at: null }));
  if (!ids.length) return;

  try {
    // fetch last message between me and each user: get messages where (from->to) or (to->from)
    // we'll fetch messages where from_id in [me, ids] and to_id in [me, ids]
    const { data: msgs } = await $supabase
      .from("messages")
      .select("id, from_id, to_id, text, created_at, read")
      .in("from_id", [meId.value, ...ids])
      .in("to_id", [meId.value, ...ids])
      .order("created_at", { ascending: false })
      .limit(1000);

    // compute last_message_at and unread per user
    const mapLast = {};
    const mapUnread = {};
    if (Array.isArray(msgs)) {
      msgs.forEach((m) => {
        const peer = m.from_id === meId.value ? m.to_id : m.from_id;
        if (!mapLast[peer]) mapLast[peer] = m.created_at;
        if (m.to_id === meId.value && !m.read) {
          mapUnread[m.from_id] = (mapUnread[m.from_id] || 0) + 1;
        }
      });
    }

    // apply
    users.value = users.value.map((u) => ({
      ...u,
      last_message_at:
        mapLast[u.user_id] || u.updated_at || u.created_at || null,
    }));
    // set unread map entries for peers and keep others
    ids.forEach((id) => {
      unreadMap.value[id] = mapUnread[id] || 0;
    });

    // dispatch global unread total for navbar
    dispatchUnread();
  } catch (e) {
    console.error("loadLastMetaForUsers error", e);
  }
}

// open chat with user: load messages and subscribe realtime for this pair
let messagesSub = null;
async function openChatWith(profile) {
  if (!(await ensureAuth())) return;
  selectedUser.value = profile;
  await loadMessagesWith(profile.user_id);
  // mark unread messages from that user as read
  await markMessagesReadFrom(profile.user_id);
  // subscribe realtime to messages table for conversations involving me and that user
  subscribeMessages(profile.user_id);
  nextTick(scrollToBottom);
}

// load messages between me and peer
async function loadMessagesWith(peerId) {
  try {
    const { data, error } = await $supabase
      .from("messages")
      .select("id, from_id, to_id, text, created_at, read")
      .or(
        `and(from_id.eq.${meId.value},to_id.eq.${peerId}),and(from_id.eq.${peerId},to_id.eq.${meId.value})`
      )
      .order("created_at", { ascending: true })
      .limit(1000);

    if (!error && Array.isArray(data)) {
      messages.value = data;
    } else {
      messages.value = [];
    }
  } catch (e) {
    console.error("loadMessagesWith error", e);
    messages.value = [];
  }
}

// subscribe realtime for messages (for the current peer)
function subscribeMessages(peerId) {
  // unsubscribe previous
  if (messagesSub && typeof messagesSub.unsubscribe === "function") {
    try {
      messagesSub.unsubscribe();
    } catch {}
    messagesSub = null;
  }

  // listen for insert events where (from_id = me AND to_id = peer) OR (from_id = peer AND to_id = me)
  messagesSub = $supabase
    .channel("public:messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `to_id=eq.${meId.value},from_id=eq.${peerId}`, // will only capture peer->me? need both
      },
      (payload) => {
        // payload.record contains new message
        const rec = payload.record;
        // if message is from peer to me -> push and mark as unread (or mark read if chat open)
        if (
          (rec.from_id === peerId && rec.to_id === meId.value) ||
          (rec.from_id === meId.value && rec.to_id === peerId)
        ) {
          messages.value.push(rec);
          // if message to me and chat open with peer -> optionally mark read
          if (
            rec.to_id === meId.value &&
            selectedUser.value &&
            selectedUser.value.user_id === peerId
          ) {
            markMessageRead(rec.id);
          } else if (rec.to_id === meId.value) {
            unreadMap.value[rec.from_id] =
              (unreadMap.value[rec.from_id] || 0) + 1;
            dispatchUnread();
          }
          nextTick(scrollToBottom);
        }
      }
    )
    // Also subscribe for other messages to update unread counts globally
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        const r = payload.record;
        if (r.to_id === meId.value) {
          // new incoming message
          // if chat with sender not open, increment unread
          if (
            !(selectedUser.value && selectedUser.value.user_id === r.from_id)
          ) {
            unreadMap.value[r.from_id] = (unreadMap.value[r.from_id] || 0) + 1;
            dispatchUnread();
          }
        }
      }
    )
    .subscribe(async (status) => {
      // status indicates subscription status
      // no-op
    });
}

// mark all messages from peer to me as read
async function markMessagesReadFrom(peerId) {
  try {
    const { error } = await $supabase
      .from("messages")
      .update({ read: true })
      .eq("from_id", peerId)
      .eq("to_id", meId.value)
      .is("read", false);
    if (error) console.warn("markMessagesReadFrom error", error);
    // reset unread counter for peer
    unreadMap.value[peerId] = 0;
    dispatchUnread();
  } catch (e) {
    console.error("markMessagesReadFrom exception", e);
  }
}

// mark single message as read (used for real-time inserted message in current chat)
async function markMessageRead(messageId) {
  try {
    await $supabase.from("messages").update({ read: true }).eq("id", messageId);
  } catch (e) {
    console.error("markMessageRead error", e);
  }
}

// send message (single-click protected)
async function send() {
  if (!selectedUser.value) return;
  if (!draft.value.trim()) return;
  if (sending.value) return; // prevent double-send

  sending.value = true;
  const text = draft.value.trim();
  const payload = {
    from_id: meId.value,
    to_id: selectedUser.value.user_id,
    text,
    created_at: new Date().toISOString(),
    read: false,
  };

  try {
    const { data, error } = await $supabase
      .from("messages")
      .insert([payload])
      .select()
      .single();
    if (error) {
      console.error("insert message error", error);
      // show alert or toast as needed
      return;
    }
    // push to local messages
    if (data) messages.value.push(data);
    // clear draft
    draft.value = "";
    // after sending, ensure receiver's unread handled on their side (they will receive realtime)
    nextTick(scrollToBottom);
  } catch (e) {
    console.error("send exception", e);
  } finally {
    // briefly debounce re-enable to avoid accidental duplicates
    setTimeout(() => (sending.value = false), 600);
  }
}

// open new chat modal / focus input
function openNewChat() {
  focusSearch();
}

// scroll
function scrollToBottom() {
  const el = chatBody.value;
  if (!el) return;
  el.scrollTop = el.scrollHeight + 200;
}

// dispatch unread total to global (for navbar)
function dispatchUnread() {
  const ev = new CustomEvent("messages:unread", { detail: totalUnread.value });
  window.dispatchEvent(ev);
}

// load initial: ensure auth and load users & listen global messages
onMounted(async () => {
  const ok = await ensureAuth();
  if (!ok) return;

  // initial search/load
  await searchUsers();

  // subscribe to messages directed to me to update unread badge and play notification
  const realtime = $supabase
    .channel("public:messages:inbox")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `to_id=eq.${meId.value}`,
      },
      (payload) => {
        const rec = payload.record;
        // incoming message to me
        // if current chat with sender open -> push and mark read
        if (selectedUser.value && selectedUser.value.user_id === rec.from_id) {
          messages.value.push(rec);
          markMessageRead(rec.id);
        } else {
          unreadMap.value[rec.from_id] =
            (unreadMap.value[rec.from_id] || 0) + 1;
          // optionally play sound / show toast
        }
        dispatchUnread();
      }
    )
    .subscribe();

  // also compute initial unread total dispatch
  dispatchUnread();
});

// watch selectedUser change -> load messages and reset unread
watch(selectedUser, async (nv, ov) => {
  if (!nv) return;
  await loadMessagesWith(nv.user_id);
  await markMessagesReadFrom(nv.user_id);
  nextTick(scrollToBottom);
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
