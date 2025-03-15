
import React from 'react';
import { Hourglass } from 'lucide-react';

export const SearchLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="flex flex-col items-center">
        <Hourglass className="h-8 w-8 text-legal-gold animate-pulse mb-3" />
        <p className="text-muted-foreground">Searching SAFLII database...</p>
      </div>
    </div>
  );
};
