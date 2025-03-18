
import React from 'react';
import { Search, Brain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  loading: boolean;
  searchSource?: 'saflii' | 'precedenceAi';
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  loading,
  searchSource = 'saflii'
}) => {
  return (
    <form onSubmit={handleSearch}>
      <div className="flex gap-3">
        <div className="relative flex-1">
          {searchSource === 'saflii' ? (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          ) : (
            <Brain className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          )}
          <Input
            placeholder={searchSource === 'saflii' ? "Search legal databases..." : "Ask Precedence AI about South African law..."}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          type="submit" 
          className={`${searchSource === 'saflii' ? 'bg-legal-navy hover:bg-legal-navy/90' : 'bg-legal-gold hover:bg-legal-gold/90'}`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>{searchSource === 'saflii' ? 'Searching...' : 'Processing...'}</span>
            </div>
          ) : (
            <span>{searchSource === 'saflii' ? 'Search' : 'Ask AI'}</span>
          )}
        </Button>
      </div>
    </form>
  );
};
