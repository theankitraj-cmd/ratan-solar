# Ratan Solar Admin Panel ☀️

The official admin dashboard and website for Ratan Solar (Tesla Power USA), built with Next.js, Tailwind CSS, and Supabase.

## Features

- **Lead Management**: Track and manage customer inquiries.
- **Billing System**: Create professional PDF invoices with UPI QR codes and barcodes.
- **Admin Dashboard**: Real-time stats and analytics.
- **Public Website**: Modern, responsive landing page with solar calculator.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_api_key
ADMIN_PASSWORD=ratan2026
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Database Migration ⚠️

The system requires the `invoices` table to function.
**Run the SQL commands in [MIGRATION.md](./MIGRATION.md) in your Supabase SQL Editor.**

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Credentials

- **Admin Login**: `ratan2026`

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **PDF Generation**: html2canvas + jsPDF
- **Icons**: Lucide React
