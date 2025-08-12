// Mock API endpoints for SkillRelay
const API_BASE_URL = 'https://api.skillrelay.com';
const MOCK_DELAY = 1000;

// Helper function to simulate API calls
const mockApiCall = (data, delay = MOCK_DELAY) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate
        resolve(data);
      } else {
        reject(new Error('Network error'));
      }
    }, delay);
  });
};

// Auth API
export const authApi = {
  register: async (userData) => {
    return mockApiCall({
      success: true,
      message: 'Registration successful',
      user: {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: userData.name,
        avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`,
        isVerified: false,
        createdAt: new Date().toISOString()
      },
      token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9)
    });
  },

  login: async (credentials) => {
    if (credentials.email === 'test@skillrelay.com' && credentials.password === 'password123') {
      return mockApiCall({
        success: true,
        message: 'Login successful',
        user: {
          id: 'user-123',
          email: credentials.email,
          name: 'John Doe',
          avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`,
          isVerified: true,
          role: 'creator',
          createdAt: '2024-01-01T00:00:00.000Z'
        },
        token: 'mock-jwt-token-authenticated'
      });
    }
    throw new Error('Invalid credentials');
  },

  logout: async () => {
    return mockApiCall({
      success: true,
      message: 'Logged out successfully'
    });
  },

  getUser: async (token) => {
    return mockApiCall({
      success: true,
      user: {
        id: 'user-123',
        email: 'test@skillrelay.com',
        name: 'John Doe',
        avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`,
        isVerified: true,
        role: 'creator',
        followers: 1250,
        following: 340,
        totalEarnings: 2450.50,
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    });
  },

  resetPassword: async (email) => {
    return mockApiCall({
      success: true,
      message: 'Password reset email sent'
    });
  },

  verifyOTP: async (email, otp) => {
    return mockApiCall({
      success: true,
      message: 'OTP verified successfully',
      token: 'mock-jwt-token-verified'
    });
  },

  socialAuthRedirect: (provider) => {
    return `${API_BASE_URL}/auth/${provider}`;
  },

  socialAuthCallback: async (provider, code) => {
    return mockApiCall({
      success: true,
      message: `${provider} authentication successful`,
      user: {
        id: Math.random().toString(36).substr(2, 9),
        email: `user@${provider}.com`,
        name: `${provider} User`,
        avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`,
        isVerified: true,
        provider,
        createdAt: new Date().toISOString()
      },
      token: `mock-jwt-token-${provider}`
    });
  }
};

