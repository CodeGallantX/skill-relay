import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';

const TrendingTagsSection = ({ tags }) => {
  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Tag className="h-5 w-5 text-primary" />
          <span>Trending Tags</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag.id} variant="secondary" className="cursor-pointer hover:bg-muted-foreground/20 transition-colors">
            {tag.name} ({tag.count})
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
};

export default TrendingTagsSection;
