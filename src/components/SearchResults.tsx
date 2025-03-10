
import React from 'react';
import { LegalCase } from '@/services/safliiService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, User, BookOpen, ExternalLink } from 'lucide-react';

interface SearchResultsProps {
  cases: LegalCase[];
  loading: boolean;
  error: string | null;
  totalResults: number;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  cases,
  loading,
  error,
  totalResults
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-legal-navy border-t-transparent"></div>
        <span className="ml-3 text-legal-navy">Searching legal databases...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 mb-2">Error: {error}</div>
        <Button variant="outline">Retry Search</Button>
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground mb-2">No results found. Try different search terms or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          Found <span className="font-bold text-legal-gold">{totalResults}</span> results
        </h3>
        <div className="text-sm text-muted-foreground">
          Showing 1-{cases.length} of {totalResults}
        </div>
      </div>

      <div className="space-y-4">
        {cases.map((legalCase) => (
          <Card key={legalCase.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-legal-navy text-lg font-bold">{legalCase.title}</CardTitle>
                <Badge variant="outline" className="bg-legal-lightBlue text-legal-navy">
                  {legalCase.citation}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-2 text-legal-gold" />
                  {legalCase.court}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2 text-legal-gold" />
                  {new Date(legalCase.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-2 text-legal-gold" />
                  {legalCase.judge}
                </div>
              </div>

              <p className="text-sm mb-4">{legalCase.summary}</p>

              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-legal-navy border-legal-navy hover:bg-legal-navy hover:text-white"
                  onClick={() => window.open(legalCase.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on SAFLII
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
