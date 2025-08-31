import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://mhwjdkzpnhzmduolfgmy.supabase.co';
const supabaseKey = 'sb_publishable_LGovYeBhQtpuj3ixRv9DBw_CfP3iT4X';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };