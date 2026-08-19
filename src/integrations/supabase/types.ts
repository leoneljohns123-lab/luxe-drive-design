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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          admin_notes: string
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          dropoff_location: string
          id: string
          notes: string
          pickup_date: string | null
          pickup_location: string
          pickup_time: string
          reference: string
          return_date: string | null
          return_time: string
          status: Database["public"]["Enums"]["booking_status"]
          updated_at: string
          vehicle_id: string | null
          vehicle_name: string
          with_driver: boolean
        }
        Insert: {
          admin_notes?: string
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string
          dropoff_location?: string
          id?: string
          notes?: string
          pickup_date?: string | null
          pickup_location?: string
          pickup_time?: string
          reference?: string
          return_date?: string | null
          return_time?: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
          vehicle_id?: string | null
          vehicle_name?: string
          with_driver?: boolean
        }
        Update: {
          admin_notes?: string
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          dropoff_location?: string
          id?: string
          notes?: string
          pickup_date?: string | null
          pickup_location?: string
          pickup_time?: string
          reference?: string
          return_date?: string | null
          return_time?: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
          vehicle_id?: string | null
          vehicle_name?: string
          with_driver?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "bookings_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_applications: {
        Row: {
          admin_notes: string
          availability: string
          city: string
          country: string
          created_at: string
          cv_path: string | null
          date_of_birth: string | null
          email: string
          experience_notes: string
          full_name: string
          good_conduct_path: string | null
          has_own_vehicle: boolean
          id: string
          id_path: string | null
          languages: string
          licence_class: string
          licence_expiry: string | null
          licence_number: string
          licence_path: string | null
          phone: string
          photo_path: string | null
          preferred_hours: string
          reference: string
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          vehicle_types: string[]
          years_experience: number | null
        }
        Insert: {
          admin_notes?: string
          availability?: string
          city?: string
          country?: string
          created_at?: string
          cv_path?: string | null
          date_of_birth?: string | null
          email: string
          experience_notes?: string
          full_name: string
          good_conduct_path?: string | null
          has_own_vehicle?: boolean
          id?: string
          id_path?: string | null
          languages?: string
          licence_class?: string
          licence_expiry?: string | null
          licence_number?: string
          licence_path?: string | null
          phone?: string
          photo_path?: string | null
          preferred_hours?: string
          reference?: string
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          vehicle_types?: string[]
          years_experience?: number | null
        }
        Update: {
          admin_notes?: string
          availability?: string
          city?: string
          country?: string
          created_at?: string
          cv_path?: string | null
          date_of_birth?: string | null
          email?: string
          experience_notes?: string
          full_name?: string
          good_conduct_path?: string | null
          has_own_vehicle?: boolean
          id?: string
          id_path?: string | null
          languages?: string
          licence_class?: string
          licence_expiry?: string | null
          licence_number?: string
          licence_path?: string | null
          phone?: string
          photo_path?: string | null
          preferred_hours?: string
          reference?: string
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          vehicle_types?: string[]
          years_experience?: number | null
        }
        Relationships: []
      }
      lease_applications: {
        Row: {
          admin_notes: string
          availability: string
          condition_notes: string
          created_at: string
          expected_monthly: number | null
          fuel: string
          id: string
          inspection_path: string | null
          insurance_path: string | null
          insurance_status: string
          logbook_path: string | null
          message: string
          mileage_km: number | null
          owner_city: string
          owner_country: string
          owner_email: string
          owner_name: string
          owner_phone: string
          photo_paths: string[]
          reference: string
          registration: string
          seats: number | null
          status: Database["public"]["Enums"]["application_status"]
          transmission: string
          updated_at: string
          vehicle_make: string
          vehicle_model: string
          vehicle_year: number | null
        }
        Insert: {
          admin_notes?: string
          availability?: string
          condition_notes?: string
          created_at?: string
          expected_monthly?: number | null
          fuel?: string
          id?: string
          inspection_path?: string | null
          insurance_path?: string | null
          insurance_status?: string
          logbook_path?: string | null
          message?: string
          mileage_km?: number | null
          owner_city?: string
          owner_country?: string
          owner_email: string
          owner_name: string
          owner_phone?: string
          photo_paths?: string[]
          reference?: string
          registration?: string
          seats?: number | null
          status?: Database["public"]["Enums"]["application_status"]
          transmission?: string
          updated_at?: string
          vehicle_make?: string
          vehicle_model?: string
          vehicle_year?: number | null
        }
        Update: {
          admin_notes?: string
          availability?: string
          condition_notes?: string
          created_at?: string
          expected_monthly?: number | null
          fuel?: string
          id?: string
          inspection_path?: string | null
          insurance_path?: string | null
          insurance_status?: string
          logbook_path?: string | null
          message?: string
          mileage_km?: number | null
          owner_city?: string
          owner_country?: string
          owner_email?: string
          owner_name?: string
          owner_phone?: string
          photo_paths?: string[]
          reference?: string
          registration?: string
          seats?: number | null
          status?: Database["public"]["Enums"]["application_status"]
          transmission?: string
          updated_at?: string
          vehicle_make?: string
          vehicle_model?: string
          vehicle_year?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          archived: boolean
          category: string
          created_at: string
          description: string
          engine_capacity: string
          featured: boolean
          features: string[]
          fuel: string
          id: string
          images: string[]
          location: string
          luggage: number
          make: string
          mileage: string
          model: string
          name: string
          price_daily: number
          price_monthly: number | null
          price_weekly: number | null
          rental_terms: string
          seats: number
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["vehicle_status"]
          tagline: string
          transmission: string
          updated_at: string
          year: number | null
        }
        Insert: {
          archived?: boolean
          category?: string
          created_at?: string
          description?: string
          engine_capacity?: string
          featured?: boolean
          features?: string[]
          fuel?: string
          id?: string
          images?: string[]
          location?: string
          luggage?: number
          make?: string
          mileage?: string
          model?: string
          name: string
          price_daily?: number
          price_monthly?: number | null
          price_weekly?: number | null
          rental_terms?: string
          seats?: number
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["vehicle_status"]
          tagline?: string
          transmission?: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          archived?: boolean
          category?: string
          created_at?: string
          description?: string
          engine_capacity?: string
          featured?: boolean
          features?: string[]
          fuel?: string
          id?: string
          images?: string[]
          location?: string
          luggage?: number
          make?: string
          mileage?: string
          model?: string
          name?: string
          price_daily?: number
          price_monthly?: number | null
          price_weekly?: number | null
          rental_terms?: string
          seats?: number
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["vehicle_status"]
          tagline?: string
          transmission?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_reference: { Args: { prefix: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      track_application: {
        Args: { _email: string; _reference: string }
        Returns: {
          kind: string
          last_update: string
          reference: string
          status: Database["public"]["Enums"]["application_status"]
          submitted_at: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "user"
      application_status:
        | "pending"
        | "under_review"
        | "approved"
        | "rejected"
        | "completed"
      booking_status: "pending" | "confirmed" | "completed" | "cancelled"
      vehicle_status:
        | "available"
        | "reserved"
        | "rented"
        | "maintenance"
        | "unavailable"
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
    Enums: {
      app_role: ["admin", "staff", "user"],
      application_status: [
        "pending",
        "under_review",
        "approved",
        "rejected",
        "completed",
      ],
      booking_status: ["pending", "confirmed", "completed", "cancelled"],
      vehicle_status: [
        "available",
        "reserved",
        "rented",
        "maintenance",
        "unavailable",
      ],
    },
  },
} as const
