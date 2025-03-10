
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, FileText, Scale, Database, Filter } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { SearchResults } from '@/components/SearchResults';
import { useLegalCaseSearch, SearchParams } from '@/services/safliiService';

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
          <form onSubmit={handleSearch}>
            <div className="flex flex-col space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search legal databases..." 
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
                      <span>Searching...</span>
                    </div>
                  ) : (
                    <span>Search</span>
                  )}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Select value={court} onValueChange={setCourt}>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Court" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courts</SelectItem>
                      <SelectItem value="cc">Constitutional Court</SelectItem>
                      <SelectItem value="sca">Supreme Court of Appeal</SelectItem>
                      <SelectItem value="high">High Courts</SelectItem>
                      <SelectItem value="labour">Labour Court</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Year" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                      <SelectItem value="older">2019 & Older</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Select value={topic} onValueChange={setTopic}>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Topic" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Topics</SelectItem>
                      <SelectItem value="constitutional">Constitutional Law</SelectItem>
                      <SelectItem value="criminal">Criminal Law</SelectItem>
                      <SelectItem value="civil">Civil Procedure</SelectItem>
                      <SelectItem value="commercial">Commercial Law</SelectItem>
                      <SelectItem value="administrative">Administrative Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </form>
          
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
          
          {!hasSearched && (
            <div className="border-t pt-4 mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">SEARCH TIPS</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start p-3 bg-legal-lightBlue rounded-md">
                  <BookOpen className="h-5 w-5 text-legal-gold mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Boolean Operators</h4>
                    <p className="text-sm text-muted-foreground">Use AND, OR, NOT to refine searches</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-legal-lightBlue rounded-md">
                  <FileText className="h-5 w-5 text-legal-gold mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Exact Phrases</h4>
                    <p className="text-sm text-muted-foreground">Use quotes for exact matches</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-legal-lightBlue rounded-md">
                  <Scale className="h-5 w-5 text-legal-gold mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Case Citations</h4>
                    <p className="text-sm text-muted-foreground">Format: [Year] Volume Reporter Page</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="cases" className="mt-0">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search case law..." className="pl-10" />
            </div>
            <Button type="submit" className="bg-legal-navy hover:bg-legal-navy/90">
              Search
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="statutes" className="mt-0">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search statutes..." className="pl-10" />
            </div>
            <Button type="submit" className="bg-legal-navy hover:bg-legal-navy/90">
              Search
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="commentaries" className="mt-0">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search legal commentaries..." className="pl-10" />
            </div>
            <Button type="submit" className="bg-legal-navy hover:bg-legal-navy/90">
              Search
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
