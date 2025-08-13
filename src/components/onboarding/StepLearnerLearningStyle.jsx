
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const learningStyles = [
  { id: 'visual', title: 'Visual', description: 'I learn best by watching videos and seeing examples.' },
  { id: 'auditory', title: 'Auditory', description: 'I learn best by listening to lectures and discussions.' },
  { id: 'hands-on', title: 'Hands-on', description: 'I learn best by doing projects and practical exercises.' },
];

const StepLearnerLearningStyle = ({ nextStep, prevStep, updateData, data }) => {
  const [selectedStyle, setSelectedStyle] = useState(data);

  const handleSelectStyle = (style) => {
    setSelectedStyle(style);
  };

  const handleNext = () => {
    updateData('learningStyle', selectedStyle);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What's your learning style?</h2>
      <p className="text-muted-foreground mb-8">This will help us recommend the right content for you.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {learningStyles.map((style) => (
          <Card
            key={style.id}
            onClick={() => handleSelectStyle(style.id)}
            className={`cursor-pointer ${selectedStyle === style.id ? 'border-primary' : ''}`}>
            <CardHeader>
              <CardTitle>{style.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{style.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">Back</Button>
        <Button onClick={handleNext} disabled={!selectedStyle}>Continue</Button>
      </div>
    </div>
  );
};

export default StepLearnerLearningStyle;
