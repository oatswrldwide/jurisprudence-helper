
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Database, Calendar, ExternalLink } from 'lucide-react';

// Sample data for recent cases from SAFLII
const recentCases = [
  {
    id: 1,
    title: 'Minister of Police v Mboweni',
    citation: '[2023] ZACC 12',
    court: 'Constitutional Court',
    date: '15 May 2023',
    summary: 'Deals with state liability for actions of police officers while on duty.',
    tags: ['Constitutional Law', 'State Liability'],
    safliiLink: 'http://www.saflii.org/za/cases/ZACC/2023/12.html'
  },
  {
    id: 2,
    title: 'ABC Investments v Commissioner of SARS',
    citation: '[2023] ZASCA 47',
    court: 'Supreme Court of Appeal',
    date: '3 April 2023',
    summary: 'Tax assessment dispute regarding capital gains calculations.',
    tags: ['Tax Law', 'Capital Gains'],
    safliiLink: 'http://www.saflii.org/za/cases/ZASCA/2023/47.html'
  },
  {
    id: 3,
    title: 'Smith v City of Cape Town',
    citation: '[2023] ZAWCHC 32',
    court: 'Western Cape High Court',
    date: '22 March 2023',
    summary: 'Property dispute over municipal zoning regulations.',
    tags: ['Property Law', 'Municipal Law'],
    safliiLink: 'http://www.saflii.org/za/cases/ZAWCHC/2023/32.html'
  }
];

export const RecentCases = () => {
  return (
    <Card className="shadow-md border-0 overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-legal-grey to-white">
        <CardTitle className="text-lg font-semibold text-legal-navy flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-legal-gold" />
            Recent Cases from SAFLII
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-legal-gold hover:text-legal-gold/90 -mr-2">
            View All
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {recentCases.map((caseItem) => (
            <div key={caseItem.id} className="border-b last:border-0 pb-4 last:pb-0 group">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-legal-navy group-hover:text-legal-gold transition-colors">
                  {caseItem.title}
                </h3>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{caseItem.date}</span>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground gap-2 mb-2">
                <span className="font-medium bg-legal-lightBlue px-2 py-0.5 rounded-sm">
                  {caseItem.citation}
                </span>
                <span>•</span>
                <span>{caseItem.court}</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{caseItem.summary}</p>
              
              <div className="flex justify-between">
                <div className="flex gap-2 flex-wrap">
                  {caseItem.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-legal-grey hover:bg-legal-grey/80">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <a 
                  href={caseItem.safliiLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-legal-gold flex items-center hover:underline"
                >
                  <span>SAFLII Link</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
