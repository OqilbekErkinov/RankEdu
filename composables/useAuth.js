// /composables/useAuth.js
export const useAuth = () => {
  // Global reaktiv holat (Nuxt useState bilan SSR-safe)
  const userState = useState('auth.user', () => null)
  const readyState = useState('auth.ready', () => false)

  const SESSION_COOKIE = 'app_session_v1' // cookie nomi
  const USERS_KEY = 'app_users_v1' // localStorage kaliti (client-side)

  // --- yordamchi: clientda localStorage bilan ishlash ---
  function loadUsersFromLocal() {
    if (process.client) {
      try {
        const raw = localStorage.getItem(USERS_KEY)
        return raw ? JSON.parse(raw) : []
      } catch (e) { return [] }
    }
    return []
  }
  function saveUsersToLocal(users) {
    if (!process.client) return
    try { localStorage.setItem(USERS_KEY, JSON.stringify(users)) } catch {}
  }

  // --- session cookie bilan ishlash (SSR-safe) ---
  function saveSessionCookie(payload) {
    // payload: { userId, expiry }
    // cookie expiry misol uchun 30 kun
    const maxAge = 60 * 60 * 24 * 30
    useCookie(SESSION_COOKIE).value = { ...payload, _savedAt: Date.now() }
    // Nuxt useCookie avtomatik cookie o'rnatadi
  }
  function clearSessionCookie() {
    useCookie(SESSION_COOKIE).value = null
  }
  function loadSessionCookie() {
    return useCookie(SESSION_COOKIE).value || null
  }

  // --- sanitize user (password/hash olib tashlash) ---
  function sanitize(u) {
    if (!u) return null
    const { passHash, salt, ...rest } = u
    return rest
  }

  // --- helper: find user by email (client-side users store) ---
  function findUserByEmail(email) {
    const users = loadUsersFromLocal()
    return users.find(x => x.email?.toLowerCase() === (email || '').toLowerCase())
  }

  // Web Crypto PBKDF2 funksiyalari (simple, client-only)
  async function genSalt(len = 16) {
    const a = new Uint8Array(len)
    crypto.getRandomValues(a)
    return Array.from(a).map(b => b.toString(16).padStart(2, '0')).join('')
  }
  function hexToBuf(hex) {
    const bytes = new Uint8Array(hex.length / 2)
    for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
    return bytes.buffer
  }
  function bufToHex(buf) {
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
  }
  async function deriveKey(password, saltHex, iterations = 120000, keyLen = 32) {
    const enc = new TextEncoder()
    const passKey = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits'])
    const saltBuf = hexToBuf(saltHex)
    const derived = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: saltBuf, iterations, hash: 'SHA-256' }, passKey, keyLen * 8)
    return bufToHex(derived)
  }

  // --- register / login / logout / init functions ---
  async function register({ fullname, email, phone, password, avatarDataUrl = null }) {
    if (!process.client) throw new Error('Register is client-only (local demo).')

    if (!email || !password) throw new Error('Email va parol kerak.')

    const existing = findUserByEmail(email)
    if (existing) throw new Error('Ushbu email bilan foydalanuvchi mavjud.')

    const salt = await genSalt(16)
    const passHash = await deriveKey(password, salt, 120000, 32)

    const users = loadUsersFromLocal()
    const id = 'u_' + Math.random().toString(36).slice(2, 9)
    const newUser = {
      id,
      fullname: fullname || '',
      email,
      phone: phone || '',
      avatar: avatarDataUrl || null,
      salt,
      passHash,
      createdAt: Date.now()
    }
    users.push(newUser)
    saveUsersToLocal(users)

    // create session cookie and set state
    saveSessionCookie({ userId: id, expiry: Date.now() + 1000 * 60 * 60 * 24 * 30 })
    userState.value = sanitize(newUser)
    readyState.value = true
    return sanitize(newUser)
  }

  async function login({ email, password }) {
    if (!process.client) throw new Error('Login is client-only (local demo).')
    const user = findUserByEmail(email)
    if (!user) throw new Error('Foydalanuvchi topilmadi.')

    const derived = await deriveKey(password, user.salt, 120000, 32)
    if (derived !== user.passHash) throw new Error('Parol noto`g`ri.')

    saveSessionCookie({ userId: user.id, expiry: Date.now() + 1000 * 60 * 60 * 24 * 30 })
    userState.value = sanitize(user)
    readyState.value = true
    return sanitize(user)
  }

  function logout() {
    clearSessionCookie()
    userState.value = null
    readyState.value = true
    // client-side: optional clear session storage
    if (process.client) {
      // do not delete users list
    }
  }

  // update profile (merge and persist to localStorage)
  function updateProfile(patch = {}) {
    if (!process.client) throw new Error('updateProfile is client-only')
    if (!userState.value) throw new Error('Not authenticated')
    const users = loadUsersFromLocal()
    const idx = users.findIndex(u => u.id === userState.value.id)
    if (idx === -1) throw new Error('Foydalanuvchi topilmadi')
    users[idx] = { ...users[idx], ...patch }
    saveUsersToLocal(users)
    userState.value = sanitize(users[idx])
  }

  // init: try to load session cookie and restore userState
  function initFromStorage() {
    // can be called server or client; cookie works both sides in Nuxt
    const sess = loadSessionCookie()
    if (!sess || !sess.userId) {
      readyState.value = true
      return
    }
    // If on server, we cannot access localStorage, so only restore minimal info from cookie
    if (process.server) {
      // Try to find user id in cookie only; full profile will be loaded on client
      userState.value = { id: sess.userId } // placeholder
      readyState.value = true
      return
    }
    // client: load full user from localStorage users list
    const users = loadUsersFromLocal()
    const u = users.find(x => x.id === sess.userId)
    if (u) userState.value = sanitize(u)
    readyState.value = true
  }

  // call init immediately
  initFromStorage()

  return {
    user: computed(() => userState.value),
    ready: computed(() => readyState.value),
    register,
    login,
    logout,
    updateProfile
  }
}
