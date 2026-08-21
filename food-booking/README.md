## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Replace the placeholder values in `.env` with your actual Supabase credentials:

   ```env
   SUPABASE_URL=https://gecpxwasdckgphqxqiqu.supabase.co
   SUPABASE_KEY=sb_publishable_LoGlsLVs6Np6uBqlRKxbvA_DrJOlgfe
   ```  

## How to Get Your Supabase URL and API Key:

1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project.
3. Go to **Project Settings** (gear icon) -> **API**.
4. Copy the **Project URL** and paste it as `SUPABASE_URL`.
5. Copy the **`anon` `public` key** (or `service_role` key) and paste it as `SUPABASE_KEY`.
