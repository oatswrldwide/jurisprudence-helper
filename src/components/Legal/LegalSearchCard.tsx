
import React from 'react';
import { Database, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchInput } from '@/components/Search/SearchInput';
import { LimitReachedAlert } from '@/components/LimitReachedAlert';
import { CaseResult } from '@/services/legal/types';
import { hasReachedLimit } from '@/services/requestLimitService';
import { SearchLoading } from './SearchLoading';
import { NoResultsFound } from './NoResultsFound';
import { SearchResultsHeader } from './SearchResultsHeader';
import { CaseResultsList } from './CaseResultsList';

interface LegalSearchCardProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  loading: boolean;
  results: CaseResult[];
  onSubscribe: () => void;
  searchSource?: 'saflii' | 'precedenceAi';
}

export const LegalSearchCard: React.FC<LegalSearchCardProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  loading,
  results,
  onSubscribe,
  searchSource = 'saflii'
}) => {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3 bg-gradient-to-r from-legal-grey to-white">
        <CardTitle className="text-lg font-semibold text-legal-navy flex items-center gap-2">
          {searchSource === 'saflii' ? (
            <>
              <Database className="h-4 w-4 text-legal-gold" />
              SAFLII Case Law Search
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 text-legal-gold" />
              Precedence AI Search
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          loading={loading}
          searchSource={searchSource}
        />

        {searchSource === 'saflii' && hasReachedLimit() && (
          <div className="mt-4">
            <LimitReachedAlert onSubscribe={onSubscribe} />
          </div>
        )}
        
        {results.length === 0 && !loading && searchQuery && (
          <NoResultsFound searchQuery={searchQuery} loading={loading} />
        )}
        
        {loading && <SearchLoading />}
        
        {results.length > 0 && !loading && (
          <div className="mt-6 space-y-4">
            <SearchResultsHeader 
              resultsCount={results.length} 
              searchSource={searchSource}
            />
            <CaseResultsList results={results} loading={loading} searchSource={searchSource} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
