
import React from 'react';
import { BookOpen, FileText, Scale } from 'lucide-react';

export const SearchTips: React.FC = () => {
  return (
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
  );
};
