# LawFirm AI – Next.js + Supabase

An AI-powered law firm management platform built with **Next.js 16** (App Router, TypeScript, Tailwind CSS v4) and **Supabase** (database + auth).

---

## Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Framework   | Next.js 16 (App Router)       |
| Language    | TypeScript                    |
| Styling     | Tailwind CSS v4               |
| Database    | Supabase (PostgreSQL)         |
| Auth        | Supabase Auth                 |

---

## Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd lawfirmwebappAI
npm install
```

### 2. Configure Supabase

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your values from the
[Supabase dashboard](https://app.supabase.com) → **Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server-side only!
```

### 3. Run the Dev Server

```bash
npm run dev
# Open http://localhost:3000
```

---

## Project Structure

```
src/
├── app/
│   ├── dashboard/        # Protected dashboard page (Server Component)
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Public landing page
├── lib/
│   └── supabase/
│       ├── client.ts     # Browser client (createBrowserClient)
│       ├── server.ts     # Server client (createServerClient + cookies)
│       └── middleware.ts # Session refresh helper
└── middleware.ts          # Edge middleware – session refresh + route protection
```

---

## Key Patterns

- **Server Components** – use `src/lib/supabase/server.ts` to create an authenticated Supabase client.
- **Client Components** – use `src/lib/supabase/client.ts`.
- **Route Protection** – middleware auto-redirects unauthenticated users on `/dashboard/**` to `/login`.
- **Session Refresh** – `updateSession()` in middleware keeps Supabase cookies fresh on every request.

---

## Scripts

| Script        | Description                   |
|---------------|-------------------------------|
| `npm run dev` | Start development server      |
| `npm run build` | Production build            |
| `npm run start` | Start production server     |
| `npm run lint` | Run ESLint                   |

<!-- ================================= -->
  <!-- ----------SQL QUERY ---------- -->
<!-- ===================================== -->
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT DEFAULT '',
  last_name TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  country TEXT DEFAULT '',
  city TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

INSERT INTO public.profiles (id, first_name, last_name)
SELECT id,
  COALESCE(raw_user_meta_data->>'first_name', '') AS first_name,
  COALESCE(raw_user_meta_data->>'last_name', '') AS last_name
FROM auth.users
ON CONFLICT (id) DO NOTHING;

<!-- ============================= -->
-- Create pages table
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content_html TEXT DEFAULT '',
  image_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Public view policy
CREATE POLICY "Pages are publicly viewable" ON public.pages FOR SELECT USING (true);

-- Admin only edit policy
CREATE POLICY "Admins can manage pages" ON public.pages 
  FOR ALL USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- Insert initial page slugs
INSERT INTO public.pages (slug, title, content_html) VALUES 
('immigration-law', 'Immigration Law', '<h1>Immigration Law</h1><p>Content coming soon...</p>'),
('tax-law', 'Tax Law', '<h1>Tax Law</h1><p>Content coming soon...</p>'),
('business-law', 'Business Law', '<h1>Business Law</h1><p>Content coming soon...</p>'),
('legal-consultation', 'Legal Consultation', '<h1>Legal Consultation</h1><p>Content coming soon...</p>'),
('about-us', 'About Us', '<h1>About Us</h1><p>Content coming soon...</p>'),
('how-it-works', 'How It Works', '<h1>How It Works</h1><p>Content coming soon...</p>'),
('privacy-policy', 'Privacy Policy', '<h1>Privacy Policy</h1><p>Content coming soon...</p>'),
('terms-of-service', 'Terms of Service', '<h1>Terms of Service</h1><p>Content coming soon...</p>')
ON CONFLICT (slug) DO NOTHING;

<!-- ============================================ -->