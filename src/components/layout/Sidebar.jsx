import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  Compass, 
  BookOpen, 
  Users, 
  TrendingUp,
  Heart,
  Clock,
  Star,
  Settings,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const navigationItems = [
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: Compass, label: 'Explore', href: '/explore' },
  { icon: TrendingUp, label: 'Trending', href: '/trending' },
  { icon: Users, label: 'Following', href: '/following', requiresAuth: true },
];

const libraryItems = [
  { icon: BookOpen, label: 'My Lessons', href: '/my-lessons', requiresAuth: true },
  { icon: Heart, label: 'Liked', href: '/liked', requiresAuth: true },
  { icon: Clock, label: 'Watch Later', href: '/watch-later', requiresAuth: true },
  { icon: Star, label: 'Favorites', href: '/favorites', requiresAuth: true },
];

const categories = [
  'Programming',
  'Design',
  'Marketing',
  'Photography',
  'Music',
  'Business',
  'Cooking',
  'Fitness'
];

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const NavItem = ({ icon: Icon, label, href, requiresAuth = false }) => {
    if (requiresAuth && !isAuthenticated) return null;

    const isActive = location.pathname === href;
    
    return (
      <Button
        asChild
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start",
          isActive && "bg-secondary text-secondary-foreground"
        )}
        onClick={onClose}
      >
        <Link to={href}>
          <Icon className="mr-3 h-4 w-4" />
          {label}
        </Link>
      </Button>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r bg-background transition-transform duration-200 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col overflow-y-auto p-4">
          {/* Main Navigation */}
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>

          <Separator className="my-4" />

          {/* Library Section */}
          {isAuthenticated && (
            <>
              <div className="space-y-1">
                <h3 className="mb-2 px-3 text-sm font-semibold text-muted-foreground">
                  Library
                </h3>
                {libraryItems.map((item) => (
                  <NavItem key={item.href} {...item} />
                ))}
              </div>

              <Separator className="my-4" />
            </>
          )}

          {/* Categories */}
          <div className="space-y-1">
            <h3 className="mb-2 px-3 text-sm font-semibold text-muted-foreground">
              Categories
            </h3>
            {categories.map((category) => (
              <Button
                key={category}
                asChild
                variant="ghost"
                className="w-full justify-start"
                onClick={onClose}
              >
                <Link to={`/category/${category.toLowerCase()}`}>
                  {category}
                </Link>
              </Button>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Footer Links */}
          <div className="mt-auto space-y-1">
            <NavItem icon={Settings} label="Settings" href="/settings" />
            <NavItem icon={HelpCircle} label="Help & Support" href="/help" />
          </div>
        </div>
      </aside>
    </>
  );
};