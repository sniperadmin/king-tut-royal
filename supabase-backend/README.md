# Supabase Backend Setup for Admin Dashboard

This directory contains the database schema and Edge Functions needed for the admin dashboard functionality.

## Database Tables

### 1. theme_config
Stores theme customization settings for the website.

**Setup:**
```sql
-- Run this in your Supabase SQL editor
\i theme_config_table.sql
```

**Fields:**
- `id`: UUID primary key
- `primary_color`: Main brand color (hex)
- `secondary_color`: Secondary color (hex)
- `accent_color`: Accent color (hex)
- `background_color`: Background color (hex)
- `background_image`: Optional background image URL
- `font_family`: Font family string
- `font_size_base`: Base font size in pixels
- `line_height`: Line height multiplier
- `spacing_unit`: Base spacing unit in pixels
- `border_radius`: Border radius in pixels
- `created_at`, `updated_at`: Timestamps

### 2. media_assets
Stores metadata for uploaded media files.

**Setup:**
```sql
-- Run this in your Supabase SQL editor
\i media_assets_table.sql
```

**Fields:**
- `id`: UUID primary key
- `filename`: Generated unique filename
- `original_filename`: Original uploaded filename
- `url`: Public URL to the file
- `thumbnail_url`: Thumbnail URL (for images)
- `alt_text`: Alt text for accessibility
- `file_size`: File size in bytes
- `mime_type`: MIME type of the file
- `section`: Optional section categorization
- `folder`: Folder organization (general, hero, gallery, etc.)
- `uploaded_at`, `created_at`, `updated_at`: Timestamps

## Storage Buckets

### media
Create a public storage bucket named `media` in your Supabase dashboard:

1. Go to Storage in your Supabase dashboard
2. Create a new bucket named `media`
3. Make it public
4. Set up the following folder structure:
   - general/
   - hero/
   - gallery/
   - packages/
   - testimonials/

## Edge Functions

### upload-media
Handles file uploads and metadata storage.

**Setup:**
1. Install Supabase CLI
2. Deploy the function:
```bash
supabase functions deploy upload-media --project-ref YOUR_PROJECT_REF
```

**Environment Variables:**
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key (not anon key)

**Usage:**
- Endpoint: `https://YOUR_PROJECT.supabase.co/functions/v1/upload-media`
- Method: POST
- Content-Type: multipart/form-data
- Body: FormData with `file`, `folder`, `altText`, `section` fields

## Security Policies

Both tables use Row Level Security (RLS) with policies that allow all operations for authenticated users. In production, you should:

1. Create admin-specific roles
2. Restrict policies to admin users only
3. Add proper authentication checks

## Frontend Integration

The admin dashboard uses these composables:
- `useThemeConfig`: Manages theme settings
- `useMediaUpload`: Handles file uploads and media management

Both composables are already configured to work with these database tables and Edge Functions.

## Development Notes

1. The theme_config table includes a default theme configuration
2. File uploads are limited to 10MB and specific MIME types
3. Thumbnails are currently just the original image URL (implement proper thumbnail generation for production)
4. All timestamps use UTC timezone
5. The upload function includes proper error handling and cleanup

## Production Considerations

1. Implement proper thumbnail generation
2. Add image optimization/compression
3. Set up CDN for media files
4. Add virus scanning for uploads
5. Implement proper admin authentication
6. Add audit logging for admin actions
7. Set up backup strategies for media files