
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, FileText, Scale } from 'lucide-react';

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-legal-navy mb-6">Legal Search</h2>
      
      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">All Sources</TabsTrigger>
          <TabsTrigger value="cases">Case Law</TabsTrigger>
          <TabsTrigger value="statutes">Statutes</TabsTrigger>
          <TabsTrigger value="commentaries">Commentaries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
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
            <Button type="submit" className="bg-legal-navy hover:bg-legal-navy/90">
              Search
            </Button>
          </div>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">SEARCH TIPS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start">
                <BookOpen className="h-5 w-5 text-legal-gold mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Use Boolean Operators</h4>
                  <p className="text-sm text-muted-foreground">Combine terms with AND, OR, NOT</p>
                </div>
              </div>
              <div className="flex items-start">
                <FileText className="h-5 w-5 text-legal-gold mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Exact Phrases</h4>
                  <p className="text-sm text-muted-foreground">Use quotes for exact matches</p>
                </div>
              </div>
              <div className="flex items-start">
                <Scale className="h-5 w-5 text-legal-gold mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Case Citations</h4>
                  <p className="text-sm text-muted-foreground">Format: [Year] Volume Reporter Page</p>
                </div>
              </div>
            </div>
          </div>
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
