// Edge Function to publish a page layout (copy draft to published and version it)
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { pageName, note, userId } = await req.json()
    if (!pageName) {
      return new Response(JSON.stringify({ error: 'Missing pageName' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 })
    }

    // Fetch draft
    const { data: page, error: fetchErr } = await supabase
      .from('page_layouts')
      .select('id, page_name, layout_draft')
      .eq('page_name', pageName)
      .single()
    if (fetchErr || !page) throw fetchErr || new Error('Page not found')

    // Publish: copy draft to published
    const { data: updated, error: updateErr } = await supabase
      .from('page_layouts')
      .update({ layout_published: page.layout_draft, status: 'published', is_published: true, updated_at: new Date().toISOString(), updated_by: userId || null })
      .eq('id', page.id)
      .select()
      .single()
    if (updateErr) throw updateErr

    // Snapshot version
    await supabase
      .from('layout_versions')
      .insert({ page_name: pageName, layout: page.layout_draft, note: note || 'Published via admin', created_by: userId || null })

    return new Response(JSON.stringify({ data: updated, message: 'Published successfully' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
  } catch (error) {
    console.error('Error publishing page layout:', error)
    return new Response(JSON.stringify({ error: error.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 })
  }
})
