-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_module_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user has admin role
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid()::bigint 
    AND profile = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Policies for users table
CREATE POLICY "Users can view their own profile" 
ON public.users 
FOR SELECT 
USING (id = auth.uid()::bigint);

CREATE POLICY "Users can update their own profile" 
ON public.users 
FOR UPDATE 
USING (id = auth.uid()::bigint);

CREATE POLICY "Admins can view all users" 
ON public.users 
FOR SELECT 
USING (public.is_admin_user());

CREATE POLICY "Admins can insert users" 
ON public.users 
FOR INSERT 
WITH CHECK (public.is_admin_user());

-- Policies for user_module_permissions table
CREATE POLICY "Users can view their own permissions" 
ON public.user_module_permissions 
FOR SELECT 
USING (user_id = auth.uid()::bigint);

CREATE POLICY "Admins can view all permissions" 
ON public.user_module_permissions 
FOR SELECT 
USING (public.is_admin_user());

CREATE POLICY "Admins can manage all permissions" 
ON public.user_module_permissions 
FOR ALL 
USING (public.is_admin_user());

-- Policies for modules table
CREATE POLICY "Authenticated users can view modules" 
ON public.modules 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Admins can manage modules" 
ON public.modules 
FOR ALL 
USING (public.is_admin_user());