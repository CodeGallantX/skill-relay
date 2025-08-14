
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ProgressIndicator } from './ProgressIndicator';
import StepRoleSelection from './StepRoleSelection';
import StepLearnerInterests from './StepLearnerInterests';
import StepLearnerFollowCreators from './StepLearnerFollowCreators';
import StepCreatorContentType from './StepCreatorContentType';
import StepCreatorSkills from './StepCreatorSkills';
import StepCreatorExperience from './StepCreatorExperience';
import StepHowDidYouHear from './StepHowDidYouHear';
import { toast } from 'sonner';

const OnboardingFlow = () => {
  const { state, updateOnboardingData, completeOnboarding } = useApp();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(4);

  useEffect(() => {
    if (state.onboardingData.role === 'creator') {
      setTotalSteps(5); // Creator: Role -> Content Type -> Skills -> Experience -> How did you hear
    } else {
      setTotalSteps(4); // Learner: Role -> Interests -> Follow Creators -> How did you hear
    }
  }, [state.onboardingData.role]);

  const updateData = (field, value) => {
    updateOnboardingData({ [field]: value });
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      // Mock API call - in real app this would save to backend
      completeOnboarding();
      toast.success('Welcome to SkillRelay!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding submission failed', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const renderStep = () => {
    if (currentStep === 1) {
      return <StepRoleSelection nextStep={nextStep} updateData={updateData} />;
    }
    
    if (state.onboardingData.role === 'learner') {
      switch (currentStep) {
        case 2:
          return <StepLearnerInterests nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={state.onboardingData.interests} />;
        case 3:
          return <StepLearnerFollowCreators nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={state.onboardingData.followedCreators} />;
        case 4:
          return <StepHowDidYouHear handleSubmit={handleSubmit} prevStep={prevStep} updateData={updateData} data={state.onboardingData.howDidYouHear} />;
        default:
          return null;
      }
    }
    
    if (state.onboardingData.role === 'creator') {
      switch (currentStep) {
        case 2:
          return <StepCreatorContentType nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={state.onboardingData.contentType} />;
        case 3:
          return <StepCreatorSkills nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={state.onboardingData.skills} />;
        case 4:
          return <StepCreatorExperience nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={state.onboardingData.experienceLevel} />;
        case 5:
          return <StepHowDidYouHear handleSubmit={handleSubmit} prevStep={prevStep} updateData={updateData} data={state.onboardingData.howDidYouHear} />;
        default:
          return null;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        <div className="mt-8 animate-fade-in">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
