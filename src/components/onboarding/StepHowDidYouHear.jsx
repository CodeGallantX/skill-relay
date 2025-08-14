
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { mockHowDidYouHear } from '@/lib/mockData';
import { MessageCircle } from 'lucide-react';

const StepHowDidYouHear = ({ nextStep, prevStep, handleSubmit, updateData, data }) => {
  const [source, setSource] = useState(data);

  const handleNext = () => {
    updateData('howDidYouHear', source);
    if (handleSubmit) {
      handleSubmit();
    } else {
      nextStep();
    }
  };

  return (
    <Card className="shadow-2xl border-0">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center shadow-lg">
          <MessageCircle className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold gradient-text">How did you hear about us?</CardTitle>
        <CardDescription>
          Help us understand how you discovered SkillRelay
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Select onValueChange={setSource} value={source}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select how you found us" />
          </SelectTrigger>
          <SelectContent>
            {mockHowDidYouHear.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex justify-between pt-4">
          <Button onClick={prevStep} variant="outline">Back</Button>
          <Button onClick={handleNext} disabled={!source}>
            {handleSubmit ? 'Finish' : 'Continue'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepHowDidYouHear;
