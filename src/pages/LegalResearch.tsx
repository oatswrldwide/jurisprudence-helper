
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { CaseResult, searchSafliiCases } from '@/services/legal';
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { getRequestLimit, hasReachedLimit } from '@/services/requestLimitService';
import { LegalSearchCard } from '@/components/Legal/LegalSearchCard';

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
