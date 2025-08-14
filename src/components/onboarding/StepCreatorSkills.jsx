
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { mockSkills } from '@/lib/mockData';
import { Zap } from 'lucide-react';

const StepCreatorSkills = ({ nextStep, prevStep, updateData, data }) => {
  const [selectedSkills, setSelectedSkills] = useState(data);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleNext = () => {
    updateData('skills', selectedSkills);
    nextStep();
  };

  return (
    <Card className="shadow-2xl border-0">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center shadow-lg">
          <Zap className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold gradient-text">What are your skills?</CardTitle>
        <CardDescription>
          Select the categories that match your expertise
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {mockSkills.map((skillCategory) => (
            <div key={skillCategory.id} className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                {skillCategory.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillCategory.subcategories.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                    onClick={() => toggleSkill(skill)}
                    className="cursor-pointer hover:scale-105 transition-transform text-sm py-1 px-3"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
        </div>
        
        <div className="flex justify-between pt-4">
          <Button onClick={prevStep} variant="outline">Back</Button>
          <Button onClick={handleNext} disabled={selectedSkills.length === 0}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepCreatorSkills;
