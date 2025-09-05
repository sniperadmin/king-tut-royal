// Edge Function to get page layout configuration
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const pageName = url.searchParams.get('page') || 'homepage'

    // Get page layout
    const { data: pageLayout, error } = await supabaseClient
      .from('page_layouts')
      .select('page_name, layout_draft, layout_published, meta, status, is_published')
      .eq('page_name', pageName)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error
    }

    // If no layout exists, create default
    if (!pageLayout) {
      const { data: newLayout, error: createError } = await supabaseClient
        .from('page_layouts')
        .insert({
          page_name: pageName,
          layout_draft: [],
          layout_published: [],
          meta: {},
          is_published: false,
          status: 'draft'
        })
        .select('page_name, layout_draft, layout_published, meta, status, is_published')
        .single()

      if (createError) throw createError

      return new Response(
        JSON.stringify({ data: newLayout }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    return new Response(
      JSON.stringify({ data: pageLayout }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error fetching page layout:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})