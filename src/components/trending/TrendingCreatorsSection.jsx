import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';

const TrendingCreatorsSection = ({ creators }) => {
  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <span>Trending Creators</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {creators.map((creator) => (
          <div key={creator.id} className="flex items-center space-x-3 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors">
            <Avatar className="h-10 w-10">
              <AvatarImage src={creator.avatar} />
              <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{creator.name}</p>
              <p className="text-sm text-muted-foreground">{creator.followers} followers</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TrendingCreatorsSection;
