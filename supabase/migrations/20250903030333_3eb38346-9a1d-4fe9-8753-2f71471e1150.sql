-- Create quiz_questions table for storing weekly quiz questions
CREATE TABLE public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL CHECK (section IN ('Science', 'General Knowledge', 'IQ')),
  question TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  week_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz_attempts table for storing user quiz attempts
CREATE TABLE public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.club_members(id),
  section TEXT NOT NULL CHECK (section IN ('Science', 'General Knowledge', 'IQ')),
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  score DECIMAL(5,2) NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  wrong_answers INTEGER NOT NULL DEFAULT 0,
  week_id INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, section, week_id)
);

-- Enable RLS
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- RLS policies for quiz_questions
CREATE POLICY "Users can view current week questions" 
ON public.quiz_questions 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage quiz questions" 
ON public.quiz_questions 
FOR ALL 
USING (true);

-- RLS policies for quiz_attempts
CREATE POLICY "Users can view their own attempts" 
ON public.quiz_attempts 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.club_members 
    WHERE id = quiz_attempts.user_id 
    AND id = auth.uid()
  )
);

CREATE POLICY "Users can insert their own attempts" 
ON public.quiz_attempts 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.club_members 
    WHERE id = quiz_attempts.user_id 
    AND id = auth.uid()
  )
);

CREATE POLICY "Admins can manage all attempts" 
ON public.quiz_attempts 
FOR ALL 
USING (true);

-- Function to get current week ID (1-4 for weeks in a month)
CREATE OR REPLACE FUNCTION public.get_current_week_id()
RETURNS INTEGER AS $$
BEGIN
  RETURN CEIL(EXTRACT(DAY FROM CURRENT_DATE)::DECIMAL / 7);
END;
$$ LANGUAGE plpgsql;

-- Function to calculate leaderboard
CREATE OR REPLACE FUNCTION public.get_leaderboard()
RETURNS TABLE (
  user_id UUID,
  full_name TEXT,
  avatar_url TEXT,
  total_score DECIMAL,
  rank_position BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cm.id as user_id,
    cm.full_name,
    cm.avatar_url,
    COALESCE(SUM(qa.score), 0) as total_score,
    ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(qa.score), 0) DESC) as rank_position
  FROM public.club_members cm
  LEFT JOIN public.quiz_attempts qa ON cm.id = qa.user_id 
    AND EXTRACT(MONTH FROM qa.created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
    AND EXTRACT(YEAR FROM qa.created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
  GROUP BY cm.id, cm.full_name, cm.avatar_url
  ORDER BY total_score DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;