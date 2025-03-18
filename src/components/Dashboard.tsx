
import React from 'react';
import { SearchSection } from './SearchSection';
import { DocumentAnalyzer } from './DocumentAnalyzer';
import { RecentCases } from './RecentCases';
import { LegalCalendar } from './LegalCalendar';
import { AiAssistant } from './AiAssistant';
import { OpenAiKeyInput } from './OpenAiKeyInput';

export const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-legal-navy mb-6">Welcome to LexAI</h1>
      
      <div className="mb-8">
        <AiAssistant />
      </div>
      
      <div className="mb-8">
        <OpenAiKeyInput />
      </div>
      
      <div className="mb-8">
        <SearchSection />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentCases />
        </div>
        <div>
          <DocumentAnalyzer />
        </div>
      </div>
      
      <div className="mt-6">
        <LegalCalendar />
      </div>
    </div>
  );
};
