
import React, { useState } from 'react';
import { Button } from '../ui/button';

const StepCreatorMonetization = ({ nextStep, prevStep, updateData, data }) => {
  const [interest, setInterest] = useState(data);

  const handleSelect = (value) => {
    setInterest(value);
  };

  const handleNext = () => {
    updateData('monetizationInterest', interest);
    nextStep();
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Are you interested in monetizing your content?</h2>
      <p className="text-muted-foreground mb-8">We have tools and resources to help you earn from your content.</p>
      <div className="flex justify-center gap-4">
        <Button onClick={() => handleSelect(true)} variant={interest === true ? 'default' : 'outline'} size="lg">Yes</Button>
        <Button onClick={() => handleSelect(false)} variant={interest === false ? 'default' : 'outline'} size="lg">No</Button>
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={prevStep} variant="outline">Back</Button>
        <Button onClick={handleNext} disabled={interest === null}>Continue</Button>
      </div>
    </div>
  );
};

export default StepCreatorMonetization;
