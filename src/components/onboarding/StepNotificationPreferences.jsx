
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

const StepNotificationPreferences = ({ handleSubmit, prevStep, updateData, data }) => {
  const [preferences, setPreferences] = useState(data);

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFinish = () => {
    updateData('notificationPreferences', preferences);
    handleSubmit();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notification Preferences</h2>
      <p className="text-muted-foreground mb-8">Stay up to date with the latest content and updates.</p>
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">Email Notifications</Label>
          <Switch
            id="email-notifications"
            checked={preferences.email}
            onCheckedChange={() => togglePreference('email')}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications">Push Notifications</Label>
          <Switch
            id="push-notifications"
            checked={preferences.push}
            onCheckedChange={() => togglePreference('push')}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="in-app-notifications">In-App Notifications</Label>
          <Switch
            id="in-app-notifications"
            checked={preferences.inApp}
            onCheckedChange={() => togglePreference('inApp')}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">Back</Button>
        <Button onClick={handleFinish}>Finish</Button>
      </div>
    </div>
  );
};

export default StepNotificationPreferences;
