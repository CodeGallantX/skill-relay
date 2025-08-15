import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video } from 'lucide-react';

const contentTypes = [
  'Video Tutorials', 'Live Streams', 'Courses', 'Quick Tips',
  'Workshops', 'Podcasts', 'Webinars', 'Masterclasses'
];

const ContentTypeSelection = ({ onNext, onBack, selectedTypes = [] }) => {
  const [selected, setSelected] = useState(selectedTypes);

  const toggleType = (type) => {
    setSelected(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleNext = () => {
    onNext(selected);
  };

  return (
    <Card className="shadow-2xl border-0 animate-scale-in">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center shadow-lg">
          <Video className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold gradient-text">What will you create?</CardTitle>
        <CardDescription>
          Select the types of content you plan to share
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {contentTypes.map((type) => (
            <Badge
              key={type}
              variant={selected.includes(type) ? 'default' : 'outline'}
              onClick={() => toggleType(type)}
              className="cursor-pointer hover:scale-105 transition-transform text-sm py-2 px-4"
            >
              {type}
            </Badge>
          ))}
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          {selected.length} content type{selected.length !== 1 ? 's' : ''} selected
        </div>
        
        <div className="flex justify-between pt-4">
          <Button onClick={onBack} variant="outline">Back</Button>
          <Button onClick={handleNext} disabled={selected.length === 0}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentTypeSelection;