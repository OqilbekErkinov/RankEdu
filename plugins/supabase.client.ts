// plugins/supabase.client.ts
import { createClient } from "@supabase/supabase-js";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const url = config.public.supabaseUrl;
  const anonKey = config.public.supabaseAnonKey;

  if (!url || !anonKey) {
    console.warn("[supabase] Missing URL or ANON KEY in runtimeConfig.public");
    return;
  }

  const supabase = createClient(url, anonKey, {
    auth: {
      persistSession: true,
    },
  });

  // Provide supabase as $supabase (nuxtApp.$supabase) — bitta yo'l bilan provayd qilamiz
  nuxtApp.provide("supabase", supabase);

  // note: do NOT return provide: { supabase } va ham nuxtApp.provide ishlatmang — bu conflict tugdiradi
});
