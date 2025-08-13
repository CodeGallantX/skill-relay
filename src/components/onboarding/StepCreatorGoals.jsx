
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const contentGoals = [
  'Audience Growth',
  'Monetization',
  'Sharing Knowledge',
  'Building a Portfolio',
];

const StepCreatorGoals = ({ nextStep, prevStep, updateData, data }) => {
  const [selectedGoals, setSelectedGoals] = useState(data);

  const toggleGoal = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleNext = () => {
    updateData('contentGoals', selectedGoals);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What are your content goals?</h2>
      <p className="text-muted-foreground mb-8">Select all that apply.</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {contentGoals.map((goal) => (
          <Badge
            key={goal}
            variant={selectedGoals.includes(goal) ? 'default' : 'outline'}
            onClick={() => toggleGoal(goal)}
            className="cursor-pointer"
          >
            {goal}
          </Badge>
        ))}
      </div>
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">Back</Button>
        <Button onClick={handleNext} disabled={selectedGoals.length === 0}>Continue</Button>
      </div>
    </div>
  );
};

export default StepCreatorGoals;
