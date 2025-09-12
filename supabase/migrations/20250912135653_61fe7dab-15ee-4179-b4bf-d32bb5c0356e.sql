-- Drop existing quiz_questions table and create new structure
DROP TABLE IF EXISTS public.quiz_questions CASCADE;

-- Create new quiz_questions table with better structure
CREATE TABLE public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('Science', 'General Knowledge', 'IQ')),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

-- Create policies for quiz questions
CREATE POLICY "Users can view quiz questions" 
ON public.quiz_questions 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage quiz questions" 
ON public.quiz_questions 
FOR ALL 
USING (true);

-- Update quiz_attempts table to remove week_id dependency
ALTER TABLE public.quiz_attempts 
DROP COLUMN IF EXISTS week_id;

-- Insert sample questions for each category
INSERT INTO public.quiz_questions (category, question, answer) VALUES
-- Science questions
('Science', 'What is the chemical symbol for gold?', 'Au'),
('Science', 'What planet is known as the Red Planet?', 'Mars'),
('Science', 'What is the speed of light in vacuum (in km/s)?', '299792458'),
('Science', 'What gas makes up approximately 78% of Earth''s atmosphere?', 'Nitrogen'),
('Science', 'What is the smallest unit of matter?', 'Atom'),
('Science', 'What type of animal is a whale?', 'Mammal'),
('Science', 'What is the hardest natural substance on Earth?', 'Diamond'),
('Science', 'How many chambers does a human heart have?', '4'),
('Science', 'What is the study of earthquakes called?', 'Seismology'),
('Science', 'What is the chemical formula for water?', 'H2O'),
('Science', 'Which blood type is known as the universal donor?', 'O negative'),
('Science', 'What is the largest organ in the human body?', 'Skin'),
('Science', 'What gas do plants absorb from the atmosphere during photosynthesis?', 'Carbon dioxide'),
('Science', 'What is the center of an atom called?', 'Nucleus'),
('Science', 'What force keeps planets in orbit around the sun?', 'Gravity'),

-- General Knowledge questions
('General Knowledge', 'What is the capital of France?', 'Paris'),
('General Knowledge', 'Who wrote Romeo and Juliet?', 'William Shakespeare'),
('General Knowledge', 'What is the largest ocean on Earth?', 'Pacific Ocean'),
('General Knowledge', 'In which year did World War II end?', '1945'),
('General Knowledge', 'What is the smallest country in the world?', 'Vatican City'),
('General Knowledge', 'Who painted the Mona Lisa?', 'Leonardo da Vinci'),
('General Knowledge', 'What is the longest river in the world?', 'Nile River'),
('General Knowledge', 'How many continents are there?', '7'),
('General Knowledge', 'What currency is used in Japan?', 'Yen'),
('General Knowledge', 'Which mountain range contains Mount Everest?', 'Himalayas'),
('General Knowledge', 'What is the largest mammal in the world?', 'Blue whale'),
('General Knowledge', 'In which country would you find Machu Picchu?', 'Peru'),
('General Knowledge', 'What is the capital of Australia?', 'Canberra'),
('General Knowledge', 'Who invented the telephone?', 'Alexander Graham Bell'),
('General Knowledge', 'What is the most spoken language in the world?', 'Mandarin Chinese'),

-- IQ questions
('IQ', 'What comes next in the sequence: 2, 4, 8, 16, ?', '32'),
('IQ', 'If all roses are flowers and some flowers fade quickly, can we conclude that some roses fade quickly?', 'No'),
('IQ', 'What is 15% of 200?', '30'),
('IQ', 'If a train travels 60 km in 45 minutes, what is its speed in km/h?', '80'),
('IQ', 'Complete the analogy: Book is to Reading as Fork is to ?', 'Eating'),
('IQ', 'What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ?', '13'),
('IQ', 'If you rearrange the letters "CIFAIPC", you would have the name of a(n)?', 'Ocean'),
('IQ', 'What is 7 × 8 + 12 ÷ 4?', '59'),
('IQ', 'How many triangles are in a pentagram (5-pointed star)?', '35'),
('IQ', 'If today is Monday, what day will it be 100 days from now?', 'Wednesday'),
('IQ', 'What is the missing number: 3, 7, 15, 31, ?', '63'),
('IQ', 'If A = 1, B = 2, C = 3, what does CAB equal?', '312'),
('IQ', 'Complete the pattern: O, T, T, F, F, S, S, E, ?', 'N'),
('IQ', 'What is 2^10?', '1024'),
('IQ', 'If you have 12 balls and one is heavier, what is the minimum number of weighings needed to find it?', '3');