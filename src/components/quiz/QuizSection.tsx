import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Clock, Send } from 'lucide-react';
import { useQuiz } from '@/hooks/useQuiz';

interface QuizSectionProps {
  quiz: ReturnType<typeof useQuiz>;
  formatTime: (seconds: number) => string;
  onSubmit: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ quiz, formatTime, onSubmit }) => {
  const currentQuestion = quiz.questions[quiz.currentQuestionIndex];
  const progress = ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;

  if (!currentQuestion) {
    return <div className="text-center">Loading questions...</div>;
  }

  return (
    <div 
      className="max-w-4xl mx-auto space-y-6"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Badge variant="outline">
                Question {quiz.currentQuestionIndex + 1} of {quiz.questions.length}
              </Badge>
              <div className="flex items-center gap-2 text-red-600">
                <Clock size={16} />
                <span className="font-mono text-lg">{formatTime(quiz.timeLeft)}</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardHeader>
      </Card>

      {/* Question */}
      <Card>
        <CardContent className="pt-8 pb-8">
          <h2 className="text-2xl font-semibold mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-4">
            <Input
              placeholder="Type your answer here..."
              value={quiz.userAnswers[quiz.currentQuestionIndex] || ''}
              onChange={(e) => quiz.updateAnswer(quiz.currentQuestionIndex, e.target.value)}
              className="text-lg p-4"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && quiz.currentQuestionIndex < quiz.questions.length - 1) {
                  quiz.nextQuestion();
                }
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={quiz.previousQuestion}
          disabled={quiz.currentQuestionIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          Previous
        </Button>

        <div className="flex gap-2">
          {quiz.questions.map((_, index) => (
            <Button
              key={index}
              variant={index === quiz.currentQuestionIndex ? "default" : "outline"}
              size="sm"
              onClick={() => quiz.goToQuestion(index)}
              className={`w-10 h-10 ${
                quiz.userAnswers[index]?.trim() 
                  ? 'bg-green-100 border-green-300 hover:bg-green-200' 
                  : ''
              }`}
            >
              {index + 1}
            </Button>
          ))}
        </div>

        {quiz.currentQuestionIndex === quiz.questions.length - 1 ? (
          <Button onClick={onSubmit} className="flex items-center gap-2">
            <Send size={16} />
            Submit Quiz
          </Button>
        ) : (
          <Button
            onClick={quiz.nextQuestion}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight size={16} />
          </Button>
        )}
      </div>

      {/* Question Summary */}
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {quiz.questions.map((_, index) => (
              <div
                key={index}
                className={`h-8 w-8 rounded flex items-center justify-center text-xs font-medium cursor-pointer transition-colors ${
                  index === quiz.currentQuestionIndex
                    ? 'bg-primary text-primary-foreground'
                    : quiz.userAnswers[index]?.trim()
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-muted text-muted-foreground border'
                }`}
                onClick={() => quiz.goToQuestion(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Answered: {quiz.userAnswers.filter(a => a?.trim()).length} / {quiz.questions.length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizSection;