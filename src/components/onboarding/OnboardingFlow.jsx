import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const interests = [
  { id: 'programming', label: 'Programming', icon: '💻' },
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'marketing', label: 'Marketing', icon: '📈' },
  { id: 'photography', label: 'Photography', icon: '📸' },
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'cooking', label: 'Cooking', icon: '👨‍🍳' },
  { id: 'fitness', label: 'Fitness', icon: '💪' },
  { id: 'writing', label: 'Writing', icon: '✍️' },
  { id: 'languages', label: 'Languages', icon: '🌍' },
  { id: 'science', label: 'Science', icon: '🔬' },
  { id: 'art', label: 'Art', icon: '🖼️' },
];

const skillLevels = [
  { id: 'beginner', label: 'Beginner', description: 'Just starting out' },
  { id: 'intermediate', label: 'Intermediate', description: 'Some experience' },
  { id: 'advanced', label: 'Advanced', description: 'Experienced learner' },
  { id: 'expert', label: 'Expert', description: 'Ready to teach others' },
];

const goals = [
  { id: 'learn', label: 'Learn new skills', description: 'I want to acquire new knowledge' },
  { id: 'teach', label: 'Teach and share', description: 'I want to create and share content' },
  { id: 'earn', label: 'Earn money', description: 'I want to monetize my skills' },
  { id: 'network', label: 'Network', description: 'I want to connect with others' },
];

export const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [skillLevel, setSkillLevel] = useState('');
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { updateUser } = useAuth();

  const steps = [
    {
      title: 'What interests you?',
      description: 'Select topics you\'d like to learn about',
      component: InterestsStep,
    },
    {
      title: 'What\'s your skill level?',
      description: 'Help us personalize your experience',
      component: SkillLevelStep,
    },
    {
      title: 'What are your goals?',
      description: 'What do you want to achieve on SkillRelay?',
      component: GoalsStep,
    },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  function InterestsStep() {
    const handleInterestToggle = (interestId) => {
      setSelectedInterests(prev => 
        prev.includes(interestId)
          ? prev.filter(id => id !== interestId)
          : [...prev, interestId]
      );
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interests.map((interest) => (
            <div
              key={interest.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50 ${
                selectedInterests.includes(interest.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              }`}
              onClick={() => handleInterestToggle(interest.id)}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{interest.icon}</div>
                <div className="text-sm font-medium">{interest.label}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Select at least 3 interests to continue
        </p>
      </div>
    );
  }

  function SkillLevelStep() {
    return (
      <RadioGroup value={skillLevel} onValueChange={setSkillLevel}>
        <div className="space-y-3">
          {skillLevels.map((level) => (
            <div key={level.id} className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-accent/50">
              <RadioGroupItem value={level.id} id={level.id} />
              <Label htmlFor={level.id} className="flex-1 cursor-pointer">
                <div className="font-medium">{level.label}</div>
                <div className="text-sm text-muted-foreground">{level.description}</div>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    );
  }

  function GoalsStep() {
    const handleGoalToggle = (goalId) => {
      setSelectedGoals(prev => 
        prev.includes(goalId)
          ? prev.filter(id => id !== goalId)
          : [...prev, goalId]
      );
    };

    return (
      <div className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all hover:bg-accent/50 ${
              selectedGoals.includes(goal.id)
                ? 'border-primary bg-primary/5'
                : 'border-border'
            }`}
            onClick={() => handleGoalToggle(goal.id)}
          >
            <Checkbox
              checked={selectedGoals.includes(goal.id)}
              onChange={() => handleGoalToggle(goal.id)}
            />
            <div className="flex-1">
              <div className="font-medium">{goal.label}</div>
              <div className="text-sm text-muted-foreground">{goal.description}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedInterests.length >= 3;
      case 1:
        return skillLevel !== '';
      case 2:
        return selectedGoals.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Save onboarding data
      const onboardingData = {
        interests: selectedInterests,
        skillLevel,
        goals: selectedGoals,
        onboardingCompleted: true,
      };

      // Update user profile
      updateUser(onboardingData);
      
      toast.success('Welcome to SkillRelay! Your profile has been set up.');
      onComplete?.();
    } catch (error) {
      toast.error('Failed to complete onboarding. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="space-y-4">
            <Progress value={progress} className="w-full" />
            <div className="text-center">
              <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
              <CardDescription className="text-lg">
                {steps[currentStep].description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <CurrentStepComponent />
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
            >
              {isLoading ? (
                'Completing...'
              ) : currentStep === steps.length - 1 ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};