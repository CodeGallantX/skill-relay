export const mockUserStats = {
  lessonsCompleted: 24,
  hoursLearned: 18.5,
  streakDays: 7,
  skillPoints: 1240,
};

export const generateMockLessons = (count) => {
  const lessons = [];
  const categories = ['Programming', 'Design', 'Marketing', 'Music', 'Fitness', 'Cooking'];
  const tags = ['React', 'Frontend', 'Web Dev', 'Hooks', 'UI/UX', 'Branding', 'SEO', 'Guitar', 'Yoga', 'Baking'];

  for (let i = 0; i < count; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomTags = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => tags[Math.floor(Math.random() * tags.length)]);

    lessons.push({
      id: `lesson-${Math.random().toString(36).substr(2, 9)}`,
      title: `Mock Lesson ${i + 1}: ${randomCategory} Fundamentals`,
      thumbnail: `https://via.placeholder.com/300x180?text=${randomCategory}+${i + 1}`,
      videoPreview: `https://www.w3schools.com/html/mov_bbb.mp4`, // Example video preview
      creator: {
        id: `creator-${Math.random().toString(36).substr(2, 5)}`,
        name: `Creator ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      },
      progress: Math.floor(Math.random() * 100),
      duration: `${Math.floor(Math.random() * 20) + 5} min`,
      tags: [...new Set(randomTags)], // Ensure unique tags
      likes: Math.floor(Math.random() * 1000),
      views: Math.floor(Math.random() * 50000),
      category: randomCategory,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(), // Last 30 days
    });
  }
  return lessons;
};

export const mockContinueWatching = generateMockLessons(3);
export const mockFollowedCreatorsLessons = generateMockLessons(5);
export const mockRecommendedLessons = generateMockLessons(7);
export const mockNewCategoryLessons = generateMockLessons(4);

export const mockMainFeedInitial = generateMockLessons(10);

let mockPage = 0;
export const fetchMoreMockLessons = (currentLessons = []) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockPage++;
      const newLessons = generateMockLessons(5);
      const nextPageToken = mockPage < 3 ? `page-${mockPage + 1}` : null; // Simulate 3 pages
      resolve({ lessons: newLessons, nextPageToken });
    }, 500); // Simulate network delay
  });
};

export const mockExploreLessons = generateMockLessons(20);

export const mockCategories = [
  { id: 'prog', name: 'Programming' },
  { id: 'design', name: 'Design' },
  { id: 'mkt', name: 'Marketing' },
  { id: 'music', name: 'Music' },
  { id: 'fit', name: 'Fitness' },
  { id: 'cook', name: 'Cooking' },
];

export const mockSortOptions = [
  { value: 'popular', label: 'Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'relevance', label: 'Relevance' },
];

export const mockTrendingLessons = generateMockLessons(20).sort((a, b) => b.views - a.views); // Most viewed

export const mockTrendingTags = [
  { id: 'react', name: 'React', count: 120 },
  { id: 'ai', name: 'AI', count: 90 },
  { id: 'webdev', name: 'Web Dev', count: 80 },
  { id: 'marketing', name: 'Marketing', count: 75 },
  { id: 'fitness', name: 'Fitness', count: 60 },
];

export const mockTrendingCreators = [
  { id: 'creator-a', name: 'Creator Alpha', avatar: 'https://i.pravatar.cc/150?img=1', followers: '1.2M' },
  { id: 'creator-b', name: 'Creator Beta', avatar: 'https://i.pravatar.cc/150?img=2', followers: '900K' },
  { id: 'creator-c', name: 'Creator Gamma', avatar: 'https://i.pravatar.cc/150?img=3', followers: '750K' },
  { id: 'creator-d', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=4', followers: '650K', verified: true },
  { id: 'creator-e', name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/150?img=5', followers: '580K', verified: true },
  { id: 'creator-f', name: 'Aisha Patel', avatar: 'https://i.pravatar.cc/150?img=6', followers: '420K', verified: false },
];

export const mockInterests = [
  { id: 'programming', name: 'Programming' },
  { id: 'design', name: 'Design' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'music', name: 'Music' },
  { id: 'fitness', name: 'Fitness' },
  { id: 'cooking', name: 'Cooking' },
  { id: 'photography', name: 'Photography' },
  { id: 'business', name: 'Business' },
  { id: 'art', name: 'Art' },
  { id: 'writing', name: 'Writing' },
  { id: 'language', name: 'Language Learning' },
  { id: 'science', name: 'Science' },
];

export const mockContentTypes = [
  'Video Tutorials',
  'Live Streams',
  'Courses',
  'Quick Tips',
  'Workshops',
  'Podcasts'
];

export const mockSkills = [
  { id: 'tech', name: 'Technology', subcategories: ['Web Development', 'Mobile Apps', 'AI/ML', 'Data Science'] },
  { id: 'creative', name: 'Creative', subcategories: ['Graphic Design', 'Video Editing', 'Photography', 'Music Production'] },
  { id: 'business', name: 'Business', subcategories: ['Marketing', 'Sales', 'Finance', 'Management'] },
  { id: 'lifestyle', name: 'Lifestyle', subcategories: ['Cooking', 'Fitness', 'Travel', 'Fashion'] },
  { id: 'education', name: 'Education', subcategories: ['Languages', 'Science', 'Math', 'History'] },
];

export const mockHowDidYouHear = [
  'Social Media',
  'Friend Recommendation',
  'Google Search',
  'YouTube',
  'Advertisement',
  'Blog/Article',
  'Other'
];