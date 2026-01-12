import { createClient } from '@supabase/supabase-js'

// Shtimi i "!" në fund i tregon kodit që këto vlera nuk janë bosh
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)