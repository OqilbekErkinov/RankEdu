// plugins/supabase.client.ts
import { createClient } from "@supabase/supabase-js";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const url = config.public.supabaseUrl;
  const anonKey = config.public.supabaseAnonKey;

  if (!url || !anonKey) {
    console.warn("[supabase] Missing URL or ANON KEY in runtimeConfig.public");
    return {};
  }

  const supabase = createClient(url, anonKey, {
    auth: { persistSession: true },
  });

  // bitta usul — nuxtApp.provide bilan
  nuxtApp.provide("supabase", supabase);

  // agar composition API da useNuxtApp().$supabase ishlatmoqchi bo‘lsangiz:
  // Object.defineProperty orqali ham qilinadi, lekin oddiy provide yetarli.
  return {};
});
