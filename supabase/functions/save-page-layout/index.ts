import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '')
    const { pageName, sections, meta } = await req.json()
    if (!pageName || !sections) {
      return new Response(JSON.stringify({ error: 'Missing required fields: pageName, sections' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 })
    }

    const { data: pageLayout, error } = await supabase
      .from('page_layouts')
      .upsert({ page_name: pageName, layout_draft: sections, meta: meta || {}, status: 'draft', updated_at: new Date().toISOString() }, { onConflict: 'page_name' })
      .select('id, page_name, layout_draft, meta, status, is_published')
      .single()
    if (error) throw error

    await supabase.from('content_history').insert({ page_layout_id: pageLayout.id, sections_snapshot: sections, change_description: 'Layout draft updated via admin dashboard' })

    return new Response(JSON.stringify({ data: pageLayout, message: 'Page layout saved successfully' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 })
  }
})
