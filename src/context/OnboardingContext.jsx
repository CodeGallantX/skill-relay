import { createContext, useContext, useReducer } from 'react';

const OnboardingContext = createContext();

const initialState = {
  role: '', // 'learner' or 'creator'
  interests: [], // for learners
  followedCreators: [], // for learners
  contentType: [], // for creators
  skills: [], // for creators
  experienceLevel: '', // for creators
  howDidYouHear: '',
  completed: false
};

const onboardingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_INTERESTS':
      return { ...state, interests: action.payload };
    case 'SET_FOLLOWED_CREATORS':
      return { ...state, followedCreators: action.payload };
    case 'SET_CONTENT_TYPE':
      return { ...state, contentType: action.payload };
    case 'SET_SKILLS':
      return { ...state, skills: action.payload };
    case 'SET_EXPERIENCE_LEVEL':
      return { ...state, experienceLevel: action.payload };
    case 'SET_HOW_DID_YOU_HEAR':
      return { ...state, howDidYouHear: action.payload };
    case 'COMPLETE_ONBOARDING':
      return { ...state, completed: true };
    case 'RESET_ONBOARDING':
      return initialState;
    default:
      return state;
  }
};

export const OnboardingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  const setRole = (role) => dispatch({ type: 'SET_ROLE', payload: role });
  const setInterests = (interests) => dispatch({ type: 'SET_INTERESTS', payload: interests });
  const setFollowedCreators = (creators) => dispatch({ type: 'SET_FOLLOWED_CREATORS', payload: creators });
  const setContentType = (contentType) => dispatch({ type: 'SET_CONTENT_TYPE', payload: contentType });
  const setSkills = (skills) => dispatch({ type: 'SET_SKILLS', payload: skills });
  const setExperienceLevel = (level) => dispatch({ type: 'SET_EXPERIENCE_LEVEL', payload: level });
  const setHowDidYouHear = (source) => dispatch({ type: 'SET_HOW_DID_YOU_HEAR', payload: source });
  const completeOnboarding = () => dispatch({ type: 'COMPLETE_ONBOARDING' });
  const resetOnboarding = () => dispatch({ type: 'RESET_ONBOARDING' });

  return (
    <OnboardingContext.Provider value={{
      ...state,
      setRole,
      setInterests,
      setFollowedCreators,
      setContentType,
      setSkills,
      setExperienceLevel,
      setHowDidYouHear,
      completeOnboarding,
      resetOnboarding
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};