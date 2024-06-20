import { Input } from '@/components/ui/input';
import React from 'react';

interface SearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search by country or institution"
        value={searchQuery}
        onChange={onSearchChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default Search;
