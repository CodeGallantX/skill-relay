import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

const skillCategories = [
  {
    name: 'Technology',
    skills: ['Web Development', 'Mobile Apps', 'AI/ML', 'Data Science', 'Cybersecurity', 'Cloud Computing']
  },
  {
    name: 'Creative',
    skills: ['Graphic Design', 'Video Editing', 'Photography', 'Music Production', 'Animation', 'Writing']
  },
  {
    name: 'Business',
    skills: ['Marketing', 'Sales', 'Finance', 'Management', 'Entrepreneurship', 'Project Management']
  },
  {
    name: 'Lifestyle',
    skills: ['Cooking', 'Fitness', 'Travel', 'Fashion', 'Home Improvement', 'Gardening']
  }
];

const SkillSelection = ({ onNext, onBack, selectedSkills = [] }) => {
  const [selected, setSelected] = useState(selectedSkills);

  const toggleSkill = (skill) => {
    setSelected(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleNext = () => {
    onNext(selected);
  };

  return (
    <Card className="shadow-2xl border-0 animate-scale-in">
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
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {skillCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selected.includes(skill) ? 'default' : 'outline'}
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
          {selected.length} skill{selected.length !== 1 ? 's' : ''} selected
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

export default SkillSelection;