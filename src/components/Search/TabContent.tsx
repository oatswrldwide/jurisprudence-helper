
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TabContentProps {
  placeholder: string;
}

export const TabContent: React.FC<TabContentProps> = ({ placeholder }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder={placeholder} className="pl-10" />
        </div>
        <Button type="submit" className="bg-legal-navy hover:bg-legal-navy/90">
          Search
        </Button>
      </div>
    </form>
  );
};
