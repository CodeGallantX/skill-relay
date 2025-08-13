
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

const goalOptions = [
  'Learn a new skill for my career',
  'Explore a new hobby',
  'Prepare for a specific project',
  'Just browsing',
];

const StepLearnerGoals = ({ nextStep, prevStep, updateData, data }) => {
  const [goal, setGoal] = useState(data);

  const handleNext = () => {
    updateData('learningGoals', goal);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What are your learning goals?</h2>
      <p className="text-muted-foreground mb-8">Let us know what you want to achieve.</p>
      <RadioGroup value={goal} onValueChange={setGoal} className="mb-4">
        {goalOptions.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={option} />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      <Textarea
        placeholder="Or, write your own goal..."
        value={goal.startsWith('Learn') || goal.startsWith('Explore') || goal.startsWith('Prepare') || goal.startsWith('Just') ? '' : goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <div className="flex justify-between mt-8">
        <Button onClick={prevStep} variant="outline">Back</Button>
        <Button onClick={handleNext} disabled={!goal}>Continue</Button>
      </div>
    </div>
  );
};

export default StepLearnerGoals;
