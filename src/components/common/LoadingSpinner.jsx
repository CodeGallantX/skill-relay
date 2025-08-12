import React from 'react';
import { cn } from '@/lib/utils';

export const LoadingSpinner = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div className={cn(
      'animate-spin rounded-full border-2 border-muted border-t-primary',
      sizeClasses[size],
      className
    )} />
  );
};

export const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <LoadingSpinner size="xl" />
      <p className="mt-4 text-muted-foreground">{message}</p>
    </div>
  );
};

export const LoadingCard = ({ className }) => {
  return (
    <div className={cn('animate-pulse', className)}>
      <div className="bg-muted rounded-lg aspect-[9/16] mb-4"></div>
      <div className="space-y-2">
        <div className="bg-muted h-4 rounded w-3/4"></div>
        <div className="bg-muted h-3 rounded w-1/2"></div>
      </div>
    </div>
  );
};