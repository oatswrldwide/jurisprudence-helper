
import React from 'react';
import { Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SearchResultsHeaderProps {
  resultsCount: number;
  searchSource?: 'saflii' | 'precedenceAi';
}

export const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({ 
  resultsCount,
  searchSource = 'saflii'
}) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium flex items-center">
        Found <span className={`font-bold ${searchSource === 'precedenceAi' ? 'text-legal-gold' : 'text-legal-navy'} mx-1`}>{resultsCount}</span> results
        {searchSource === 'precedenceAi' && (
          <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-0 flex items-center gap-1">
            <Brain className="h-3 w-3" />
            AI-Generated
          </Badge>
        )}
      </h3>
      <div className="text-sm text-muted-foreground">
        Showing 1-{resultsCount} of {resultsCount}
      </div>
    </div>
  );
};