// Content API
export const contentApi = {
  getFeed: async (page = 1, filters = {}) => {
    const mockLessons = Array.from({ length: 10 }, (_, i) => ({
      id: `lesson-${page}-${i}`,
      title: `Amazing ${['Coding', 'Design', 'Marketing', 'Photography', 'Music'][i % 5]} Lesson`,
      description: 'Learn this incredible skill in just 5 minutes!',
      thumbnail: `https://images.pexels.com/photos/${1000000 + (page * 10 + i)}/${1000000 + (page * 10 + i)}.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2`,
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      duration: Math.floor(Math.random() * 300) + 60,
      price: Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 5 : 0,
      isPremium: Math.random() > 0.7,
      category: ['coding', 'design', 'marketing', 'photography', 'music'][i % 5],
      tags: ['beginner', 'tutorial', 'quick-learn'],
      creator: {
        id: `creator-${i}`,
        name: `Creator ${i + 1}`,
        avatar: `https://images.pexels.com/photos/${220453 + i}/${220453 + i}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2`,
        isVerified: Math.random() > 0.5,
        followers: Math.floor(Math.random() * 10000)
      },
      stats: {
        views: Math.floor(Math.random() * 100000),
        likes: Math.floor(Math.random() * 5000),
        comments: Math.floor(Math.random() * 500),
        shares: Math.floor(Math.random() * 100)
      },
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    }));

    return mockApiCall({
      success: true,
      lessons: mockLessons,
      pagination: {
        page,
        totalPages: 10,
        totalItems: 100,
        hasNext: page < 10
      }
    });
  },

  searchContent: async (query, filters = {}) => {
    return mockApiCall({
      success: true,
      results: [
        {
          id: 'search-1',
          title: `${query} Tutorial`,
          description: `Learn ${query} from scratch`,
          thumbnail: `https://images.pexels.com/photos/1000001/1000001.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2`,
          creator: {
            name: 'Expert Teacher',
            avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2`
          },
          price: 15,
          rating: 4.8
        }
      ]
    });
  },

  createLesson: async (lessonData) => {
    return mockApiCall({
      success: true,
      message: 'Lesson created successfully',
      lesson: {
        id: Math.random().toString(36).substr(2, 9),
        ...lessonData,
        createdAt: new Date().toISOString()
      }
    });
  },

  uploadFile: async (file, type = 'video') => {
    return mockApiCall({
      success: true,
      url: `https://cdn.skillrelay.com/${type}s/${Math.random().toString(36).substr(2, 9)}.${file.name.split('.').pop()}`,
      fileId: Math.random().toString(36).substr(2, 9)
    }, 2000);
  }
};

// Social API
export const socialApi = {
  likeContent: async (contentId) => {
    return mockApiCall({
      success: true,
      liked: true,
      totalLikes: Math.floor(Math.random() * 1000) + 100
    });
  },

  followUser: async (userId) => {
    return mockApiCall({
      success: true,
      following: true,
      totalFollowers: Math.floor(Math.random() * 1000) + 100
    });
  },

  getComments: async (contentId) => {
    const mockComments = Array.from({ length: 5 }, (_, i) => ({
      id: `comment-${i}`,
      text: `This is an amazing lesson! Thanks for sharing. Comment ${i + 1}`,
      user: {
        id: `user-${i}`,
        name: `User ${i + 1}`,
        avatar: `https://images.pexels.com/photos/${220453 + i}/${220453 + i}.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2`
      },
      createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      likes: Math.floor(Math.random() * 50)
    }));

    return mockApiCall({
      success: true,
      comments: mockComments
    });
  },

  addComment: async (contentId, text) => {
    return mockApiCall({
      success: true,
      comment: {
        id: Math.random().toString(36).substr(2, 9),
        text,
        user: {
          id: 'current-user',
          name: 'You',
          avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2`
        },
        createdAt: new Date().toISOString(),
        likes: 0
      }
    });
  }
};

// Payment API
export const paymentApi = {
  createPaymentIntent: async (amount, currency = 'USD') => {
    return mockApiCall({
      success: true,
      clientSecret: `pi_mock_${Math.random().toString(36).substr(2, 9)}_secret`,
      paymentIntentId: `pi_mock_${Math.random().toString(36).substr(2, 9)}`
    });
  },

  getWalletBalance: async () => {
    return mockApiCall({
      success: true,
      balance: {
        available: 1250.75,
        pending: 340.25,
        currency: 'USD'
      },
      transactions: Array.from({ length: 10 }, (_, i) => ({
        id: `txn-${i}`,
        type: Math.random() > 0.5 ? 'credit' : 'debit',
        amount: Math.floor(Math.random() * 100) + 10,
        description: `Transaction ${i + 1}`,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      }))
    });
  },

  withdrawFunds: async (amount, method) => {
    return mockApiCall({
      success: true,
      message: 'Withdrawal request submitted',
      withdrawalId: Math.random().toString(36).substr(2, 9),
      estimatedArrival: '2-3 business days'
    });
  }
};

// Notification API
export const notificationApi = {
  getNotifications: async () => {
    const mockNotifications = Array.from({ length: 10 }, (_, i) => ({
      id: `notif-${i}`,
      type: ['like', 'comment', 'follow', 'purchase', 'system'][i % 5],
      title: `Notification ${i + 1}`,
      message: 'You have a new notification',
      isRead: Math.random() > 0.5,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      data: {
        userId: `user-${i}`,
        contentId: `content-${i}`
      }
    }));

    return mockApiCall({
      success: true,
      notifications: mockNotifications,
      unreadCount: mockNotifications.filter(n => !n.isRead).length
    });
  },

  markAsRead: async (notificationId) => {
    return mockApiCall({
      success: true,
      message: 'Notification marked as read'
    });
  }
};