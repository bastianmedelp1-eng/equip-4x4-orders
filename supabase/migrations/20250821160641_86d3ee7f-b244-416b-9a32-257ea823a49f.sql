-- Create all missing tables first

-- Create orders table
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

-- Create expenses table  
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

-- Create tools table
CREATE TABLE IF NOT EXISTS public.tools (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'in_use', 'maintenance', 'retired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create calendar_events table
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

-- Enable RLS on all tables
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for orders
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

-- Create RLS policies for expenses
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

-- Create RLS policies for tools
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

-- Create RLS policies for calendar_events
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