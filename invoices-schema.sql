-- Create invoices table for billing system
CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_number TEXT NOT NULL UNIQUE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL '14 days'),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
    customer_name TEXT NOT NULL,
    customer_address TEXT DEFAULT '',
    customer_city TEXT DEFAULT '',
    customer_phone TEXT NOT NULL,
    customer_email TEXT DEFAULT '',
    customer_gstin TEXT DEFAULT '',
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
    cgst NUMERIC(12,2) NOT NULL DEFAULT 0,
    sgst NUMERIC(12,2) NOT NULL DEFAULT 0,
    total NUMERIC(12,2) NOT NULL DEFAULT 0,
    notes TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Allow all operations with service role
CREATE POLICY "Allow all for service role" ON invoices FOR ALL USING (true);

-- Create index for faster lookups
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_date ON invoices(date DESC);
CREATE INDEX idx_invoices_number ON invoices(invoice_number);
