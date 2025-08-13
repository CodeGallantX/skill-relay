import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { CardTitle } from '@/components/ui/card';
import LessonCard from './LessonCard';

const LessonCarousel = ({ title, lessons }) => {
  if (!lessons || lessons.length === 0) {
    return null; // Don't render if no lessons
  }

  return (
    <div className="mb-8">
      <CardTitle className="text-2xl font-bold mb-4">{title}</CardTitle>
      <ScrollArea className="w-full max-w-full whitespace-nowrap rounded-md border">
        <div className="flex space-x-4 p-4">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="inline-block min-w-[280px]">
              <LessonCard lesson={lesson} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default LessonCarousel;
