
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { CaseResult } from '@/services/legal';
import { searchWithCustomGpt } from '@/services/legal/customGptService';
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { getRequestLimit, hasReachedLimit } from '@/services/requestLimitService';
import { LegalSearchCard } from '@/components/Legal/LegalSearchCard';
import { Brain } from 'lucide-react';

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
    
    // Show searching toast
    toast({
      title: 'Searching with Precedence AI',
      description: 'Analyzing legal databases and case law...',
      duration: 3000,
    });
    
    try {
      // Use the custom GPT service instead of SAFLII
      const { data, limitReached } = await searchWithCustomGpt(searchQuery);
      
      if (limitReached) {
        setIsSubscriptionModalOpen(true);
        return;
      }
      
      setResults(data);
      
      // Show request count in toast
      const { count, isPremium } = getRequestLimit();
      if (!isPremium) {
        toast({
          title: 'Search Complete',
          description: `You have used ${count}/3 free daily requests`,
        });
      } else {
        toast({
          title: 'Search Complete',
          description: 'Results analyzed by Precedence AI',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to search with Precedence AI',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl py-6 space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-legal-navy">Legal Research</h1>
        <div className="bg-legal-gold/10 p-1 rounded">
          <Brain className="h-5 w-5 text-legal-gold" />
        </div>
        <span className="text-sm font-medium bg-legal-lightBlue px-2 py-1 rounded text-legal-navy">
          Powered by Precedence AI
        </span>
      </div>
      
      <p className="text-muted-foreground mb-4">
        Search South Africa's comprehensive legal database using advanced AI technology
      </p>
      
      <LegalSearchCard
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        loading={loading}
        results={results}
        onSubscribe={() => setIsSubscriptionModalOpen(true)}
      />
      
      <SubscriptionModal 
        open={isSubscriptionModalOpen} 
        onOpenChange={setIsSubscriptionModalOpen}
      />
    </div>
  );
};

export default LegalResearch;
