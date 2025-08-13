
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { api } from '../../lib/api';
import { mockTrendingCreators } from '../../lib/mockData';

const StepLearnerFollowCreators = ({ nextStep, prevStep, updateData, data }) => {
  const [creators, setCreators] = useState([]);
  const [selectedCreators, setSelectedCreators] = useState(data);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await api.get('/creators/top');
        setCreators(response.data);
      } catch (error) {
        console.error('Failed to fetch top creators', error);
        setCreators(mockTrendingCreators);
      }
    };
    fetchCreators();
  }, []);

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
    <div>
      <h2 className="text-2xl font-bold mb-4">Follow Top Creators</h2>
      <p className="text-muted-foreground mb-8">Get started by following some of our most popular creators.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {creators.map((creator) => (
          <div key={creator.id} className="flex flex-col items-center p-4 border rounded-lg">
            <Avatar className="w-16 h-16 mb-2">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold">{creator.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{creator.followers} followers</p>
            <Button
              onClick={() => toggleFollow(creator.id)}
              variant={selectedCreators.includes(creator.id) ? 'default' : 'outline'}
            >
              {selectedCreators.includes(creator.id) ? 'Following' : 'Follow'}
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">Back</Button>
        <Button onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
};

export default StepLearnerFollowCreators;
