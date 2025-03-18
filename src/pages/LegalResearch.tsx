
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { CaseResult, searchSafliiCases } from '@/services/legal';
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { getRequestLimit, hasReachedLimit } from '@/services/requestLimitService';
import { LegalSearchCard } from '@/components/Legal/LegalSearchCard';
import { OpenAiKeyInput } from '@/components/OpenAiKeyInput';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { callCustomGpt } from '@/services/legal/openAiService';

const LegalResearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CaseResult[]>([]);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [searchSource, setSearchSource] = useState<'saflii' | 'precedenceAi'>('saflii');
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
    
    // If user has reached limit and using SAFLII, show subscription modal
    if (searchSource === 'saflii' && hasReachedLimit()) {
      setIsSubscriptionModalOpen(true);
      return;
    }
    
    setLoading(true);
    try {
      if (searchSource === 'saflii') {
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
      } else {
        // Use the custom GPT (Precedence AI)
        const { data, error } = await callCustomGpt(searchQuery);
        
        if (error) {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          });
          if (error.code === 'no_api_key') {
            // Focus on the API key input
            const apiKeyInput = document.querySelector('input[type="password"]');
            if (apiKeyInput) {
              (apiKeyInput as HTMLInputElement).focus();
            }
          }
          return;
        }
        
        setResults(data);
        
        toast({
          title: 'Precedence AI Search',
          description: `Found ${data.length} results using AI-powered search`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to search legal database',
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
      
      <Tabs 
        defaultValue="saflii" 
        value={searchSource}
        onValueChange={(value) => setSearchSource(value as 'saflii' | 'precedenceAi')}
        className="mb-4"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="saflii" className="data-[state=active]:bg-legal-navy data-[state=active]:text-white">
            SAFLII Database
          </TabsTrigger>
          <TabsTrigger value="precedenceAi" className="data-[state=active]:bg-legal-gold data-[state=active]:text-white">
            Precedence AI <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-0">GPT</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="saflii" className="mt-0">
          <LegalSearchCard
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            loading={loading}
            results={results}
            onSubscribe={() => setIsSubscriptionModalOpen(true)}
            searchSource={searchSource}
          />
        </TabsContent>
        
        <TabsContent value="precedenceAi" className="mt-0 space-y-4">
          <OpenAiKeyInput />
          
          <LegalSearchCard
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            loading={loading}
            results={results}
            onSubscribe={() => setIsSubscriptionModalOpen(true)}
            searchSource={searchSource}
          />
        </TabsContent>
      </Tabs>
      
      <SubscriptionModal 
        open={isSubscriptionModalOpen} 
        onOpenChange={setIsSubscriptionModalOpen}
      />
    </div>
  );
};

export default LegalResearch;
