import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  notifications: [],
  unreadCount: 0,
  currentLesson: null,
  feedFilters: {
    category: 'all',
    difficulty: 'all',
    price: 'all',
    sortBy: 'recent'
  },
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  wallet: {
    balance: 0,
    transactions: []
  },
  uploadProgress: {},
  liveViewers: {}
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload.notifications,
        unreadCount: action.payload.unreadCount
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1
      };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => 
          n.id === action.payload ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      };
    
    case 'SET_CURRENT_LESSON':
      return {
        ...state,
        currentLesson: action.payload
      };
    
    case 'UPDATE_FEED_FILTERS':
      return {
        ...state,
        feedFilters: { ...state.feedFilters, ...action.payload }
      };
    
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };
    
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload,
        isSearching: false
      };
    
    case 'SET_SEARCHING':
      return {
        ...state,
        isSearching: action.payload
      };
    
    case 'UPDATE_WALLET':
      return {
        ...state,
        wallet: { ...state.wallet, ...action.payload }
      };
    
    case 'SET_UPLOAD_PROGRESS':
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          [action.payload.id]: action.payload.progress
        }
      };
    
    case 'SET_LIVE_VIEWERS':
      return {
        ...state,
        liveViewers: {
          ...state.liveViewers,
          [action.payload.contentId]: action.payload.count
        }
      };
    
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setNotifications: (notifications, unreadCount) => 
      dispatch({ type: 'SET_NOTIFICATIONS', payload: { notifications, unreadCount } }),
    
    addNotification: (notification) => 
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),
    
    markNotificationRead: (id) => 
      dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id }),
    
    setCurrentLesson: (lesson) => 
      dispatch({ type: 'SET_CURRENT_LESSON', payload: lesson }),
    
    updateFeedFilters: (filters) => 
      dispatch({ type: 'UPDATE_FEED_FILTERS', payload: filters }),
    
    setSearchQuery: (query) => 
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
    
    setSearchResults: (results) => 
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: results }),
    
    setSearching: (isSearching) => 
      dispatch({ type: 'SET_SEARCHING', payload: isSearching }),
    
    updateWallet: (walletData) => 
      dispatch({ type: 'UPDATE_WALLET', payload: walletData }),
    
    setUploadProgress: (id, progress) => 
      dispatch({ type: 'SET_UPLOAD_PROGRESS', payload: { id, progress } }),
    
    setLiveViewers: (contentId, count) => 
      dispatch({ type: 'SET_LIVE_VIEWERS', payload: { contentId, count } })
  };

  return (
    <AppContext.Provider value={{ state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};