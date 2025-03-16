
import React from 'react';
import { Search, Brain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  loading: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  loading
}) => {
  return (
    <form onSubmit={handleSearch}>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Ask Precedence AI about legal cases, principles, or questions..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          type="submit" 
          className="bg-legal-navy hover:bg-legal-navy/90"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Analyzing...</span>
            </div>
          ) : (
            <span className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Search
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};
