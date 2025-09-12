import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, Brain, Zap, BookOpen } from 'lucide-react';
import { useQuiz } from '@/hooks/useQuiz';
import { useAuth } from '@/contexts/AuthContext';
import QuizSection from './QuizSection';
import QuizAlert from './QuizAlert';
import QuizResults from './QuizResults';
import MonthlyPerformance from './MonthlyPerformance';

const QuizInterface = () => {
  const quiz = useQuiz();
  const { user } = useAuth();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const sections = [
    { name: 'Science', icon: Zap, color: 'bg-blue-500' },
    { name: 'General Knowledge', icon: BookOpen, color: 'bg-green-500' },
    { name: 'IQ', icon: Brain, color: 'bg-purple-500' }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSectionSelect = (sectionName: string) => {
    setSelectedSection(sectionName);
    setShowAlert(true);
  };

  const handleStartQuiz = async () => {
    if (!selectedSection) return;
    
    setShowAlert(false);
    await quiz.loadQuestions(selectedSection);
    quiz.startQuiz();
  };

  if (quiz.quizStarted && !quiz.quizCompleted) {
    return (
      <QuizSection
        quiz={quiz}
        formatTime={formatTime}
        onSubmit={quiz.submitQuiz}
      />
    );
  }

  if (quiz.quizCompleted && quiz.quizResults) {
    return (
      <QuizResults
        results={quiz.quizResults}
        questions={quiz.questions}
        onBackToSections={() => {
          setSelectedSection(null);
          quiz.checkWeeklyAttempts();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <QuizAlert
        open={showAlert}
        onOpenChange={setShowAlert}
        onConfirm={handleStartQuiz}
        section={selectedSection}
      />

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Weekly Quiz Challenge</h2>
        <p className="text-muted-foreground">
          Test your knowledge in three categories. Each section can be attempted once per week.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          const attempt = quiz.weeklyAttempts[section.name];
          const isAttempted = !!attempt;

          return (
            <Card 
              key={section.name} 
              className={`relative overflow-hidden transition-all duration-300 ${
                isAttempted 
                  ? 'opacity-75 cursor-not-allowed' 
                  : 'hover:shadow-lg hover:scale-105 cursor-pointer'
              }`}
              onClick={() => !isAttempted && handleSectionSelect(section.name)}
            >
              <div className={`absolute top-0 left-0 w-full h-2 ${section.color}`} />
              
              <CardContent className="pt-8 pb-6">
                <div className="text-center space-y-4">
                  <div className={`inline-flex p-4 rounded-full ${section.color} text-white`}>
                    <Icon size={32} />
                  </div>
                  
                  <h3 className="text-xl font-semibold">{section.name}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Timer size={16} />
                      <span>15 minutes</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      10 questions • +1 for correct • -0.25 for wrong
                    </p>
                  </div>

                  {isAttempted ? (
                    <div className="space-y-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Completed This Week
                      </Badge>
                      <p className="text-sm font-medium">
                        Score: {attempt.score.toFixed(2)} ({attempt.correct_answers}/10 correct)
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Show quiz results for this attempt
                          quiz.setQuizResults({
                            score: attempt.score,
                            correctAnswers: attempt.correct_answers,
                            wrongAnswers: attempt.wrong_answers,
                            totalQuestions: attempt.total_questions,
                            answers: attempt.answers
                          });
                          quiz.setQuizCompleted(true);
                        }}
                      >
                        See Answers
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSectionSelect(section.name);
                      }}
                    >
                      Start Quiz
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Monthly Performance Section */}
      <MonthlyPerformance userId={user?.id} />
    </div>
  );
};

export default QuizInterface;