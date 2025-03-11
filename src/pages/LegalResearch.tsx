
import React, { useState } from 'react';
import { SearchInput } from '@/components/Search/SearchInput';
import { useToast } from '@/components/ui/use-toast';
import { CaseResult, searchSafliiCases } from '@/services/safliiService';
import { LimitReachedAlert } from '@/components/LimitReachedAlert';
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { getRequestLimit, hasReachedLimit } from '@/services/requestLimitService';
import { Hourglass, Database, ChevronDown, ArrowUpRight, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const LegalResearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CaseResult[]>([]);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: 'Please enter a search query',
        variant: 'destructive',
      });
      return;
    }
    
    // If user has reached limit, show subscription modal
    if (hasReachedLimit()) {
      setIsSubscriptionModalOpen(true);
      return;
    }
    
    setLoading(true);
    try {
      const { data, limitReached } = await searchSafliiCases(searchQuery);
      
      if (limitReached) {
        setIsSubscriptionModalOpen(true);
        return;
      }
      
      setResults(data);
      
      // Show request count in toast
      const { count, isPremium } = getRequestLimit();
      if (!isPremium) {
        toast({
          title: 'SAFLII Search',
          description: `You have used ${count}/3 free daily requests`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to search SAFLII database',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl py-6 space-y-6">
      <h1 className="text-2xl font-bold text-legal-navy mb-2">Legal Research</h1>
      <p className="text-muted-foreground mb-4">
        Search South Africa's comprehensive legal database for cases, statutes, and legal resources
      </p>
      
      <Card className="border shadow-sm">
        <CardHeader className="pb-3 bg-gradient-to-r from-legal-grey to-white">
          <CardTitle className="text-lg font-semibold text-legal-navy flex items-center gap-2">
            <Database className="h-4 w-4 text-legal-gold" />
            SAFLII Case Law Search
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            loading={loading}
          />

          {hasReachedLimit() && (
            <div className="mt-4">
              <LimitReachedAlert onSubscribe={() => setIsSubscriptionModalOpen(true)} />
            </div>
          )}
          
          {!hasReachedLimit() && results.length === 0 && !loading && searchQuery && (
            <div className="mt-6 text-center py-8">
              <Layers className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-legal-navy">No results found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search terms or explore different legal topics
              </p>
            </div>
          )}
          
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center">
                <Hourglass className="h-8 w-8 text-legal-gold animate-pulse mb-3" />
                <p className="text-muted-foreground">Searching SAFLII database...</p>
              </div>
            </div>
          )}
          
          {results.length > 0 && !loading && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-legal-navy">
                  Found {results.length} results
                </h3>
                <p className="text-sm text-muted-foreground">
                  {getRequestLimit().isPremium ? 
                    'Premium access' : 
                    `${getRequestLimit().count}/3 daily requests used`}
                </p>
              </div>
              
              <div className="space-y-4">
                {results.map((caseItem) => (
                  <Collapsible key={caseItem.id} className="border rounded-md overflow-hidden">
                    <div className="p-4 bg-white">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-legal-navy">
                          {caseItem.title}
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          {caseItem.date}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground gap-2 mb-2">
                        <span className="font-medium bg-legal-lightBlue px-2 py-0.5 rounded-sm">
                          {caseItem.citation}
                        </span>
                        <span>•</span>
                        <span>{caseItem.court}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{caseItem.summary}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 flex-wrap">
                          {caseItem.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-legal-grey hover:bg-legal-grey/80">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <CollapsibleTrigger className="flex items-center text-sm text-legal-gold hover:text-legal-gold/80">
                          <span>View details</span>
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </CollapsibleTrigger>
                      </div>
                    </div>
                    
                    <CollapsibleContent>
                      <div className="p-4 bg-legal-grey/20 border-t">
                        <h4 className="font-medium mb-2">Full Case Details</h4>
                        <p className="text-sm mb-3">
                          This is where additional case details would appear, such as the full
                          judgment text, legal principles, precedents cited, and more.
                        </p>
                        <a 
                          href={caseItem.safliiLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center text-sm text-legal-gold hover:underline"
                        >
                          <span>View on SAFLII</span>
                          <ArrowUpRight className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <SubscriptionModal 
        open={isSubscriptionModalOpen} 
        onOpenChange={setIsSubscriptionModalOpen}
      />
    </div>
  );
};

export default LegalResearch;
