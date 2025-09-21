import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Read Supabase URL and KEY from environment variables with fallbacks
const _env = (typeof import.meta !== 'undefined' && (import.meta as any).env) ? (import.meta as any).env : (typeof process !== 'undefined' && process.env) ? process.env : {};
const supabaseUrl = _env.VITE_SUPABASE_URL || _env.SUPABASE_URL || 'https://mhwjdkzpnhzmduolfgmy.supabase.co';
const supabaseKey = _env.VITE_SUPABASE_KEY || _env.SUPABASE_KEY || 'sb_publishable_LGovYeBhQtpuj3ixRv9DBw_CfP3iT4X';
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };