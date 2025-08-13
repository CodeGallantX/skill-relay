
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ProgressIndicator } from './ProgressIndicator';
import StepRoleSelection from './StepRoleSelection';
import StepLearnerInterests from './StepLearnerInterests';
import StepLearnerFollowCreators from './StepLearnerFollowCreators';
import StepLearnerLearningStyle from './StepLearnerLearningStyle';
import StepLearnerGoals from './StepLearnerGoals';
import StepCreatorContentType from './StepCreatorContentType';
import StepCreatorSkills from './StepCreatorSkills';
import StepCreatorExperience from './StepCreatorExperience';
import StepCreatorGoals from './StepCreatorGoals';
import StepCreatorMonetization from './StepCreatorMonetization';
import StepHowDidYouHear from './StepHowDidYouHear';
import StepNotificationPreferences from './StepNotificationPreferences';
import { api } from '../../lib/api';

const OnboardingFlow = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [onboardingData, setOnboardingData] = useState({
    role: '',
    interests: [],
    followedCreators: [],
    learningStyle: '',
    learningGoals: '',
    contentType: [],
    skills: [],
    experienceLevel: '',
    contentGoals: [],
    monetizationInterest: null,
    howDidYouHear: '',
    notificationPreferences: {
      email: true,
      push: true,
      inApp: true,
    },
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(7); // Default for learner

  useEffect(() => {
    if (localStorage.getItem('onboardingCompleted')) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (onboardingData.role === 'creator') {
      setTotalSteps(8); // Creator path has more steps
    } else {
      setTotalSteps(7); // Learner path
    }
  }, [onboardingData.role]);

  const updateData = (field, value) => {
    setOnboardingData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const response = await api.post('/user/onboarding', onboardingData);
      updateUser(response.data.user);
      localStorage.setItem('onboardingCompleted', 'true');
      if (onboardingData.role === 'creator') {
        navigate('/my-lessons');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Onboarding submission failed', error);
      // Handle error state in UI
    }
  };

  const steps = {
    1: <StepRoleSelection nextStep={nextStep} updateData={updateData} />,
    // Learner Path
    2: onboardingData.role === 'learner' && <StepLearnerInterests nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={onboardingData.interests} />,
    3: onboardingData.role === 'learner' && <StepLearnerFollowCreators nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={onboardingData.followedCreators} />,
    4: onboardingData.role === 'learner' && <StepLearnerLearningStyle nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={onboardingData.learningStyle} />,
    5: onboardingData.role === 'learner' && <StepLearnerGoals nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={onboardingData.learningGoals} />,
    6: onboardingData.role === 'learner' && <StepHowDidYouHear nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={onboardingData.howDidYouHear} />,
    7: onboardingData.role === 'learner' && <StepNotificationPreferences handleSubmit={handleSubmit} prevStep={prevStep} updateData={updateData} data={onboardingData.notificationPreferences} />,
    // Creator Path
    8: onboardingData.role === 'creator' && <StepCreatorContentType nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={onboardingData.contentType} />,
    9: onboardingData.role === 'creator' && <StepCreatorSkills nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={onboardingData.skills} />,
    10: onboardingData.role === 'creator' && <StepCreatorExperience nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={onboardingData.experienceLevel} />,
    11: onboardingData.role === 'creator' && <StepCreatorGoals nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={onboardingData.contentGoals} />,
    12: onboardingData.role === 'creator' && <StepCreatorMonetization nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={onboardingData.monetizationInterest} />,
    13: onboardingData.role === 'creator' && <StepHowDidYouHear nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={onboardingData.howDidYouHear} />,
    14: onboardingData.role === 'creator' && <StepNotificationPreferences handleSubmit={handleSubmit} prevStep={prevStep} updateData={updateData} data={onboardingData.notificationPreferences} />,
  };

  const renderStep = () => {
    if (currentStep === 1) return steps[1];
    if (onboardingData.role === 'learner') {
        return steps[currentStep];
    }
    if (onboardingData.role === 'creator') {
        return steps[currentStep - 1 + 8];
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        <div className="mt-8">
            {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
