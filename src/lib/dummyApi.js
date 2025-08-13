const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const dummySocialApi = {
  likeContent: async (lessonId) => {
    await delay(500);
    // Simulate a successful like/unlike operation
    const liked = Math.random() > 0.5; // Simulate toggling like status
    const totalLikes = Math.floor(Math.random() * 1000) + 100; // Simulate varying like counts
    return { liked, totalLikes, message: liked ? 'Lesson liked!' : 'Lesson unliked!' };
  },
};

export const dummyContentApi = {
  fetchLessons: async (filters = {}) => {
    await delay(800);
    const dummyLessons = [
      {
        id: '1',
        title: 'Introduction to React Hooks',
        description: 'Learn the basics of React Hooks and how to use them in your projects.',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnail: 'https://via.placeholder.com/300x500?text=React+Hooks',
        duration: 360,
        isPremium: false,
        price: 0,
        creator: {
          name: 'Jane Doe',
          avatar: 'https://i.pravatar.cc/150?img=1',
          isVerified: true,
          followers: 12345,
        },
        tags: ['React', 'Hooks', 'Frontend'],
        stats: {
          views: 15000,
          likes: 2500,
          comments: 120,
          shares: 50,
        },
        createdAt: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        title: 'Mastering Tailwind CSS',
        description: 'Dive deep into Tailwind CSS and build beautiful, responsive UIs quickly.',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnail: 'https://via.placeholder.com/300x500?text=Tailwind+CSS',
        duration: 480,
        isPremium: true,
        price: 19.99,
        creator: {
          name: 'John Smith',
          avatar: 'https://i.pravatar.cc/150?img=2',
          isVerified: false,
          followers: 8765,
        },
        tags: ['TailwindCSS', 'CSS', 'UI/UX'],
        stats: {
          views: 8000,
          likes: 1500,
          comments: 80,
          shares: 30,
        },
        createdAt: '2024-02-20T14:30:00Z',
      },
      {
        id: '3',
        title: 'Advanced JavaScript Concepts',
        description: 'Explore closures, prototypes, and asynchronous JavaScript.',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnail: 'https://via.placeholder.com/300x500?text=JavaScript',
        duration: 540,
        isPremium: false,
        price: 0,
        creator: {
          name: 'Alice Johnson',
          avatar: 'https://i.pravatar.cc/150?img=3',
          isVerified: true,
          followers: 25000,
        },
        tags: ['JavaScript', 'Programming', 'WebDev'],
        stats: {
          views: 20000,
          likes: 4000,
          comments: 200,
          shares: 100,
        },
        createdAt: '2024-03-10T09:15:00Z',
      },
    ];

    // Simulate filtering if needed
    let filteredLessons = dummyLessons;
    if (filters.query) {
      const lowerCaseQuery = filters.query.toLowerCase();
      filteredLessons = filteredLessons.filter(lesson =>
        lesson.title.toLowerCase().includes(lowerCaseQuery) ||
        lesson.description.toLowerCase().includes(lowerCaseQuery) ||
        lesson.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
      );
    }

    return { data: filteredLessons, message: 'Lessons fetched successfully!' };
  },
};