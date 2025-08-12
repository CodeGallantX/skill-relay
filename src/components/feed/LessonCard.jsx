import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  MoreHorizontal,
  Bookmark,
  Flag
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import { socialApi } from '@/lib/api';
import { toast } from 'sonner';

export const LessonCard = ({ lesson, onLike, onComment, onShare }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(lesson.stats.likes);
  const videoRef = useRef(null);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  // Auto-play when in view
  React.useEffect(() => {
    if (videoRef.current) {
      if (inView && !isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      } else if (!inView && isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [inView, isPlaying]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = async () => {
    try {
      const response = await socialApi.likeContent(lesson.id);
      setIsLiked(response.liked);
      setLikeCount(response.totalLikes);
      onLike?.(lesson.id, response.liked);
    } catch (error) {
      toast.error('Failed to like lesson');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lesson.title,
        text: lesson.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
    onShare?.(lesson.id);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card ref={ref} className="w-full max-w-sm mx-auto bg-black text-white border-0 rounded-2xl overflow-hidden relative">
      {/* Video Container */}
      <div className="relative aspect-[9/16] bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          poster={lesson.thumbnail}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={lesson.videoUrl} type="video/mp4" />
        </video>

        {/* Video Controls Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/20"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
          </Button>
        </div>

        {/* Top Overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex items-center space-x-2">
            {lesson.isPremium && (
              <Badge variant="secondary" className="bg-yellow-500 text-black">
                Premium
              </Badge>
            )}
            {lesson.price > 0 && (
              <Badge variant="secondary" className="bg-green-500 text-white">
                ${lesson.price}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={handleMuteToggle}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleBookmark}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  {isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Flag className="mr-2 h-4 w-4" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Creator Info */}
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={lesson.creator.avatar} alt={lesson.creator.name} />
              <AvatarFallback>{lesson.creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm">{lesson.creator.name}</span>
                {lesson.creator.isVerified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-300">
                {lesson.creator.followers.toLocaleString()} followers
              </div>
            </div>
            <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              Follow
            </Button>
          </div>

          {/* Lesson Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm line-clamp-2">{lesson.title}</h3>
            <p className="text-xs text-gray-300 line-clamp-2">{lesson.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {lesson.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-white/20 text-white">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Stats and Duration */}
            <div className="flex items-center justify-between text-xs text-gray-300">
              <div className="flex items-center space-x-4">
                <span>{lesson.stats.views.toLocaleString()} views</span>
                <span>{formatDuration(lesson.duration)}</span>
              </div>
              <div className="text-xs">
                {new Date(lesson.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - Right Side */}
      <div className="absolute right-3 bottom-20 flex flex-col space-y-4">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex flex-col items-center space-y-1 text-white hover:bg-white/20",
            isLiked && "text-red-500"
          )}
          onClick={handleLike}
        >
          <Heart className={cn("h-6 w-6", isLiked && "fill-current")} />
          <span className="text-xs">{likeCount.toLocaleString()}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center space-y-1 text-white hover:bg-white/20"
          onClick={() => onComment?.(lesson.id)}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs">{lesson.stats.comments.toLocaleString()}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center space-y-1 text-white hover:bg-white/20"
          onClick={handleShare}
        >
          <Share2 className="h-6 w-6" />
          <span className="text-xs">{lesson.stats.shares.toLocaleString()}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex flex-col items-center space-y-1 text-white hover:bg-white/20",
            isBookmarked && "text-yellow-500"
          )}
          onClick={handleBookmark}
        >
          <Bookmark className={cn("h-6 w-6", isBookmarked && "fill-current")} />
        </Button>
      </div>
    </Card>
  );
};