import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rfmdhnqjhngyybkiwjkg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmbWRobnFqaG5neXlia2l3amtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzOTgyOTAsImV4cCI6MjA0OTk3NDI5MH0.oACWY8ed4DR9eiNMTMTSUoBKLfMjak32ngu1WubUmlw";
  const supabase = createClient(supabaseUrl, supabaseKey);
  export default supabase;
