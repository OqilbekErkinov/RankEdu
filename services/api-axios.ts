// services/api-axios.ts
import axios from "axios";
const API = axios.create({ baseURL: process.env.API_BASE || "http://127.0.0.1:8000/api" });

export function setAuthToken(token?: string) {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
}

export async function getMyProfileAxios() {
  const r = await API.get("/profiles/me/");
  return r.data;
}

export async function getProfilesByUserId(userId: number) {
  const r = await API.get("/profiles/", { params: { user_id: userId }});
  return r.data;
}

export async function getMessagesAxios() {
  const r = await API.get("/messages/");
  return r.data;
}

export async function getBadgesAxios(user_id?: number) {
  const r = await API.get("/badges/", { params: user_id ? { user_id } : {}});
  return r.data;
}
