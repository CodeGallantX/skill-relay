import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, User, Bell, Shield, Palette, Camera } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'sonner';

const SettingsPage = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const [profile, setProfile] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    bio: 'Passionate learner and creator',
    website: 'https://johndoe.com'
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    newFollowers: true,
    lessonUpdates: true
  });
  
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    allowMessages: true
  });

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences updated!');
  };

  const handleSavePrivacy = () => {
    toast.success('Privacy settings updated!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center space-x-3 mb-2">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold gradient-text">Settings</h1>
        </div>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>
                Update your personal information and profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-lg">{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={profile.website}
                  onChange={(e) => setProfile({...profile, website: e.target.value})}
                  placeholder="https://yourwebsite.com"
                />
              </div>
              
              <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="new-followers">New Followers</Label>
                    <p className="text-sm text-muted-foreground">Get notified when someone follows you</p>
                  </div>
                  <Switch
                    id="new-followers"
                    checked={notifications.newFollowers}
                    onCheckedChange={(checked) => setNotifications({...notifications, newFollowers: checked})}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="lesson-updates">Lesson Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new lessons from creators you follow</p>
                  </div>
                  <Switch
                    id="lesson-updates"
                    checked={notifications.lessonUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, lessonUpdates: checked})}
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveNotifications} className="w-full md:w-auto">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Privacy Settings</span>
              </CardTitle>
              <CardDescription>
                Control who can see your information and interact with you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="profile-public">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
                  </div>
                  <Switch
                    id="profile-public"
                    checked={privacy.profilePublic}
                    onCheckedChange={(checked) => setPrivacy({...privacy, profilePublic: checked})}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-email">Show Email</Label>
                    <p className="text-sm text-muted-foreground">Display your email address on your profile</p>
                  </div>
                  <Switch
                    id="show-email"
                    checked={privacy.showEmail}
                    onCheckedChange={(checked) => setPrivacy({...privacy, showEmail: checked})}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-messages">Allow Messages</Label>
                    <p className="text-sm text-muted-foreground">Let other users send you direct messages</p>
                  </div>
                  <Switch
                    id="allow-messages"
                    checked={privacy.allowMessages}
                    onCheckedChange={(checked) => setPrivacy({...privacy, allowMessages: checked})}
                  />
                </div>
              </div>
              
              <Button onClick={handleSavePrivacy} className="w-full md:w-auto">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Appearance</span>
              </CardTitle>
              <CardDescription>
                Customize how SkillRelay looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Theme</Label>
                  <p className="text-sm text-muted-foreground mb-4">Choose your preferred theme</p>
                  <div className="grid grid-cols-3 gap-4">
                    <Card 
                      className={`cursor-pointer transition-all hover:shadow-md ${theme === 'light' ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setTheme('light')}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="w-full h-20 bg-white border rounded mb-2"></div>
                        <p className="text-sm font-medium">Light</p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`cursor-pointer transition-all hover:shadow-md ${theme === 'dark' ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setTheme('dark')}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="w-full h-20 bg-gray-900 border rounded mb-2"></div>
                        <p className="text-sm font-medium">Dark</p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`cursor-pointer transition-all hover:shadow-md ${theme === 'system' ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setTheme('system')}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="w-full h-20 bg-gradient-to-r from-white to-gray-900 border rounded mb-2"></div>
                        <p className="text-sm font-medium">System</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;