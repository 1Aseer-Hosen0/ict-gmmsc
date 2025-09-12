import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Award, TrendingUp } from 'lucide-react';
import { Question } from '@/hooks/useQuiz';

interface QuizResultsProps {
  results: {
    score: number;
    correctAnswers: number;
    wrongAnswers: number;
    totalQuestions: number;
    answers: Array<{ 
      question_id: string;
      user_answer: string; 
      correct_answer: string;
      is_correct: boolean;
    }>;
  };
  questions: Question[];
  onBackToSections: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ results, questions, onBackToSections }) => {
  const percentage = (results.correctAnswers / results.totalQuestions) * 100;
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (percentage >= 50) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const gradeInfo = getGrade();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${gradeInfo.bg}`}>
              <Award className={`h-8 w-8 ${gradeInfo.color}`} />
            </div>
          </div>
          <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
          <div className="space-y-2">
            <div className={`inline-flex px-4 py-2 rounded-full text-2xl font-bold ${gradeInfo.bg} ${gradeInfo.color}`}>
              {gradeInfo.grade}
            </div>
            <p className="text-muted-foreground">
              You scored {results.score.toFixed(2)} points ({percentage.toFixed(0)}%)
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{results.score.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Total Score</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-600">{results.correctAnswers}</div>
            <p className="text-sm text-muted-foreground">Correct</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <XCircle className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <div className="text-2xl font-bold text-red-600">{results.wrongAnswers}</div>
            <p className="text-sm text-muted-foreground">Incorrect</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold">{percentage.toFixed(0)}%</div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle>Question by Question Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.map((question, index) => {
            const result = results.answers[index];
            const isCorrect = result?.is_correct;
            
            return (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-1" />
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Q{index + 1}:</span>
                      <Badge variant={isCorrect ? "default" : "destructive"}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </Badge>
                    </div>
                    
                    <p className="text-sm">{question.question}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">Your Answer:</span>
                        <p className={`p-2 rounded mt-1 ${
                          isCorrect ? 'bg-green-50' : 'bg-red-50'
                        }`}>
                          {result?.user_answer || 'No answer provided'}
                        </p>
                      </div>
                      
                      {isCorrect && (
                        <div>
                          <span className="font-medium text-green-600">✓ Correct!</span>
                        </div>
                      )}
                      
                      {!isCorrect && (
                        <div>
                          <span className="font-medium text-red-600">✗ Incorrect</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="text-center">
        <Button onClick={onBackToSections} size="lg">
          Back to Quiz Sections
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;