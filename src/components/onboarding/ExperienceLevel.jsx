import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Award } from 'lucide-react';

const experienceLevels = [
  {
    value: 'beginner',
    title: 'Beginner',
    description: 'Just starting out, eager to learn and share basic knowledge'
  },
  {
    value: 'intermediate',
    title: 'Intermediate',
    description: 'Have some experience and can teach foundational concepts'
  },
  {
    value: 'expert',
    title: 'Expert',
    description: 'Highly experienced with deep knowledge to share advanced topics'
  }
];

const ExperienceLevel = ({ onNext, onBack, selectedLevel = '' }) => {
  const [selected, setSelected] = useState(selectedLevel);

  const handleNext = () => {
    onNext(selected);
  };

  return (
    <Card className="shadow-2xl border-0 animate-scale-in">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center shadow-lg">
          <Award className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold gradient-text">What's your experience level?</CardTitle>
        <CardDescription>
          This helps us understand your expertise
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selected} onValueChange={setSelected} className="space-y-4">
          {experienceLevels.map((level) => (
            <div key={level.value} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value={level.value} id={level.value} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={level.value} className="font-semibold cursor-pointer">
                  {level.title}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
        
        <div className="flex justify-between pt-4">
          <Button onClick={onBack} variant="outline">Back</Button>
          <Button onClick={handleNext} disabled={!selected}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceLevel;