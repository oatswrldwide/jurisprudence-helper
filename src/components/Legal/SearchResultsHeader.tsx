
import React from 'react';
import { getRequestLimit } from '@/services/requestLimitService';

interface SearchResultsHeaderProps {
  resultsCount: number;
}

export const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({ resultsCount }) => {
  if (resultsCount === 0) {
    return null;
  }

  return (
    <div className="flex justify-between items-center">
      <h3 className="font-medium text-legal-navy">
        Found {resultsCount} results
      </h3>
      <p className="text-sm text-muted-foreground">
        {getRequestLimit().isPremium ? 
          'Premium access' : 
          `${getRequestLimit().count}/3 daily requests used`}
      </p>
    </div>
  );
};
