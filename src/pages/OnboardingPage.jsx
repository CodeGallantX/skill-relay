
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/context/OnboardingContext';
import { useAuth } from '@/context/AuthContext';
import ProgressBar from '@/components/onboarding/ProgressBar';
import RoleSelection from '@/components/onboarding/RoleSelection';
import InterestSelection from '@/components/onboarding/InterestSelection';
import CreatorFollowing from '@/components/onboarding/CreatorFollowing';
import ContentTypeSelection from '@/components/onboarding/ContentTypeSelection';
import SkillSelection from '@/components/onboarding/SkillSelection';
import ExperienceLevel from '@/components/onboarding/ExperienceLevel';
import HowDidYouHear from '@/components/onboarding/HowDidYouHear';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const onboarding = useOnboarding();
  const { completeUserOnboarding } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);

  const getTotalSteps = () => {
    return onboarding.role === 'creator' ? 5 : 4;
  };

  const handleRoleSelect = (role) => {
    onboarding.setRole(role);
    setCurrentStep(2);
  };

  const handleNext = (data, field) => {
    switch (field) {
      case 'interests':
        onboarding.setInterests(data);
        break;
      case 'followedCreators':
        onboarding.setFollowedCreators(data);
        break;
      case 'contentType':
        onboarding.setContentType(data);
        break;
      case 'skills':
        onboarding.setSkills(data);
        break;
      case 'experienceLevel':
        onboarding.setExperienceLevel(data);
        break;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleFinish = (source) => {
    onboarding.setHowDidYouHear(source);
    onboarding.completeOnboarding();
    navigate('/dashboard');
  };

  const renderStep = () => {
    if (currentStep === 1) {
      return <RoleSelection onSelect={handleRoleSelect} />;
    }

    if (onboarding.role === 'learner') {
      switch (currentStep) {
        case 2:
          return (
            <InterestSelection
              onNext={(data) => handleNext(data, 'interests')}
              onBack={handleBack}
              selectedInterests={onboarding.interests}
            />
          );
        case 3:
          return (
            <CreatorFollowing
              onNext={(data) => handleNext(data, 'followedCreators')}
              onBack={handleBack}
              followedCreators={onboarding.followedCreators}
            />
          );
        case 4:
          return (
            <HowDidYouHear
              onFinish={handleFinish}
              onBack={handleBack}
              selectedSource={onboarding.howDidYouHear}
            />
          );
        default:
          return null;
      }
    }

    if (onboarding.role === 'creator') {
      switch (currentStep) {
        case 2:
          return (
            <ContentTypeSelection
              onNext={(data) => handleNext(data, 'contentType')}
              onBack={handleBack}
              selectedTypes={onboarding.contentType}
            />
          );
        case 3:
          return (
            <SkillSelection
              onNext={(data) => handleNext(data, 'skills')}
              onBack={handleBack}
              selectedSkills={onboarding.skills}
            />
          );
        case 4:
          return (
            <ExperienceLevel
              onNext={(data) => handleNext(data, 'experienceLevel')}
              onBack={handleBack}
              selectedLevel={onboarding.experienceLevel}
            />
          );
        case 5:
          return (
            <HowDidYouHear
              onFinish={handleFinish}
              onBack={handleBack}
              selectedSource={onboarding.howDidYouHear}
            />
          );
        default:
          return null;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <title>Onboarding - Skill Relay</title>
      <meta name="description" content="Complete your SkillRelay profile setup to get personalized recommendations." />
      <div className="w-full max-w-md">
        <ProgressBar currentStep={currentStep} totalSteps={getTotalSteps()} />
        <div className="animate-fade-in">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
