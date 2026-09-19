import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-BbIcayfE.js
/** Public anon client — same project as live maxalena.com. Anon key is already public in the production frontend. */
var SUPABASE_URL = "https://jbkxmvpcqgpjprkhppve.supabase.co";
var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impia3htdnBjcWdwanBya2hwcHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMzgxNDAsImV4cCI6MjA5NTYxNDE0MH0.WmaDwrnOwG1kqXQZhBLGREKhpshScMBQZYEHjzuMN5Q";
var client = null;
function getSupabase() {
	if (!client) client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: {
		persistSession: typeof window !== "undefined",
		autoRefreshToken: typeof window !== "undefined",
		detectSessionInUrl: typeof window !== "undefined"
	} });
	return client;
}
//#endregion
export { getSupabase as t };
