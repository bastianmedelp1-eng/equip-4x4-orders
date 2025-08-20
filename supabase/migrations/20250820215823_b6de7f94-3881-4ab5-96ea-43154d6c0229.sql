-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_module_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;

-- Create policies for users table (restrict to authenticated users only)
CREATE POLICY "Only authenticated users can view users" 
ON public.users 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Only authenticated users can update users" 
ON public.users 
FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Only authenticated users can insert users" 
ON public.users 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete users" 
ON public.users 
FOR DELETE 
TO authenticated 
USING (true);

-- Create policies for user_module_permissions table (restrict to authenticated users only)
CREATE POLICY "Only authenticated users can view permissions" 
ON public.user_module_permissions 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Only authenticated users can manage permissions" 
ON public.user_module_permissions 
FOR ALL 
TO authenticated 
USING (true);

-- Create policies for modules table (restrict to authenticated users only)
CREATE POLICY "Only authenticated users can view modules" 
ON public.modules 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Only authenticated users can manage modules" 
ON public.modules 
FOR ALL 
TO authenticated 
USING (true);