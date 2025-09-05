import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '')
    const formData = await req.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'general'
    const altText = (formData.get('altText') as string) || ''
    const section = (formData.get('section') as string) || ''

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/ogg']
    if (!allowedTypes.includes(file.type)) {
      return new Response(JSON.stringify({ error: 'File type not supported' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return new Response(JSON.stringify({ error: 'File size too large (max 10MB)' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file, { cacheControl: '3600', upsert: false })
    if (uploadError) {
      console.error('Upload error:', uploadError)
      return new Response(JSON.stringify({ error: 'Failed to upload file' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath)
    const thumbnailUrl = file.type.startsWith('image/') ? urlData.publicUrl : null

    const { data: assetData, error: dbError } = await supabase
      .from('media_assets')
      .insert([
        {
          filename: fileName,
          original_filename: file.name,
          url: urlData.publicUrl,
          thumbnail_url: thumbnailUrl,
          alt_text: altText,
          file_size: file.size,
          mime_type: file.type,
          section,
          folder,
        },
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      await supabase.storage.from('media').remove([filePath])
      return new Response(JSON.stringify({ error: 'Failed to save file metadata' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    return new Response(JSON.stringify({ success: true, data: assetData }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
