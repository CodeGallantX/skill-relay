
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const options = [
  'Social Media',
  'From a Friend',
  'Advertisement',
  'Search Engine',
  'Other',
];

const StepHowDidYouHear = ({ nextStep, prevStep, updateData, data }) => {
  const [source, setSource] = useState(data);

  const handleNext = () => {
    updateData('howDidYouHear', source);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">How did you hear about us?</h2>
      <p className="text-muted-foreground mb-8">This helps us understand our community growth.</p>
      <Select onValueChange={setSource} value={source}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>{option}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex justify-between mt-8">
        <Button onClick={prevStep} variant="outline">Back</Button>
        <Button onClick={handleNext} disabled={!source}>Continue</Button>
      </div>
    </div>
  );
};

export default StepHowDidYouHear;
