-- Create a test user in the users table
INSERT INTO public.users (id, username, profile) 
VALUES (1, 'admin', 'admin')
ON CONFLICT (id) DO UPDATE SET 
  username = EXCLUDED.username,
  profile = EXCLUDED.profile;