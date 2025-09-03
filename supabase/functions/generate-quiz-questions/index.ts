import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { section, weekId } = await req.json();

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!openAIApiKey || !supabaseUrl || !supabaseKey) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const sectionPrompts = {
      'Science': 'Generate 10 science questions covering physics, chemistry, biology, earth science, and space science. Questions should be factual and have specific answers.',
      'General Knowledge': 'Generate 10 general knowledge questions covering history, geography, current events, sports, arts, and culture. Questions should be factual and have specific answers.',
      'IQ': 'Generate 10 IQ-type questions involving logical reasoning, pattern recognition, mathematical sequences, and problem-solving. Questions should test analytical thinking.'
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a quiz question generator. Generate exactly 10 questions for the ${section} category.
            Return the response as a JSON array with this exact format:
            [
              {
                "question": "What is the chemical symbol for gold?",
                "correct_answer": "Au"
              }
            ]
            Make sure questions are varied, engaging, and at an appropriate difficulty level. Each question should have a specific, factual answer.
            ONLY return the JSON array, no other text.`
          },
          {
            role: 'user',
            content: sectionPrompts[section as keyof typeof sectionPrompts]
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const questionsText = data.choices[0].message.content.trim();
    
    let questions;
    try {
      questions = JSON.parse(questionsText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', questionsText);
      throw new Error('Failed to parse AI response');
    }

    // Insert questions into database
    const questionsToInsert = questions.map((q: any) => ({
      section,
      question: q.question,
      correct_answer: q.correct_answer,
      week_id: weekId
    }));

    const { data: insertedQuestions, error } = await supabase
      .from('quiz_questions')
      .insert(questionsToInsert)
      .select();

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ 
      questions: insertedQuestions,
      count: insertedQuestions.length 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating questions:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});