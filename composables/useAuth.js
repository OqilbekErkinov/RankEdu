// /composables/useAuth.js
export const useAuth = () => {
  const userState = useState("auth.user", () => null);
  const readyState = useState("auth.ready", () => false);

  const SESSION_COOKIE = "app_session_v1";
  const USERS_KEY = "app_users_v1";

  function loadUsers() {
    if (!process.client) return [];
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
      return [];
    }
  }
  function saveUsers(u) {
    if (!process.client) return;
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(u));
    } catch {}
  }

  function saveSessionCookie(payload) {
    // Nuxt useCookie ishlatamiz; avtomatik SSR-safe
    useCookie(SESSION_COOKIE, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    }).value = payload;
  }
  function clearSessionCookie() {
    useCookie(SESSION_COOKIE).value = null;
  }
  function loadSessionCookie() {
    return useCookie(SESSION_COOKIE).value || null;
  }

  function sanitize(u) {
    if (!u) return null;
    const { passHash, salt, ...rest } = u;
    return rest;
  }

  // WebCrypto helperlar (client-only). Agar siz avvalgi PBKDF2 kodini ishlatsangiz, shu yerga ko‘chirib keling.
  async function deriveKey(password, saltHex) {
    // agar process.client bo'lmasa bu chaqirilmaydi
    const enc = new TextEncoder();
    const passKey = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );
    const saltBuf = new Uint8Array(
      saltHex.match(/.{1,2}/g).map((h) => parseInt(h, 16))
    ).buffer;
    const derived = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: saltBuf, iterations: 120000, hash: "SHA-256" },
      passKey,
      32 * 8
    );
    return Array.from(new Uint8Array(derived))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  async function genSalt(len = 16) {
    const a = new Uint8Array(len);
    crypto.getRandomValues(a);
    return Array.from(a)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  async function register({ fullname, email, phone, password, avatar }) {
    if (!process.client) throw new Error("Register is client-only demo");
    const users = loadUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase()))
      throw new Error("Email mavjud");
    const salt = await genSalt(16);
    const passHash = await deriveKey(password, salt);
    const id = "u_" + Math.random().toString(36).slice(2, 9);
    const newUser = {
      id,
      fullname,
      email,
      phone,
      avatar: avatar || null,
      salt,
      passHash,
      createdAt: Date.now(),
    };
    users.push(newUser);
    saveUsers(users);
    // session cookie
    saveSessionCookie({
      userId: id,
      expiry: Date.now() + 1000 * 60 * 60 * 24 * 30,
    });
    userState.value = sanitize(newUser);
    readyState.value = true;
    return sanitize(newUser);
  }

  async function login({ email, password }) {
    if (!process.client) throw new Error("Login is client-only demo");
    const users = loadUsers();
    const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase());
    if (!u) throw new Error("Foydalanuvchi topilmadi");
    const derived = await deriveKey(password, u.salt);
    if (derived !== u.passHash) throw new Error("Parol not to‘g‘ri");
    saveSessionCookie({
      userId: u.id,
      expiry: Date.now() + 1000 * 60 * 60 * 24 * 30,
    });
    userState.value = sanitize(u);
    readyState.value = true;
    return sanitize(u);
  }

  function logout() {
    clearSessionCookie();
    userState.value = null;
    readyState.value = true;
  }

  function initFromStorage() {
    // cookie ishlaydi ham serverda ham clientda; lekin localStorage faqat client
    const s = loadSessionCookie();
    if (!s || !s.userId) {
      readyState.value = true;
      return;
    }
    if (process.server) {
      // serverda faqat id saqlab qo'ymiz; batafsil profil clientda yuklanadi
      userState.value = { id: s.userId };
      readyState.value = true;
      return;
    }
    const users = loadUsers();
    const u = users.find((x) => x.id === s.userId);
    if (u) userState.value = sanitize(u);
    readyState.value = true;
  }

  initFromStorage();

  return {
    user: computed(() => userState.value),
    ready: computed(() => readyState.value),
    register,
    login,
    logout,
    updateProfile: (patch) => {
      if (!process.client) throw new Error("client-only");
      if (!userState.value) throw new Error("not auth");
      const users = loadUsers();
      const idx = users.findIndex((x) => x.id === userState.value.id);
      users[idx] = { ...users[idx], ...patch };
      saveUsers(users);
      userState.value = sanitize(users[idx]);
    },
  };
};
