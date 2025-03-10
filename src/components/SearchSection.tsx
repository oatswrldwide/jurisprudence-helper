
import React, { useState } from 'react';
import { Database } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchResults } from '@/components/SearchResults';
import { useLegalCaseSearch, SearchParams } from '@/services/safliiService';
import { SearchInput } from '@/components/Search/SearchInput';
import { SearchFilters } from '@/components/Search/SearchFilters';
import { SearchTips } from '@/components/Search/SearchTips';
import { TabContent } from '@/components/Search/TabContent';

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [court, setCourt] = useState<string>('all');
  const [year, setYear] = useState<string>('all');
  const [topic, setTopic] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');
  const [hasSearched, setHasSearched] = useState(false);
  
  const searchParams: SearchParams = {
    query: searchQuery,
    court,
    year,
    topic,
    page: 1,
    limit: 10
  };
  
  const { cases, loading, error, totalResults } = useLegalCaseSearch(
    hasSearched ? searchParams : { ...searchParams, query: '' }
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setHasSearched(true);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md border p-6">
      <div className="flex items-center gap-3 mb-6">
        <Database className="h-5 w-5 text-legal-gold" />
        <h2 className="text-xl font-semibold text-legal-navy">SAFLII Legal Search</h2>
      </div>
      
      <Tabs 
        defaultValue="all" 
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          setHasSearched(false);
        }}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all" className="data-[state=active]:bg-legal-gold data-[state=active]:text-white">
            All Sources
          </TabsTrigger>
          <TabsTrigger value="cases" className="data-[state=active]:bg-legal-gold data-[state=active]:text-white">
            Case Law
          </TabsTrigger>
          <TabsTrigger value="statutes" className="data-[state=active]:bg-legal-gold data-[state=active]:text-white">
            Statutes
          </TabsTrigger>
          <TabsTrigger value="commentaries" className="data-[state=active]:bg-legal-gold data-[state=active]:text-white">
            Commentaries
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0 space-y-4">
          <div className="flex flex-col space-y-4">
            <SearchInput 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              loading={loading}
            />
            
            <SearchFilters
              court={court}
              setCourt={setCourt}
              year={year}
              setYear={setYear}
              topic={topic}
              setTopic={setTopic}
            />
          </div>
          
          {hasSearched && (
            <div className="mt-6 border-t pt-4">
              <SearchResults 
                cases={cases} 
                loading={loading} 
                error={error} 
                totalResults={totalResults} 
              />
            </div>
          )}
          
          {!hasSearched && <SearchTips />}
        </TabsContent>
        
        <TabsContent value="cases" className="mt-0">
          <TabContent placeholder="Search case law..." />
        </TabsContent>
        
        <TabsContent value="statutes" className="mt-0">
          <TabContent placeholder="Search statutes..." />
        </TabsContent>
        
        <TabsContent value="commentaries" className="mt-0">
          <TabContent placeholder="Search legal commentaries..." />
        </TabsContent>
      </Tabs>
    </div>
  );
};
