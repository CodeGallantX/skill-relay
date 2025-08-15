import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const interests = [
  'Programming', 'Design', 'Marketing', 'Photography', 'Music', 'Business',
  'Cooking', 'Fitness', 'Art', 'Writing', 'Language Learning', 'Science',
  'Gaming', 'Fashion', 'Travel', 'Finance', 'Health', 'Technology'
];

const InterestSelection = ({ onNext, onBack, selectedInterests = [] }) => {
  const [selected, setSelected] = useState(selectedInterests);

  const toggleInterest = (interest) => {
    setSelected(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleNext = () => {
    onNext(selected);
  };

  return (
    <Card className="shadow-2xl border-0 animate-scale-in">
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
          {interests.map((interest) => (
            <Badge
              key={interest}
              variant={selected.includes(interest) ? 'default' : 'outline'}
              onClick={() => toggleInterest(interest)}
              className="cursor-pointer hover:scale-105 transition-transform text-sm py-2 px-4"
            >
              {interest}
            </Badge>
          ))}
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          {selected.length}/3 minimum selected
        </div>
        
        <div className="flex justify-between pt-4">
          <Button onClick={onBack} variant="outline">Back</Button>
          <Button onClick={handleNext} disabled={selected.length < 3}>
            Continue ({selected.length})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterestSelection;