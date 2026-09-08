/*
# Create lead capture tables for The Obsidian Residences

1. New Tables
- `chat_leads`: stores visitor info captured from the AI sales chat widget
  - `id` (uuid, primary key)
  - `name` (text, nullable - captured during chat)
  - `email` (text, nullable - captured during chat)
  - `phone` (text, nullable - captured during chat)
  - `interest` (text, nullable - e.g. "penthouse", "terrace", "payment plan")
  - `first_message` (text - the visitor's opening message)
  - `status` (text, default 'new' - new/contacted/converted)
  - `created_at` (timestamptz)
- `prospectus_downloads`: tracks each time the prospectus PDF is requested
  - `id` (uuid, primary key)
  - `source` (text, nullable - "hero" / "prospectus section" etc.)
  - `ip_hint` (text, nullable)
  - `created_at` (timestamptz)
- `inspection_requests`: tracks private inspection booking requests
  - `id` (uuid, primary key)
  - `name` (text, nullable)
  - `email` (text, nullable)
  - `phone` (text, nullable)
  - `preferred_date` (text, nullable)
  - `notes` (text, nullable)
  - `created_at` (timestamptz)

2. Security
- This is a single-tenant no-auth landing page (no sign-in screen).
- All tables use `TO anon, authenticated` so the anon-key frontend can insert lead data.
- RLS enabled on all tables.
- SELECT is intentionally open to anon/authenticated only for inspection_requests
  (so the owner dashboard could later read them when authenticated); chat_leads and
  prospectus_downloads are INSERT-only for anon to prevent scraping of leads.
- INSERT allowed for anon/authenticated (the public form writes).
- No UPDATE/DELETE for anon (leads cannot be modified by visitors).

3. Important Notes
- The frontend uses the anon key, so every policy lists `anon`.
- No user_id columns — no sign-in flow exists.
- Indexes added on created_at for chronological ordering.
*/

-- chat_leads
CREATE TABLE IF NOT EXISTS chat_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  phone text,
  interest text,
  first_message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE chat_leads ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_chat_leads_created_at ON chat_leads (created_at DESC);

DROP POLICY IF EXISTS "anon_insert_chat_leads" ON chat_leads;
CREATE POLICY "anon_insert_chat_leads" ON chat_leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- prospectus_downloads
CREATE TABLE IF NOT EXISTS prospectus_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text,
  ip_hint text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE prospectus_downloads ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_prospectus_downloads_created_at ON prospectus_downloads (created_at DESC);

DROP POLICY IF EXISTS "anon_insert_prospectus_downloads" ON prospectus_downloads;
CREATE POLICY "anon_insert_prospectus_downloads" ON prospectus_downloads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- inspection_requests
CREATE TABLE IF NOT EXISTS inspection_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  phone text,
  preferred_date text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE inspection_requests ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_inspection_requests_created_at ON inspection_requests (created_at DESC);

DROP POLICY IF EXISTS "anon_insert_inspection_requests" ON inspection_requests;
CREATE POLICY "anon_insert_inspection_requests" ON inspection_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_inspection_requests" ON inspection_requests;
CREATE POLICY "anon_select_inspection_requests" ON inspection_requests FOR SELECT
  TO anon, authenticated USING (true);
