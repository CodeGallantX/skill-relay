import React from 'react';
import { Button } from '@/components/ui/button';

const TimeframeFilter = ({ currentTimeframe, onTimeframeChange }) => {
  const timeframes = [
    { value: 'week', label: 'Past Week' },
    { value: 'month', label: 'Past Month' },
    { value: 'all', label: 'All Time' },
  ];

  return (
    <div className="flex space-x-2 mb-6">
      {timeframes.map((tf) => (
        <Button
          key={tf.value}
          variant={currentTimeframe === tf.value ? 'default' : 'outline'}
          onClick={() => onTimeframeChange(tf.value)}
        >
          {tf.label}
        </Button>
      ))}
    </div>
  );
};

export default TimeframeFilter;
