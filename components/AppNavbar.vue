<template>
  <nav class="navbar navbar-expand bg-white shadow-sm sticky-top">
    <div class="container-fluid px-3">
      <!-- Left: burger + breadcrumb -->
      <div class="d-flex align-items-center gap-2">
        <button
          class="btn btn-outline-secondary d-flex align-items-center justify-content-center"
          type="button"
          aria-label="Sidebar"
          @click="$emit('toggle-sidebar')"
        >
          <i class="bi bi-list fs-5"></i>
        </button>

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <NuxtLink to="/" class="text-decoration-none fw-semibold brand"
                >RankEdu</NuxtLink
              >
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ routeName }}
            </li>
          </ol>
        </nav>
      </div>

      <!-- Right: icons + profile -->
      <div class="d-flex align-items-center gap-2">
        <button class="icon-btn" aria-label="Qidiruv" title="Qidiruv">
          <i class="bi bi-search"></i>
        </button>

        <button
          class="icon-btn"
          aria-label="Bildirishnomalar"
          title="Bildirishnomalar"
        >
          <i class="bi bi-bell"></i>
        </button>

        <!-- Message button with badge -->
        <button
          class="icon-btn position-relative"
          aria-label="Xabarlar"
          title="Xabarlar"
          @click="openMessenger"
        >
          <i class="bi bi-chat-dots"></i>
          <span v-if="messageCount > 0" class="badge-notif rounded-pill">{{
            messageCount
          }}</span>
        </button>

        <!-- NavProfile component -->
        <NavProfile />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavProfile from "./NavProfile.vue";
import { useNuxtApp } from "#app";
import useAuth from "@/composables/useAuth";

const route = useRoute();
const router = useRouter();
const routeName = computed(() => {
  const seg = route.path.split("/").filter(Boolean)[0] || "";
  if (seg === "profile") return "Profil";
  if (!seg) return "Asosiy sahifa";
  return seg.charAt(0).toUpperCase() + seg.slice(1);
});

const { $supabase } = useNuxtApp();
const auth = useAuth();

const meId = ref(null);
const messageCount = ref(0);
let subscription = null;

// load initial unread count (messages.to_id = meId and read = false)
async function loadUnreadCount(uid) {
  if (!uid) {
    messageCount.value = 0;
    return;
  }
  try {
    const { data, error, count } = await $supabase
      .from("messages")
      .select("id", { count: "exact", head: false })
      .eq("to_id", uid)
      .eq("read", false);

    if (error) {
      console.warn("loadUnreadCount error", error);
      messageCount.value = 0;
      return;
    }
    messageCount.value = Array.isArray(data) ? data.length : 0;
  } catch (e) {
    console.error("loadUnreadCount exception", e);
    messageCount.value = 0;
  }
}

function openMessenger() {
  router.push({ path: "/messenger" });
  // Optional: tila: ochilganda unreadlarni ochilganlar deb belgilashni messenger sahifasida amalga oshiring
}

// realtime subscribe: listen for INSERT on messages and increment if to_id === me
function subscribeRealtime(uid) {
  if (!uid) return;
  if (subscription) {
    $supabase.removeChannel(subscription);
    subscription = null;
  }

  // Supabase JS v2 channel API
  subscription = $supabase
    .channel("public:messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        const newMsg = payload?.new;
        if (!newMsg) return;
        if (newMsg.to_id === uid) {
          messageCount.value = (messageCount.value || 0) + 1;
        }
      }
    )
    .subscribe((status) => {
      // optionally log status
      if (status === "SUBSCRIBED") {
        // console.log("Navbar realtime subscribed");
      }
    });
}

function unsubscribeRealtime() {
  if (subscription) {
    $supabase.removeChannel(subscription);
    subscription = null;
  }
}

onMounted(() => {
  // watch auth user id
  watch(
    () => auth.user?.value?.id,
    async (v) => {
      if (v) {
        meId.value = v;
        await loadUnreadCount(v);
        subscribeRealtime(v);
      } else {
        meId.value = null;
        messageCount.value = 0;
        unsubscribeRealtime();
      }
    },
    { immediate: true }
  );
});

onBeforeUnmount(() => {
  unsubscribeRealtime();
});
</script>

<style scoped>
.brand {
  color: var(--primary);
}

.icon-btn {
  border: 1px solid var(--line);
  background: #fff;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.icon-btn:hover {
  background: var(--bg);
}

/* small badge styles for messages */
.badge-notif {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #e11d48; /* red */
  color: #fff;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 999px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
</style>
