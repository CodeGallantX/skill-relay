import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle } from 'lucide-react';

const sources = [
  'Social Media',
  'Friend Recommendation',
  'Google Search',
  'YouTube',
  'Advertisement',
  'Blog/Article',
  'Podcast',
  'Other'
];

const HowDidYouHear = ({ onFinish, onBack, selectedSource = '' }) => {
  const [selected, setSelected] = useState(selectedSource);

  const handleFinish = () => {
    onFinish(selected);
  };

  return (
    <Card className="shadow-2xl border-0 animate-scale-in">
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
        <Select onValueChange={setSelected} value={selected}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select how you found us" />
          </SelectTrigger>
          <SelectContent>
            {sources.map((source) => (
              <SelectItem key={source} value={source}>{source}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex justify-between pt-4">
          <Button onClick={onBack} variant="outline">Back</Button>
          <Button onClick={handleFinish} disabled={!selected} className="shadow-glow">
            Finish Setup
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HowDidYouHear;