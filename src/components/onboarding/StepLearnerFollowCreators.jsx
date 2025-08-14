
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { mockTrendingCreators } from '@/lib/mockData';
import { Users, Check } from 'lucide-react';

const StepLearnerFollowCreators = ({ nextStep, prevStep, updateData, data }) => {
  const [selectedCreators, setSelectedCreators] = useState(data);

  const toggleFollow = (creatorId) => {
    setSelectedCreators((prev) =>
      prev.includes(creatorId) ? prev.filter((id) => id !== creatorId) : [...prev, creatorId]
    );
  };

  const handleNext = () => {
    updateData('followedCreators', selectedCreators);
    nextStep();
  };

  return (
    <Card className="shadow-2xl border-0">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center shadow-lg">
          <Users className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold gradient-text">Follow Top Creators</CardTitle>
        <CardDescription>
          Get started by following some of our most popular creators
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto">
          {mockTrendingCreators.map((creator) => (
            <div 
              key={creator.id} 
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{creator.name}</h3>
                    {creator.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{creator.followers} followers</p>
                </div>
              </div>
              <Button
                onClick={() => toggleFollow(creator.id)}
                variant={selectedCreators.includes(creator.id) ? 'default' : 'outline'}
                size="sm"
              >
                {selectedCreators.includes(creator.id) ? 'Following' : 'Follow'}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          {selectedCreators.length} creators selected
        </div>
        
        <div className="flex justify-between pt-4">
          <Button onClick={prevStep} variant="outline">Back</Button>
          <Button onClick={handleNext}>Continue</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepLearnerFollowCreators;
