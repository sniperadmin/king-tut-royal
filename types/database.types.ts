export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          last_login: string | null
          name: string | null
          password_hash: string
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          name?: string | null
          password_hash: string
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          name?: string | null
          password_hash?: string
          role?: string | null
        }
        Relationships: []
      }
      booking_details: {
        Row: {
          address: string | null
          company_name: string | null
          email: string | null
          package_id: string
          price_amount_cents: number | null
          price_currency: string | null
          price_text: string | null
          website: string | null
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          company_name?: string | null
          email?: string | null
          package_id: string
          price_amount_cents?: number | null
          price_currency?: string | null
          price_text?: string | null
          website?: string | null
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          company_name?: string | null
          email?: string | null
          package_id?: string
          price_amount_cents?: number | null
          price_currency?: string | null
          price_text?: string | null
          website?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_details_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: true
            referencedRelation: "package_partners_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_details_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: true
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_details_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: true
            referencedRelation: "packages_view"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      component_templates: {
        Row: {
          created_at: string | null
          default_props: Json
          id: string
          is_active: boolean | null
          name: string
          preview_image: string | null
          type: string
        }
        Insert: {
          created_at?: string | null
          default_props?: Json
          id?: string
          is_active?: boolean | null
          name: string
          preview_image?: string | null
          type: string
        }
        Update: {
          created_at?: string | null
          default_props?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          preview_image?: string | null
          type?: string
        }
        Relationships: []
      }
      content_history: {
        Row: {
          admin_user_id: string | null
          change_description: string | null
          created_at: string | null
          id: string
          page_layout_id: string | null
          sections_snapshot: Json
        }
        Insert: {
          admin_user_id?: string | null
          change_description?: string | null
          created_at?: string | null
          id?: string
          page_layout_id?: string | null
          sections_snapshot: Json
        }
        Update: {
          admin_user_id?: string | null
          change_description?: string | null
          created_at?: string | null
          id?: string
          page_layout_id?: string | null
          sections_snapshot?: Json
        }
        Relationships: [
          {
            foreignKeyName: "content_history_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_history_page_layout_id_fkey"
            columns: ["page_layout_id"]
            isOneToOne: false
            referencedRelation: "page_layouts"
            referencedColumns: ["id"]
          },
        ]
      }
      guide_certification: {
        Row: {
          certification_id: number
          guide_id: string
        }
        Insert: {
          certification_id: number
          guide_id: string
        }
        Update: {
          certification_id?: number
          guide_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "guide_certification_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guide_certification_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guide_certification_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides_public"
            referencedColumns: ["id"]
          },
        ]
      }
      guide_highlight_tour: {
        Row: {
          guide_id: string
          tour_id: number
        }
        Insert: {
          guide_id: string
          tour_id: number
        }
        Update: {
          guide_id?: string
          tour_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "guide_highlight_tour_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guide_highlight_tour_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guide_highlight_tour_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      guide_language: {
        Row: {
          guide_id: string
          language_id: number
        }
        Insert: {
          guide_id: string
          language_id: number
        }
        Update: {
          guide_id?: string
          language_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "guide_language_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guide_language_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guide_language_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
        ]
      }
      guide_specialty: {
        Row: {
          guide_id: string
          specialty_id: number
        }
        Insert: {
          guide_id: string
          specialty_id: number
        }
        Update: {
          guide_id?: string
          specialty_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "guide_specialty_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guide_specialty_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guide_specialty_specialty_id_fkey"
            columns: ["specialty_id"]
            isOneToOne: false
            referencedRelation: "specialties"
            referencedColumns: ["id"]
          },
        ]
      }
      guides: {
        Row: {
          age: number | null
          availability: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          experience: string | null
          id: string
          name: string
          phone: string | null
          phone_digits: string | null
          search: unknown | null
          updated_at: string
          video_persona_url: string | null
        }
        Insert: {
          age?: number | null
          availability?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          experience?: string | null
          id?: string
          name: string
          phone?: string | null
          phone_digits?: string | null
          search?: unknown | null
          updated_at?: string
          video_persona_url?: string | null
        }
        Update: {
          age?: number | null
          availability?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          experience?: string | null
          id?: string
          name?: string
          phone?: string | null
          phone_digits?: string | null
          search?: unknown | null
          updated_at?: string
          video_persona_url?: string | null
        }
        Relationships: []
      }
      homepage_content: {
        Row: {
          content: Json | null
          created_at: string
          id: string
          section_name: string
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          id?: string
          section_name: string
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          id?: string
          section_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      icons: {
        Row: {
          asset_url: string | null
          created_at: string
          id: number
          key: string
          label: string | null
          meta: Json | null
        }
        Insert: {
          asset_url?: string | null
          created_at?: string
          id?: number
          key: string
          label?: string | null
          meta?: Json | null
        }
        Update: {
          asset_url?: string | null
          created_at?: string
          id?: number
          key?: string
          label?: string | null
          meta?: Json | null
        }
        Relationships: []
      }
      itinerary_days: {
        Row: {
          day_label: string
          id: number
          package_id: string
          position: number
        }
        Insert: {
          day_label: string
          id?: number
          package_id: string
          position: number
        }
        Update: {
          day_label?: string
          id?: number
          package_id?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_days_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "package_partners_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_days_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_days_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages_view"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_steps: {
        Row: {
          description: string
          id: number
          itinerary_day_id: number
          position: number
        }
        Insert: {
          description: string
          id?: number
          itinerary_day_id: number
          position: number
        }
        Update: {
          description?: string
          id?: number
          itinerary_day_id?: number
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_steps_itinerary_day_id_fkey"
            columns: ["itinerary_day_id"]
            isOneToOne: false
            referencedRelation: "itinerary_days"
            referencedColumns: ["id"]
          },
        ]
      }
      languages: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          alt_text: string | null
          file_size: number | null
          filename: string
          folder: string | null
          id: string
          mime_type: string | null
          original_filename: string
          section: string | null
          thumbnail_url: string | null
          uploaded_at: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          file_size?: number | null
          filename: string
          folder?: string | null
          id?: string
          mime_type?: string | null
          original_filename: string
          section?: string | null
          thumbnail_url?: string | null
          uploaded_at?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          file_size?: number | null
          filename?: string
          folder?: string | null
          id?: string
          mime_type?: string | null
          original_filename?: string
          section?: string | null
          thumbnail_url?: string | null
          uploaded_at?: string | null
          url?: string
        }
        Relationships: []
      }
      package_highlights: {
        Row: {
          highlight: string
          id: number
          package_id: string
          position: number
        }
        Insert: {
          highlight: string
          id?: number
          package_id: string
          position: number
        }
        Update: {
          highlight?: string
          id?: number
          package_id?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "package_highlights_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "package_partners_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_highlights_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_highlights_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages_view"
            referencedColumns: ["id"]
          },
        ]
      }
      package_images: {
        Row: {
          alt_text: string | null
          id: number
          image_url: string
          package_id: string
          position: number
        }
        Insert: {
          alt_text?: string | null
          id?: number
          image_url: string
          package_id: string
          position: number
        }
        Update: {
          alt_text?: string | null
          id?: number
          image_url?: string
          package_id?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "package_images_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "package_partners_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_images_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_images_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages_view"
            referencedColumns: ["id"]
          },
        ]
      }
      package_partner_links: {
        Row: {
          contract_ref: string | null
          created_at: string
          id: number
          is_primary: boolean
          meta: Json | null
          notes: string | null
          package_id: string
          partner_id: string
          position: number
          revenue_share_pct: number | null
          role_key: string | null
          updated_at: string
          valid_from: string | null
          valid_to: string | null
        }
        Insert: {
          contract_ref?: string | null
          created_at?: string
          id?: number
          is_primary?: boolean
          meta?: Json | null
          notes?: string | null
          package_id: string
          partner_id: string
          position?: number
          revenue_share_pct?: number | null
          role_key?: string | null
          updated_at?: string
          valid_from?: string | null
          valid_to?: string | null
        }
        Update: {
          contract_ref?: string | null
          created_at?: string
          id?: number
          is_primary?: boolean
          meta?: Json | null
          notes?: string | null
          package_id?: string
          partner_id?: string
          position?: number
          revenue_share_pct?: number | null
          role_key?: string | null
          updated_at?: string
          valid_from?: string | null
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "package_partner_links_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "package_partners_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_partner_links_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_partner_links_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_partner_links_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_with_packages_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_partner_links_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_partner_links_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_partner_links_role_key_fkey"
            columns: ["role_key"]
            isOneToOne: false
            referencedRelation: "partner_roles"
            referencedColumns: ["key"]
          },
        ]
      }
      package_videos: {
        Row: {
          id: number
          muted: boolean
          package_id: string
          position: number
          title: string | null
          url: string
          video_id: number | null
        }
        Insert: {
          id?: number
          muted?: boolean
          package_id: string
          position: number
          title?: string | null
          url: string
          video_id?: number | null
        }
        Update: {
          id?: number
          muted?: boolean
          package_id?: string
          position?: number
          title?: string | null
          url?: string
          video_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "package_videos_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "package_partners_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_videos_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_videos_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages_view"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          accommodation: string | null
          benefits: string | null
          created_at: string
          days: number | null
          duration_text: string | null
          icon_key: string | null
          id: string
          image_url: string | null
          inclusions: Json
          is_popular: boolean
          key: string | null
          nights: number | null
          overview: string | null
          price_amount_cents: number | null
          price_currency: string | null
          price_text: string | null
          slug: string
          sort_rank: number
          title: string
          updated_at: string
        }
        Insert: {
          accommodation?: string | null
          benefits?: string | null
          created_at?: string
          days?: number | null
          duration_text?: string | null
          icon_key?: string | null
          id?: string
          image_url?: string | null
          inclusions?: Json
          is_popular?: boolean
          key?: string | null
          nights?: number | null
          overview?: string | null
          price_amount_cents?: number | null
          price_currency?: string | null
          price_text?: string | null
          slug: string
          sort_rank?: number
          title: string
          updated_at?: string
        }
        Update: {
          accommodation?: string | null
          benefits?: string | null
          created_at?: string
          days?: number | null
          duration_text?: string | null
          icon_key?: string | null
          id?: string
          image_url?: string | null
          inclusions?: Json
          is_popular?: boolean
          key?: string | null
          nights?: number | null
          overview?: string | null
          price_amount_cents?: number | null
          price_currency?: string | null
          price_text?: string | null
          slug?: string
          sort_rank?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "packages_icon_key_fkey"
            columns: ["icon_key"]
            isOneToOne: false
            referencedRelation: "icons"
            referencedColumns: ["key"]
          },
        ]
      }
      page_layouts: {
        Row: {
          created_at: string | null
          id: string
          layout: Json
          page_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          layout?: Json
          page_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          layout?: Json
          page_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      partner_logos: {
        Row: {
          partner_id: string
          size_key: string
          url: string
        }
        Insert: {
          partner_id: string
          size_key: string
          url: string
        }
        Update: {
          partner_id?: string
          size_key?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_logos_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_with_packages_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_logos_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_logos_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners_view"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_media: {
        Row: {
          id: number
          media_type: string
          partner_id: string
          position: number
          sizes: string | null
          src: string
          srcset: string | null
          thumbnail: string | null
        }
        Insert: {
          id?: number
          media_type: string
          partner_id: string
          position: number
          sizes?: string | null
          src: string
          srcset?: string | null
          thumbnail?: string | null
        }
        Update: {
          id?: number
          media_type?: string
          partner_id?: string
          position?: number
          sizes?: string | null
          src?: string
          srcset?: string | null
          thumbnail?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_media_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_with_packages_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_media_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_media_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners_view"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_roles: {
        Row: {
          created_at: string | null
          key: string
          label: string | null
        }
        Insert: {
          created_at?: string | null
          key: string
          label?: string | null
        }
        Update: {
          created_at?: string | null
          key?: string
          label?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          about: string | null
          created_at: string
          description: string | null
          id: string
          meta: Json | null
          name: string
          services: Json | null
          updated_at: string
          website: string | null
        }
        Insert: {
          about?: string | null
          created_at?: string
          description?: string | null
          id: string
          meta?: Json | null
          name: string
          services?: Json | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          about?: string | null
          created_at?: string
          description?: string | null
          id?: string
          meta?: Json | null
          name?: string
          services?: Json | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          body: string
          created_at: string
          guide_id: string | null
          id: number
          lang_hint: string | null
        }
        Insert: {
          body: string
          created_at?: string
          guide_id?: string | null
          id?: number
          lang_hint?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          guide_id?: string | null
          id?: number
          lang_hint?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides_public"
            referencedColumns: ["id"]
          },
        ]
      }
      section_templates: {
        Row: {
          category: string
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          preview_image: string | null
          template: Json
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          preview_image?: string | null
          template: Json
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          preview_image?: string | null
          template?: Json
        }
        Relationships: []
      }
      specialties: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      theme_config: {
        Row: {
          config_key: string
          config_value: Json
          created_at: string | null
          description: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          config_key: string
          config_value?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          config_key?: string
          config_value?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tours: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      weekly_bookings: {
        Row: {
          booking_count: number | null
          created_at: string | null
          id: number
          updated_at: string | null
          week_start_date: string
        }
        Insert: {
          booking_count?: number | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
          week_start_date: string
        }
        Update: {
          booking_count?: number | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
          week_start_date?: string
        }
        Relationships: []
      }
    }
    Views: {
      guides_public: {
        Row: {
          age: number | null
          availability: string | null
          avatar_url: string | null
          bio: string | null
          certifications: string[] | null
          experience: string | null
          highlight_tours: string[] | null
          id: string | null
          languages: string[] | null
          name: string | null
          phone: string | null
          reviews: string[] | null
          specialties: string[] | null
          video_persona_url: string | null
        }
        Relationships: []
      }
      package_partners_view: {
        Row: {
          id: string | null
          package: Json | null
        }
        Insert: {
          id?: string | null
          package?: never
        }
        Update: {
          id?: string | null
          package?: never
        }
        Relationships: []
      }
      packages_ordered: {
        Row: {
          package: Json | null
        }
        Relationships: []
      }
      packages_view: {
        Row: {
          id: string | null
          package: Json | null
          slug: string | null
          sort_rank: number | null
        }
        Relationships: []
      }
      partner_with_packages_view: {
        Row: {
          id: string | null
          partner: Json | null
        }
        Insert: {
          id?: string | null
          partner?: never
        }
        Update: {
          id?: string | null
          partner?: never
        }
        Relationships: []
      }
      partners_view: {
        Row: {
          id: string | null
          partner: Json | null
        }
        Insert: {
          id?: string | null
          partner?: never
        }
        Update: {
          id?: string | null
          partner?: never
        }
        Relationships: []
      }
    }
    Functions: {
      attach_partners: {
        Args: { partners: Json; pkg_id: string }
        Returns: undefined
      }
      citext: {
        Args: { "": boolean } | { "": string } | { "": unknown }
        Returns: string
      }
      citext_hash: {
        Args: { "": string }
        Returns: number
      }
      citextin: {
        Args: { "": unknown }
        Returns: string
      }
      citextout: {
        Args: { "": string }
        Returns: unknown
      }
      citextrecv: {
        Args: { "": unknown }
        Returns: string
      }
      citextsend: {
        Args: { "": string }
        Returns: string
      }
      get_package: {
        Args: { slug_or_id: string }
        Returns: Json
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      import_guides: {
        Args: { _arr: Json }
        Returns: undefined
      }
      list_packages_ordered: {
        Args: Record<PropertyKey, never>
        Returns: Json[]
      }
      parse_price_to_cents: {
        Args: { p: string }
        Returns: number
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      slugify: {
        Args: { txt: string }
        Returns: string
      }
      upsert_guide_from_json: {
        Args: { _g: Json }
        Returns: string
      }
      upsert_package_from_json: {
        Args: { pkg: Json }
        Returns: string
      }
      upsert_partner_from_json: {
        Args: { p: Json }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
