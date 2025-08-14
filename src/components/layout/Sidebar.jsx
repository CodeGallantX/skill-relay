import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  HelpCircle,
  PlayCircle,
  Bookmark,
  FolderOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useApp } from '@/context/AppContext';

const navigationItems = [
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: Compass, label: 'Explore', href: '/dashboard/explore' },
  { icon: TrendingUp, label: 'Trending', href: '/dashboard/trending' },
  { icon: Users, label: 'Following', href: '/dashboard/following', requiresAuth: true },
];

const libraryItems = [
  { icon: FolderOpen, label: 'Library', href: '/dashboard/library', requiresAuth: true },
  { icon: PlayCircle, label: 'My Lessons', href: '/dashboard/my-lessons', requiresAuth: true, creatorOnly: true },
  { icon: Heart, label: 'Liked', href: '/dashboard/liked', requiresAuth: true },
  { icon: Clock, label: 'Watch Later', href: '/dashboard/watch-later', requiresAuth: true },
  { icon: Bookmark, label: 'Favorites', href: '/dashboard/favorites', requiresAuth: true },
];

const categories = [
  'Programming',
  'Design',
  'Marketing',
  'Photography',
  'Music',
  'Business',
  'Cooking',
  'Fitness',
  'Art',
  'Language Learning',
  'Science'
];

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { state } = useApp();

  const NavItem = ({ icon: Icon, label, href, requiresAuth = false, creatorOnly = false }) => {
    if (requiresAuth && !isAuthenticated) return null;
    if (creatorOnly && state.onboardingData.role !== 'creator') return null;

    const isActive = location.pathname === href || (href !== '/dashboard' && location.pathname.startsWith(href));
    
    return (
      <Button
        asChild
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start h-10",
          isActive && "bg-primary/10 text-primary border-r-2 border-primary"
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
        "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r bg-background transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0 animate-slide-in-left" : "-translate-x-full animate-slide-out-left"
      )}>
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col p-4 space-y-2">
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
            <div className="space-y-1 flex-1">
            <h3 className="mb-2 px-3 text-sm font-semibold text-muted-foreground">
              Categories
            </h3>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {categories.map((category) => (
              <Button
                key={category}
                asChild
                variant="ghost"
                  className="w-full justify-start h-9 text-sm"
                onClick={onClose}
              >
                  <Link to={`/dashboard/category/${category.toLowerCase().replace(/ /g, '-')}`}>
                  {category}
                </Link>
              </Button>
            ))}
              </div>
          </div>

            <Separator className="my-4" />

          {/* Footer Links */}
            <div className="space-y-1">
            <NavItem icon={Settings} label="Settings" href="/dashboard/settings" />
            <NavItem icon={HelpCircle} label="Help & Support" href="/dashboard/help" />
          </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};
