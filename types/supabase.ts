// Hand-authored to match supabase/migrations/*.sql until the migrations are
// applied to the live project and can be regenerated with:
//   npx supabase gen types typescript --project-id <project-ref> > types/supabase.ts
export type RoleType = "admin" | "seller" | "customer"
export type PropertyType =
  | "apartment"
  | "house"
  | "studio"
  | "villa"
  | "room"
  | "office"
  | "land"
  | "other"
export type ListingStatus = "published" | "unpublished" | "archived"
export type ListingType = "rent" | "sale"

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: RoleType
          full_name: string | null
          phone: string | null
          whatsapp: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: RoleType
          full_name?: string | null
          phone?: string | null
          whatsapp?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: RoleType
          full_name?: string | null
          phone?: string | null
          whatsapp?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      listings: {
        Row: {
          id: string
          owner_id: string
          title: string
          description: string | null
          property_type: PropertyType
          listing_type: ListingType
          price: number
          currency: string
          bedrooms: number | null
          bathrooms: number | null
          rooms: number | null
          amenities: string[]
          country: string | null
          city: string
          neighborhood: string | null
          address: string | null
          latitude: number | null
          longitude: number | null
          contact_phone: string | null
          contact_whatsapp: string | null
          contact_email: string | null
          status: ListingStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          title: string
          description?: string | null
          property_type: PropertyType
          listing_type?: ListingType
          price: number
          currency?: string
          bedrooms?: number | null
          bathrooms?: number | null
          rooms?: number | null
          amenities?: string[]
          country?: string | null
          city: string
          neighborhood?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          contact_phone?: string | null
          contact_whatsapp?: string | null
          contact_email?: string | null
          status?: ListingStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          title?: string
          description?: string | null
          property_type?: PropertyType
          listing_type?: ListingType
          price?: number
          currency?: string
          bedrooms?: number | null
          bathrooms?: number | null
          rooms?: number | null
          amenities?: string[]
          country?: string | null
          city?: string
          neighborhood?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          contact_phone?: string | null
          contact_whatsapp?: string | null
          contact_email?: string | null
          status?: ListingStatus
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_images: {
        Row: {
          id: string
          listing_id: string
          storage_path: string
          position: number
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          storage_path: string
          position?: number
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          storage_path?: string
          position?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_images_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: {
      is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
    Enums: {
      role_type: RoleType
      property_type_enum: PropertyType
      listing_status: ListingStatus
    }
  }
}
