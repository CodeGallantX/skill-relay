
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { api } from '../../lib/api';
import { mockCategories } from '../../lib/mockData';

const StepLearnerInterests = ({ nextStep, prevStep, updateData, data }) => {
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState(data);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await api.get('/categories');
        setInterests(response.data);
      } catch (error) {
        console.error('Failed to fetch interests', error);
        setInterests(mockCategories);
      }
    };
    fetchInterests();
  }, []);

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleNext = () => {
    updateData('interests', selectedInterests);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What are you interested in?</h2>
      <p className="text-muted-foreground mb-8">Select at least 3 interests to personalize your experience.</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {interests.map((interest) => (
          <Badge
            key={interest.id}
            variant={selectedInterests.includes(interest.id) ? 'default' : 'outline'}
            onClick={() => toggleInterest(interest.id)}
            className="cursor-pointer"
          >
            {interest.name}
          </Badge>
        ))}
      </div>
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">Back</Button>
        <Button onClick={handleNext} disabled={selectedInterests.length < 3}>Continue</Button>
      </div>
    </div>
  );
};

export default StepLearnerInterests;
