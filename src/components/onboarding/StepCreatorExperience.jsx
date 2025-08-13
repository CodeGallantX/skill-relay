
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const experienceLevels = [
  { id: 'beginner', title: 'Beginner', description: 'I\'m just starting to create content.' },
  { id: 'intermediate', title: 'Intermediate', description: 'I have some experience creating content.' },
  { id: 'expert', title: 'Expert', description: 'I\'m an experienced content creator.' },
];

const StepCreatorExperience = ({ nextStep, prevStep, updateData, data }) => {
  const [selectedLevel, setSelectedLevel] = useState(data);

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
  };

  const handleNext = () => {
    updateData('experienceLevel', selectedLevel);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What is your experience level?</h2>
      <p className="text-muted-foreground mb-8">This helps us understand your journey.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {experienceLevels.map((level) => (
          <Card
            key={level.id}
            onClick={() => handleSelectLevel(level.id)}
            className={`cursor-pointer ${selectedLevel === level.id ? 'border-primary' : ''}`}>
            <CardHeader>
              <CardTitle>{level.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{level.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">Back</Button>
        <Button onClick={handleNext} disabled={!selectedLevel}>Continue</Button>
      </div>
    </div>
  );
};

export default StepCreatorExperience;
