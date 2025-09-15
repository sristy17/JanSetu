import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mplrhavlbnhvnwtpvpes.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wbHJoYXZsYm5odm53dHB2cGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2OTUzNDgsImV4cCI6MjA3MzI3MTM0OH0.ugpqjZtArIuktStXdVQ2ulRbxakEhxq8fgq49Pn5dIw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
