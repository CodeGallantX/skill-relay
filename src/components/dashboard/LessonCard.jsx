import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Heart, MessageCircle, Share2, Clock, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const LessonCard = ({ lesson }) => {
  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer">
      <CardHeader className="p-0">
        <img src={lesson.thumbnail} alt={lesson.title} className="rounded-t-lg w-full h-40 object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={lesson.creator.avatar} />
            <AvatarFallback>{lesson.creator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-muted-foreground">{lesson.creator.name}</span>
        </div>
        <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">{lesson.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mb-3">{lesson.tags}</CardDescription>
        
        {lesson.progress !== undefined && (
          <div className="mb-3">
            <Progress value={lesson.progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{lesson.progress}% Complete</p>
          </div>
        )}

        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{lesson.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{lesson.views} views</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <span>{lesson.likes}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
