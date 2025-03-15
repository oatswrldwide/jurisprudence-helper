
import React from 'react';
import { CaseResult } from '@/services/safliiService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

interface CaseResultsListProps {
  results: CaseResult[];
  loading: boolean;
}

export const CaseResultsList: React.FC<CaseResultsListProps> = ({ results, loading }) => {
  if (loading || results.length === 0) {
    return null;
  }

  return (
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
  );
};
