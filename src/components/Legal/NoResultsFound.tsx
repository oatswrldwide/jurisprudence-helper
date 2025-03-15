
import React from 'react';
import { Layers } from 'lucide-react';

interface NoResultsFoundProps {
  searchQuery: string;
  loading: boolean;
}

export const NoResultsFound: React.FC<NoResultsFoundProps> = ({ searchQuery, loading }) => {
  if (!searchQuery || loading) {
    return null;
  }

  return (
    <div className="mt-6 text-center py-8">
      <Layers className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
      <h3 className="text-lg font-medium text-legal-navy">No results found</h3>
      <p className="text-muted-foreground mt-1">
        Try adjusting your search terms or explore different legal topics
      </p>
    </div>
  );
};
