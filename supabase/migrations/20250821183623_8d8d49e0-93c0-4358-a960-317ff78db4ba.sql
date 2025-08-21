-- Insert user directly into auth.users table
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@admin.com',
  crypt('123456', gen_salt('bf')),
  NOW(),
  NULL,
  NULL,
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Create profile for the admin user
INSERT INTO public.profiles (auth_user_id, user_id)
SELECT 
  u.id as auth_user_id,
  (SELECT id FROM public.users WHERE username = 'admin' LIMIT 1) as user_id
FROM auth.users u 
WHERE u.email = 'admin@admin.com' 
AND NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.auth_user_id = u.id
);