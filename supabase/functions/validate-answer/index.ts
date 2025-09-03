import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, correctAnswer, userAnswer } = await req.json();

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

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
            content: `You are a quiz answer validator. You will receive a question, the correct answer, and a user's answer. 
            Your job is to determine if the user's answer is correct or close enough to be considered correct.
            Consider variations in spelling, synonyms, and different ways of expressing the same concept.
            Respond with ONLY "CORRECT" or "INCORRECT" - no other text.`
          },
          {
            role: 'user',
            content: `Question: ${question}
            Correct Answer: ${correctAnswer}
            User Answer: ${userAnswer}`
          }
        ],
        max_tokens: 10,
        temperature: 0.1,
      }),
    });

    const data = await response.json();
    const result = data.choices[0].message.content.trim();

    return new Response(JSON.stringify({ 
      isCorrect: result === "CORRECT",
      aiResponse: result 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error validating answer:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});