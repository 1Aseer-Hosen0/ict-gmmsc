-- Add password column to club_members table
ALTER TABLE public.club_members 
ADD COLUMN password_hash TEXT NOT NULL DEFAULT '';

-- Add unique constraint for email
ALTER TABLE public.club_members 
ADD CONSTRAINT unique_email UNIQUE (email);