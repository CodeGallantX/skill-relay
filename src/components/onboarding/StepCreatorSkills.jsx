
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { api } from '../../lib/api';
import { mockCategories } from '../../lib/mockData';

const StepCreatorSkills = ({ nextStep, prevStep, updateData, data }) => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(data);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get('/categories');
        setSkills(response.data);
      } catch (error) {
        console.error('Failed to fetch skills', error);
        setSkills(mockCategories);
      }
    };
    fetchSkills();
  }, []);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleNext = () => {
    updateData('skills', selectedSkills);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What are your skills?</h2>
      <p className="text-muted-foreground mb-8">Select the categories that best match your expertise.</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {skills.map((skill) => (
          <Badge
            key={skill.id}
            variant={selectedSkills.includes(skill.id) ? 'default' : 'outline'}
            onClick={() => toggleSkill(skill.id)}
            className="cursor-pointer"
          >
            {skill.name}
          </Badge>
        ))}
      </div>
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">Back</Button>
        <Button onClick={handleNext} disabled={selectedSkills.length === 0}>Continue</Button>
      </div>
    </div>
  );
};

export default StepCreatorSkills;
