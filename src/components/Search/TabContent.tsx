
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TabContentProps {
  placeholder: string;
}

export const TabContent: React.FC<TabContentProps> = ({ placeholder }) => {
  const [searchValue, setSearchValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchValue);
    // Add actual search functionality here
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder={placeholder} 
            className="pl-10" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <Button type="submit" className="bg-legal-navy hover:bg-legal-navy/90">
          Search
        </Button>
      </div>
    </form>
  );
};
