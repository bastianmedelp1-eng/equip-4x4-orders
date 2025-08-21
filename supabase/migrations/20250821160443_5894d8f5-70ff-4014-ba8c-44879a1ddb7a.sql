-- First, let's fix the RLS policies and create a proper schema

-- Drop the existing ineffective policies
DROP POLICY IF EXISTS "Only authenticated users can view users" ON public.users;
DROP POLICY IF EXISTS "Only authenticated users can update users" ON public.users;
DROP POLICY IF EXISTS "Only authenticated users can insert users" ON public.users;
DROP POLICY IF EXISTS "Only authenticated users can delete users" ON public.users;
DROP POLICY IF EXISTS "Only authenticated users can view permissions" ON public.user_module_permissions;
DROP POLICY IF EXISTS "Only authenticated users can manage permissions" ON public.user_module_permissions;
DROP POLICY IF EXISTS "Only authenticated users can view modules" ON public.modules;
DROP POLICY IF EXISTS "Only authenticated users can manage modules" ON public.modules;

-- Create profiles table to link Supabase auth to existing users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create function to get current user's internal ID
CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS BIGINT
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT p.user_id 
  FROM public.profiles p 
  WHERE p.auth_user_id = auth.uid()
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.profiles p 
    JOIN public.users u ON p.user_id = u.id 
    WHERE p.auth_user_id = auth.uid() 
    AND u.profile = 'admin'
  )
$$;

-- Create tables for orders, expenses, tools, and calendar events
CREATE TABLE IF NOT EXISTS public.orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('cupula', 'rack', 'special')),
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'programmed', 'in_progress', 'installed', 'delivered', 'closed')),
  client_name TEXT NOT NULL,
  client_rut TEXT,
  seller_id BIGINT REFERENCES public.users(id),
  delivery_date DATE,
  observations TEXT,
  accessories JSONB DEFAULT '[]',
  details JSONB DEFAULT '{}',
  created_by BIGINT REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.expenses (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_by BIGINT REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.tools (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'in_use', 'maintenance', 'retired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.calendar_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  event_type TEXT NOT NULL CHECK (event_type IN ('order', 'maintenance', 'meeting', 'other')),
  order_id BIGINT REFERENCES public.orders(id) ON DELETE CASCADE,
  created_by BIGINT REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- Create proper RLS policies

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth_user_id = auth.uid());

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth_user_id = auth.uid());

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth_user_id = auth.uid());

-- Users policies
CREATE POLICY "Users can view their own user record"
ON public.users
FOR SELECT
TO authenticated
USING (id = public.get_current_user_id() OR public.is_admin());

CREATE POLICY "Admins can manage users"
ON public.users
FOR ALL
TO authenticated
USING (public.is_admin());

-- User module permissions policies
CREATE POLICY "Users can view their own permissions"
ON public.user_module_permissions
FOR SELECT
TO authenticated
USING (user_id = public.get_current_user_id() OR public.is_admin());

CREATE POLICY "Admins can manage permissions"
ON public.user_module_permissions
FOR ALL
TO authenticated
USING (public.is_admin());

-- Modules policies (all authenticated users can view)
CREATE POLICY "Authenticated users can view modules"
ON public.modules
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage modules"
ON public.modules
FOR ALL
TO authenticated
USING (public.is_admin());

-- Orders policies
CREATE POLICY "Users can view orders"
ON public.orders
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can create orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (created_by = public.get_current_user_id());

CREATE POLICY "Users can update orders they created or admins can update all"
ON public.orders
FOR UPDATE
TO authenticated
USING (created_by = public.get_current_user_id() OR public.is_admin());

CREATE POLICY "Admins can delete orders"
ON public.orders
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Expenses policies
CREATE POLICY "Users can view expenses"
ON public.expenses
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can create expenses"
ON public.expenses
FOR INSERT
TO authenticated
WITH CHECK (created_by = public.get_current_user_id());

CREATE POLICY "Users can update expenses they created or admins can update all"
ON public.expenses
FOR UPDATE
TO authenticated
USING (created_by = public.get_current_user_id() OR public.is_admin());

CREATE POLICY "Admins can delete expenses"
ON public.expenses
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Tools policies
CREATE POLICY "Users can view tools"
ON public.tools
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage tools"
ON public.tools
FOR ALL
TO authenticated
USING (public.is_admin());

-- Calendar events policies
CREATE POLICY "Users can view calendar events"
ON public.calendar_events
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can create calendar events"
ON public.calendar_events
FOR INSERT
TO authenticated
WITH CHECK (created_by = public.get_current_user_id());

CREATE POLICY "Users can update calendar events they created or admins can update all"
ON public.calendar_events
FOR UPDATE
TO authenticated
USING (created_by = public.get_current_user_id() OR public.is_admin());

CREATE POLICY "Users can delete calendar events they created or admins can delete all"
ON public.calendar_events
FOR DELETE
TO authenticated
USING (created_by = public.get_current_user_id() OR public.is_admin());

-- Create triggers for updated_at columns
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at
  BEFORE UPDATE ON public.expenses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tools_updated_at
  BEFORE UPDATE ON public.tools
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at
  BEFORE UPDATE ON public.calendar_events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO public.orders (type, status, client_name, client_rut, observations, created_by) VALUES
('cupula', 'created', 'Empresa ABC', '12345678-9', 'Orden de prueba', 1),
('rack', 'programmed', 'Cliente XYZ', '98765432-1', 'Rack de servidor', 1),
('special', 'in_progress', 'Corporación DEF', '11223344-5', 'Pedido especial urgente', 1);

INSERT INTO public.expenses (category, description, amount, created_by) VALUES
('Material', 'Compra de acero inoxidable', 150000.00, 1),
('Transporte', 'Flete para entrega', 25000.00, 1),
('Herramientas', 'Taladro industrial', 89000.00, 1);

INSERT INTO public.tools (code, name, stock) VALUES
('T001', 'Taladro Bosch', 5),
('T002', 'Sierra Circular', 3),
('T003', 'Soldadora MIG', 2);

INSERT INTO public.calendar_events (title, description, start_date, event_type, created_by) VALUES
('Instalación Cupula ABC', 'Instalación en cliente ABC', '2024-01-15 09:00:00+00', 'order', 1),
('Mantenimiento Equipos', 'Revisión preventiva', '2024-01-16 14:00:00+00', 'maintenance', 1),
('Reunión Ventas', 'Planificación mensual', '2024-01-17 10:00:00+00', 'meeting', 1);