import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dummySocialApi } from '@/lib/dummyApi';
import { toast } from 'sonner';

export const useLikeLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lessonId) => {
      const response = await dummySocialApi.likeContent(lessonId);
      return response;
    },
    onSuccess: (data, variables) => {
      // Optionally update the cache for the specific lesson
      queryClient.setQueryData(['lesson', variables], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            stats: {
              ...oldData.stats,
              likes: data.totalLikes,
            },
          };
        }
        return oldData;
      });
      toast.success(data.message || (data.liked ? 'Lesson liked!' : 'Lesson unliked!'));
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to like/unlike lesson.');
    },
  });
};
