-- ================================================
-- Step 1: Create profiles table
-- ================================================
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

-- ================================================
-- Step 2: Enable Row Level Security (RLS)
-- ================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ================================================
-- Step 3: RLS Policies
-- ================================================
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ================================================
-- Step 4: Auto-create profile row on new signup
-- ================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ================================================
-- Step 5: Backfill existing users (run once)
-- ================================================
INSERT INTO public.profiles (id, first_name, last_name)
SELECT
  id,
  COALESCE(raw_user_meta_data->>'first_name', '') AS first_name,
  COALESCE(raw_user_meta_data->>'last_name', '') AS last_name
FROM auth.users
ON CONFLICT (id) DO NOTHING;
