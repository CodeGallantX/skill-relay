@@ .. @@
-import React from 'react';
+import React, { useState } from 'react';
+import { useNavigate } from 'react-router-dom';
 import { Button } from './ui/button'; // Assuming button component is available
+import { Dialog, DialogContent } from '@/components/ui/dialog';
+import { AuthForm } from '@/components/auth/AuthForm';
+import { useAuth } from '@/hooks/useAuth';

 const LandingPage = () => {
+  const [showAuthModal, setShowAuthModal] = useState(false);
+  const { isAuthenticated } = useAuth();
+  const navigate = useNavigate();
+
+  const handleGetStarted = () => {
+    if (isAuthenticated) {
+      navigate('/dashboard');
+    } else {
+      setShowAuthModal(true);
+    }
+  };
+
+  const handleAuthSuccess = () => {
+    setShowAuthModal(false);
+    navigate('/onboarding');
+  };
+
   return (
-    <div className="min-h-screen bg-background text-foreground">
+    <>
+      <div className="min-h-screen bg-background text-foreground">
@@ .. @@
           <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
-            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full text-lg shadow-lg transition duration-300">
+            <Button 
+              onClick={handleGetStarted}
+              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full text-lg shadow-lg transition duration-300"
+            >
               Start Learning
             </Button>
-            <Button variant="outline" className="border-primary text-primary hover:bg-accent/10 px-8 py-3 rounded-full text-lg shadow-lg transition duration-300">
+            <Button 
+              onClick={handleGetStarted}
+              variant="outline" 
+              className="border-primary text-primary hover:bg-accent/10 px-8 py-3 rounded-full text-lg shadow-lg transition duration-300"
+            >
               Become a Creator
             </Button>
           </div>
@@ .. @@
           <p className="text-lg md:text-xl mb-8">
             Join SkillRelay today and begin learning, creating, and earning.
           </p>
-          <Button className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary px-10 py-4 rounded-full text-xl font-semibold shadow-lg transition duration-300">
+          <Button 
+            onClick={handleGetStarted}
+            className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary px-10 py-4 rounded-full text-xl font-semibold shadow-lg transition duration-300"
+          >
             Get Started Now
           </Button>
         </div>
@@ .. @@
         </div>
       </footer>
     </div>
+
+      {/* Auth Modal */}
+      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
+        <DialogContent className="sm:max-w-md">
+          <AuthForm onSuccess={handleAuthSuccess} />
+        </DialogContent>
+      </Dialog>
+    </>
   );
 };