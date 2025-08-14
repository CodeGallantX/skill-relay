
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Award } from 'lucide-react';

const experienceLevels = [
  { 
    id: 'beginner', 
    title: 'Beginner', 
    description: 'Just starting my content creation journey',
    icon: '🌱'
  },
  { 
    id: 'intermediate', 
    title: 'Intermediate', 
    description: 'Have some experience creating content',
    icon: '🚀'
  },
  { 
    id: 'expert', 
    title: 'Expert', 
    description: 'Experienced content creator with a following',
    icon: '⭐'
  },
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
    <Card className="shadow-2xl border-0">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center shadow-lg">
          <Award className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold gradient-text">Your Experience Level</CardTitle>
        <p className="text-muted-foreground">This helps us tailor your creator journey</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {experienceLevels.map((level) => (
            <Card
              key={level.id}
              onClick={() => handleSelectLevel(level.id)}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedLevel === level.id 
                  ? 'border-primary shadow-glow' 
                  : 'hover:border-muted-foreground/50'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{level.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{level.title}</h3>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                  {selectedLevel === level.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-between pt-4">
          <Button onClick={prevStep} variant="outline">Back</Button>
          <Button onClick={handleNext} disabled={!selectedLevel}>Continue</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepCreatorExperience;

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
