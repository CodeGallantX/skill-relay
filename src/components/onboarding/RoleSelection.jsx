import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Video } from 'lucide-react';

const RoleSelection = ({ onSelect }) => {
  return (
    <Card className="shadow-2xl border-0 animate-scale-in">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-2xl">SR</span>
        </div>
        <CardTitle className="text-3xl font-bold gradient-text">Why are you here?</CardTitle>
        <CardDescription>
          Let's personalize your SkillRelay experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <Card 
            onClick={() => onSelect('learner')} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary group animate-fade-in"
          >
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">I'm here to Learn</h3>
              <p className="text-muted-foreground">Discover new skills and learn from expert creators</p>
            </CardContent>
          </Card>
          
          <Card 
            onClick={() => onSelect('creator')} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary group animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <CardContent className="p-6 text-center">
              <Video className="h-12 w-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">I'm here to Create</h3>
              <p className="text-muted-foreground">Share your expertise and build an audience</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleSelection;