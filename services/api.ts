// services/api.ts
const API_BASE = process.env.API_BASE || "http://127.0.0.1:8000/api";

function authHeader(token?: string) {
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

// get profile by user id
export async function getProfileByUserId(userId: number, token?: string) {
  const url = `${API_BASE}/profiles/?user_id=${userId}`;
  const res = await fetch(url, { headers: { ...authHeader(token) }});
  if (!res.ok) throw await res.json();
  return res.json(); // list of profiles (serialized)
}

// get current user's profile (authenticated)
export async function getMyProfile(token: string) {
  const url = `${API_BASE}/profiles/me/`;
  const res = await fetch(url, { headers: { "Authorization": `Bearer ${token}` }});
  if (!res.ok) throw await res.json();
  return res.json(); // single profile object
}

// get messages for current authenticated user
export async function getMessages(token: string) {
  const url = `${API_BASE}/messages/`;
  const res = await fetch(url, { headers: { "Authorization": `Bearer ${token}` }});
  if (!res.ok) throw await res.json();
  return res.json();
}

// get badges by user id
export async function getBadges(userId: number | null, token?: string) {
  let url = `${API_BASE}/badges/`;
  if (userId) url += `?user_id=${userId}`;
  const res = await fetch(url, { headers: { ...authHeader(token) }});
  if (!res.ok) throw await res.json();
  return res.json();
}
