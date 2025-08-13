import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCategories, mockSortOptions } from '@/lib/mockData';

const FilterSortBar = ({ onSortChange, onFilterChange, currentSort, currentFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <Select onValueChange={onSortChange} value={currentSort}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {mockSortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onFilterChange} value={currentFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {mockCategories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Add a search input if needed for filtering by title/creator */}
      {/* <Input 
        placeholder="Search lessons..."
        className="w-full sm:w-[250px]"
        onChange={(e) => onSearchChange(e.target.value)}
      /> */}
    </div>
  );
};

export default FilterSortBar;
