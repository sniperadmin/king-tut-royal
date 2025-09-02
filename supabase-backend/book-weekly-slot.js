export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
Deno.serve(async (req)=>{
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { weekStartDate, participants } = await req.json();
    // First check if slot is available
    const { data: currentData, error: checkError } = await supabase.from('weekly_bookings').select('booking_count').eq('week_start_date', weekStartDate).single();
    if (checkError) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Week not found'
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }
    if (currentData.booking_count >= 50) {
      return new Response(JSON.stringify({
        success: false,
        message: 'This week is fully booked'
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }
    // Check if adding participants would exceed capacity
    if (currentData.booking_count + participants > 50) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Not enough slots available for this booking'
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }

    // Increment booking count by number of participants atomically
    const { data, error } = await supabase.from('weekly_bookings').update({
      booking_count: currentData.booking_count + participants,
      updated_at: new Date().toISOString()
    }).eq('week_start_date', weekStartDate).eq('booking_count', currentData.booking_count) // Optimistic locking
    .select('booking_count').single();
    if (error || !data) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Booking failed - slot may have been taken'
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }
    return new Response(JSON.stringify({
      success: true,
      newCount: data.booking_count
    }), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }
});
