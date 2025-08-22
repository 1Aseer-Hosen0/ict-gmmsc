import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { hash } from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerifyOtpRequest {
  email: string;
  otpCode: string;
  newPassword: string;
  userId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, otpCode, newPassword, userId }: VerifyOtpRequest = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Verify OTP
    const { data: otpData, error: otpError } = await supabaseClient
      .from('password_reset_otps')
      .select('*')
      .eq('user_id', userId)
      .eq('email', email)
      .eq('otp_code', otpCode)
      .eq('used', false)
      .gte('expires_at', new Date().toISOString())
      .single();

    if (otpError || !otpData) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired OTP' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Hash new password
    const saltRounds = 10;
    const newPasswordHash = await hash(newPassword, saltRounds);

    // Update password in database
    const { error: updateError } = await supabaseClient
      .from('club_members')
      .update({ password_hash: newPasswordHash })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating password:', updateError);
      throw updateError;
    }

    // Mark OTP as used
    await supabaseClient
      .from('password_reset_otps')
      .update({ used: true })
      .eq('id', otpData.id);

    return new Response(
      JSON.stringify({ success: true, message: 'Password updated successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in verify-otp-reset function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);