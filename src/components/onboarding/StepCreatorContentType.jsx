
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const contentTypes = [
  'Video Lessons',
  'Articles & Tutorials',
  'Live Streams',
  'Courses',
  'Podcasts',
  'Quizzes & Exercises',
];

const StepCreatorContentType = ({ nextStep, prevStep, updateData, data }) => {
  const [selectedTypes, setSelectedTypes] = useState(data);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleNext = () => {
    updateData('contentType', selectedTypes);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What kind of content will you create?</h2>
      <p className="text-muted-foreground mb-8">Select all that apply.</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {contentTypes.map((type) => (
          <Badge
            key={type}
            variant={selectedTypes.includes(type) ? 'default' : 'outline'}
            onClick={() => toggleType(type)}
            className="cursor-pointer"
          >
            {type}
          </Badge>
        ))}
      </div>
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">Back</Button>
        <Button onClick={handleNext} disabled={selectedTypes.length === 0}>Continue</Button>
      </div>
    </div>
  );
};

export default StepCreatorContentType;
