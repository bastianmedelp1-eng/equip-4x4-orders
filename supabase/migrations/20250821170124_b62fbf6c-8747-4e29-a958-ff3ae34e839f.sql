-- Create a test user in the users table (let id auto-generate)
INSERT INTO public.users (username, profile) 
VALUES ('admin', 'admin')
ON CONFLICT (username) DO NOTHING;