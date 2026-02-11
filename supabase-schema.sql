-- =============================================
-- Ratan Solar — Supabase Leads Table Schema
-- Run this in your Supabase SQL Editor
-- =============================================

-- Create the leads table
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    
    -- Contact info
    name TEXT NOT NULL,
    email TEXT DEFAULT '',
    phone TEXT NOT NULL,
    message TEXT DEFAULT '',
    
    -- Lead classification
    source TEXT NOT NULL CHECK (source IN ('contact', 'referral', 'calculator', 'exit_popup')),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    
    -- Tracking
    page_url TEXT DEFAULT '',
    notes TEXT DEFAULT '',
    
    -- Referral-specific fields
    referred_name TEXT DEFAULT '',
    referred_phone TEXT DEFAULT '',
    referred_email TEXT DEFAULT '',
    
    -- Flexible metadata (for service type, calculator data, etc.)
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for fast queries
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access (for API routes)
CREATE POLICY "Service role has full access" ON leads
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Policy: Allow anonymous inserts (for form submissions from frontend)
CREATE POLICY "Allow anonymous inserts" ON leads
    FOR INSERT
    WITH CHECK (true);

-- =============================================
-- Done! Your leads table is ready.
-- API routes will use service role key for full CRUD.
-- =============================================

-- =============================================
-- Admin User Setup (for Supabase Auth)
-- =============================================
-- Option 1: Create admin user via Supabase Dashboard
--   1. Go to Authentication > Users in your Supabase Dashboard
--   2. Click "Add User" > "Create new user"
--   3. Enter email: admin@ratansolar.com
--   4. Set a strong password
--   5. Click "Create user"
--
-- Option 2: Create admin user via SQL (uncomment below)
-- INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, role)
-- VALUES (
--   'admin@ratansolar.com',
--   crypt('your-strong-password-here', gen_salt('bf')),
--   now(),
--   'authenticated'
-- );
-- =============================================
