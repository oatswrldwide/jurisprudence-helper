
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

// Sample data for recent cases
const recentCases = [
  {
    id: 1,
    title: 'Minister of Police v Mboweni',
    citation: '[2023] ZACC 12',
    court: 'Constitutional Court',
    date: '15 May 2023',
    summary: 'Deals with state liability for actions of police officers while on duty.',
    tags: ['Constitutional Law', 'State Liability']
  },
  {
    id: 2,
    title: 'ABC Investments v Commissioner of SARS',
    citation: '[2023] ZASCA 47',
    court: 'Supreme Court of Appeal',
    date: '3 April 2023',
    summary: 'Tax assessment dispute regarding capital gains calculations.',
    tags: ['Tax Law', 'Capital Gains']
  },
  {
    id: 3,
    title: 'Smith v City of Cape Town',
    citation: '[2023] ZAWCHC 32',
    court: 'Western Cape High Court',
    date: '22 March 2023',
    summary: 'Property dispute over municipal zoning regulations.',
    tags: ['Property Law', 'Municipal Law']
  }
];

export const RecentCases = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-legal-navy flex justify-between items-center">
          Recent Cases
          <Button variant="ghost" size="sm" className="text-xs text-legal-gold hover:text-legal-gold/90 -mr-2">
            View All
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {recentCases.map((caseItem) => (
            <div key={caseItem.id} className="border-b last:border-0 pb-4 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-legal-navy hover:text-legal-gold cursor-pointer">{caseItem.title}</h3>
                <span className="text-xs text-muted-foreground">{caseItem.date}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground gap-2 mb-2">
                <span className="font-medium">{caseItem.citation}</span>
                <span>•</span>
                <span>{caseItem.court}</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{caseItem.summary}</p>
              
              <div className="flex gap-2 flex-wrap">
                {caseItem.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-legal-grey hover:bg-legal-grey/80">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
