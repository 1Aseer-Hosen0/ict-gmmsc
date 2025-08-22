import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Lock, Mail, ArrowLeft } from 'lucide-react';
import bcryptjs from 'bcryptjs';

interface PasswordResetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
  userId: string;
}

type Step = 'choice' | 'current-password' | 'email-otp';

const PasswordResetModal = ({ open, onOpenChange, userEmail, userId }: PasswordResetModalProps) => {
  const [step, setStep] = useState<Step>('choice');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Form states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPasswordOtp, setNewPasswordOtp] = useState('');

  const resetForm = () => {
    setStep('choice');
    setCurrentPassword('');
    setNewPassword('');
    setOtpCode('');
    setNewPasswordOtp('');
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleCurrentPasswordReset = async () => {
    if (!currentPassword || !newPassword) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    if (newPassword.length < 6) {
      toast({ title: 'New password must be at least 6 characters', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      // Get current password hash from database
      const { data: userData, error: fetchError } = await supabase
        .from('club_members')
        .select('password_hash')
        .eq('id', userId)
        .single();

      if (fetchError) throw fetchError;

      // Verify current password
      const isValidPassword = await bcryptjs.compare(currentPassword, userData.password_hash);
      
      if (!isValidPassword) {
        toast({ title: 'Incorrect current password', variant: 'destructive' });
        return;
      }

      // Hash new password
      const saltRounds = 10;
      const newPasswordHash = await bcryptjs.hash(newPassword, saltRounds);

      // Update password in database
      const { error: updateError } = await supabase
        .from('club_members')
        .update({ password_hash: newPasswordHash })
        .eq('id', userId);

      if (updateError) throw updateError;

      toast({ title: 'Password updated successfully' });
      handleClose();
    } catch (error) {
      console.error('Password reset error:', error);
      toast({ title: 'Failed to update password', description: 'Please try again', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailOtpSend = async () => {
    setLoading(true);
    try {
      // Call edge function to send OTP
      const { error } = await supabase.functions.invoke('send-otp', {
        body: { email: userEmail, userId }
      });

      if (error) throw error;

      toast({ title: 'OTP sent to your email', description: 'Please check your inbox' });
      setStep('email-otp');
    } catch (error) {
      console.error('OTP send error:', error);
      toast({ title: 'Failed to send OTP', description: 'Please try again', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpPasswordReset = async () => {
    if (!otpCode || !newPasswordOtp) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    if (newPasswordOtp.length < 6) {
      toast({ title: 'New password must be at least 6 characters', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      // Verify OTP and update password
      const { error } = await supabase.functions.invoke('verify-otp-reset', {
        body: { 
          email: userEmail, 
          otpCode, 
          newPassword: newPasswordOtp,
          userId 
        }
      });

      if (error) throw error;

      toast({ title: 'Password updated successfully' });
      handleClose();
    } catch (error) {
      console.error('OTP verification error:', error);
      toast({ title: 'Invalid or expired OTP', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const renderChoice = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <p className="text-sm text-muted-foreground mb-6">
        Choose how you'd like to reset your password:
      </p>
      
      <Button
        onClick={() => setStep('current-password')}
        className="w-full justify-start gap-3 h-12"
        variant="outline"
      >
        <Lock className="h-4 w-4" />
        From Current Password
      </Button>
      
      <Button
        onClick={handleEmailOtpSend}
        disabled={loading}
        className="w-full justify-start gap-3 h-12"
        variant="outline"
      >
        <Mail className="h-4 w-4" />
        {loading ? 'Sending OTP...' : 'From Email Address'}
      </Button>
    </motion.div>
  );

  const renderCurrentPassword = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <Button
        onClick={() => setStep('choice')}
        variant="ghost"
        size="sm"
        className="mb-2 p-0 h-auto"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="current-password">Current Password</Label>
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter your current password"
          />
        </div>
        
        <div>
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
          />
        </div>
        
        <Button
          onClick={handleCurrentPasswordReset}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </div>
    </motion.div>
  );

  const renderEmailOtp = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <Button
        onClick={() => setStep('choice')}
        variant="ghost"
        size="sm"
        className="mb-2 p-0 h-auto"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <p className="text-sm text-muted-foreground mb-4">
        We've sent a 6-digit code to {userEmail}. Enter it below along with your new password.
      </p>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="otp-code">6-Digit Code</Label>
          <Input
            id="otp-code"
            type="text"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="123456"
            maxLength={6}
          />
        </div>
        
        <div>
          <Label htmlFor="new-password-otp">New Password</Label>
          <Input
            id="new-password-otp"
            type="password"
            value={newPasswordOtp}
            onChange={(e) => setNewPasswordOtp(e.target.value)}
            placeholder="Enter your new password"
          />
        </div>
        
        <Button
          onClick={handleOtpPasswordReset}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </div>
    </motion.div>
  );

  const getTitle = () => {
    switch (step) {
      case 'current-password':
        return 'Reset Password from Current Password';
      case 'email-otp':
        return 'Verify with Email';
      default:
        return 'Change Password';
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        
        <AnimatePresence mode="wait">
          {step === 'choice' && renderChoice()}
          {step === 'current-password' && renderCurrentPassword()}
          {step === 'email-otp' && renderEmailOtp()}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordResetModal;