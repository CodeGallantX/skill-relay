
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { mockInterests } from '@/lib/mockData';
import { Sparkles } from 'lucide-react';

const StepLearnerInterests = ({ nextStep, prevStep, updateData, data }) => {
  const [selectedInterests, setSelectedInterests] = useState(data);

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleNext = () => {
    updateData('interests', selectedInterests);
    nextStep();
  };

  return (
    <Card className="shadow-2xl border-0">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center shadow-lg">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold gradient-text">What interests you?</CardTitle>
        <CardDescription>
          Select at least 3 topics to personalize your learning experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {mockInterests.map((interest) => (
            <Badge
              key={interest.id}
              variant={selectedInterests.includes(interest.id) ? 'default' : 'outline'}
              onClick={() => toggleInterest(interest.id)}
              className="cursor-pointer hover:scale-105 transition-transform text-sm py-2 px-4"
            >
              {interest.name}
            </Badge>
          ))}
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          {selectedInterests.length}/3 minimum selected
        </div>
        
        <div className="flex justify-between pt-4">
          <Button onClick={prevStep} variant="outline">Back</Button>
          <Button onClick={handleNext} disabled={selectedInterests.length < 3}>
            Continue ({selectedInterests.length})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepLearnerInterests;
