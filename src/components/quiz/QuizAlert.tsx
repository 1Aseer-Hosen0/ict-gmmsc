import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Clock, AlertTriangle } from 'lucide-react';

interface QuizAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  section: string | null;
}

const QuizAlert: React.FC<QuizAlertProps> = ({ open, onOpenChange, onConfirm, section }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="text-amber-500" size={20} />
            Start {section} Quiz?
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3 text-left">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Once you start, your 15-minute countdown will begin immediately.</span>
            </div>
            
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h4 className="font-medium">Quiz Rules:</h4>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>10 single-answer questions</li>
                <li>15 minutes time limit</li>
                <li>+1 point for correct answers</li>
                <li>-0.25 points for wrong answers</li>
                <li>Can only be attempted once per week</li>
                <li>Auto-submits if you switch tabs or time runs out</li>
              </ul>
            </div>
            
            <p className="text-amber-600 font-medium">
              Are you ready to begin? Make sure you have a stable internet connection.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Start Quiz
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuizAlert;