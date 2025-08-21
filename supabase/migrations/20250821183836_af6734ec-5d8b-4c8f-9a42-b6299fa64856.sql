-- Update the user to confirm their email  
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'admin@admin.com';