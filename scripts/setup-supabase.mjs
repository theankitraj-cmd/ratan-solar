// Setup script to properly configure the Supabase leads table
// Run with: node scripts/setup-supabase.mjs

const SUPABASE_URL = 'https://wdiknpcimfyjtfssbvzy.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkaWtucGNpbWZ5anRmc3Nidnp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc4NDgzMCwiZXhwIjoyMDg2MzYwODMwfQ.kI1d824Gwn-z-cb853BQRqxY75si6dwav3O5xQF-j20';

const headers = {
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
};

async function testInsertAndCleanup() {
    console.log('🔍 Testing leads table...\n');

    // Try inserting a test lead
    const testLead = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+919876543210',
        message: 'Test message from setup script',
        source: 'contact',
        status: 'new',
    };

    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: { ...headers, 'Prefer': 'return=representation' },
        body: JSON.stringify(testLead),
    });

    if (insertRes.ok) {
        const [inserted] = await insertRes.json();
        console.log('✅ Insert successful! Lead ID:', inserted.id);
        console.log('   Columns present:', Object.keys(inserted).join(', '));

        // Check for missing columns
        const expected = ['id', 'created_at', 'name', 'email', 'phone', 'message', 'source', 'status', 'page_url', 'notes', 'referred_name', 'referred_phone', 'referred_email', 'metadata'];
        const missing = expected.filter(col => !(col in inserted));
        if (missing.length > 0) {
            console.log('\n⚠️  Missing columns:', missing.join(', '));
            console.log('   You need to add these via the Supabase SQL Editor.');
        } else {
            console.log('\n✅ All expected columns are present!');
        }

        // Clean up test lead
        const deleteRes = await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${inserted.id}`, {
            method: 'DELETE',
            headers,
        });

        if (deleteRes.ok) {
            console.log('🧹 Test lead cleaned up.');
        }
    } else {
        const err = await insertRes.json();
        console.log('❌ Insert failed:', err.message || JSON.stringify(err));

        if (err.message?.includes('source') || err.message?.includes('status')) {
            console.log('\n💡 The table exists but is missing required columns.');
            console.log('   Please run the SQL schema in Supabase SQL Editor.');
        }
    }

    // Test reading leads
    const readRes = await fetch(`${SUPABASE_URL}/rest/v1/leads?limit=5&order=created_at.desc`, {
        headers,
    });

    if (readRes.ok) {
        const leads = await readRes.json();
        console.log(`\n📊 Current leads count: ${leads.length}`);
    }

    console.log('\n🎉 Setup check complete!');
}

testInsertAndCleanup().catch(console.error);
