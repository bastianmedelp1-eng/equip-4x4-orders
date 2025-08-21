-- Fix the sample data issue by creating users first

-- Insert sample users
INSERT INTO public.users (id, username, profile) VALUES
(1, 'admin', 'admin'),
(2, 'vendedor1', 'ventas'),
(3, 'tecnico1', 'taller')
ON CONFLICT (id) DO NOTHING;

-- Insert some sample modules
INSERT INTO public.modules (id, name, icon_path, description) VALUES
(1, 'Órdenes', '/icons/orders.svg', 'Gestión de órdenes de trabajo'),
(2, 'Gastos', '/icons/expenses.svg', 'Control de gastos y finanzas'),
(3, 'Herramientas', '/icons/tools.svg', 'Inventario de herramientas'),
(4, 'Calendario', '/icons/calendar.svg', 'Agenda y programación'),
(5, 'Usuarios', '/icons/users.svg', 'Gestión de usuarios y permisos')
ON CONFLICT (id) DO NOTHING;

-- Insert sample permissions
INSERT INTO public.user_module_permissions (user_id, module_id, can_view, can_edit) VALUES
(1, 1, true, true), -- Admin can view/edit orders
(1, 2, true, true), -- Admin can view/edit expenses
(1, 3, true, true), -- Admin can view/edit tools
(1, 4, true, true), -- Admin can view/edit calendar
(1, 5, true, true), -- Admin can view/edit users
(2, 1, true, true), -- Sales can view/edit orders
(2, 2, true, false), -- Sales can view expenses
(2, 4, true, true), -- Sales can view/edit calendar
(3, 1, true, false), -- Tech can view orders
(3, 3, true, true), -- Tech can view/edit tools
(3, 4, true, false) -- Tech can view calendar
ON CONFLICT (user_id, module_id) DO NOTHING;

-- Now insert the sample data for other tables
INSERT INTO public.orders (type, status, client_name, client_rut, observations, created_by) VALUES
('cupula', 'created', 'Empresa ABC', '12345678-9', 'Orden de prueba', 1),
('rack', 'programmed', 'Cliente XYZ', '98765432-1', 'Rack de servidor', 1),
('special', 'in_progress', 'Corporación DEF', '11223344-5', 'Pedido especial urgente', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.expenses (category, description, amount, created_by) VALUES
('Material', 'Compra de acero inoxidable', 150000.00, 1),
('Transporte', 'Flete para entrega', 25000.00, 1),
('Herramientas', 'Taladro industrial', 89000.00, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.tools (code, name, stock) VALUES
('T001', 'Taladro Bosch', 5),
('T002', 'Sierra Circular', 3),
('T003', 'Soldadora MIG', 2)
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.calendar_events (title, description, start_date, event_type, created_by) VALUES
('Instalación Cupula ABC', 'Instalación en cliente ABC', '2024-01-15 09:00:00+00', 'order', 1),
('Mantenimiento Equipos', 'Revisión preventiva', '2024-01-16 14:00:00+00', 'maintenance', 1),
('Reunión Ventas', 'Planificación mensual', '2024-01-17 10:00:00+00', 'meeting', 1)
ON CONFLICT DO NOTHING;