
import React from 'react';
import { Button } from '../ui/button';

const StepRoleSelection = ({ nextStep, updateData }) => {
  const handleSelectRole = (role) => {
    updateData('role', role);
    nextStep();
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to Skill Relay!</h2>
      <p className="text-muted-foreground mb-8">To get started, please select your role.</p>
      <div className="flex justify-center gap-4">
        <Button onClick={() => handleSelectRole('learner')} size="lg">Learner</Button>
        <Button onClick={() => handleSelectRole('creator')} size="lg">Creator</Button>
      </div>
    </div>
  );
};

export default StepRoleSelection;
