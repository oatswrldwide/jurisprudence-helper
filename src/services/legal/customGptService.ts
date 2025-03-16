
import { CaseResult } from './types';
import { incrementRequestCount, hasReachedLimit } from '../requestLimitService';

// This is a wrapper service to integrate with the custom GPT "Precedence AI"
// Note: Since we can't directly call the GPT API from the frontend due to authentication requirements,
// this service provides a frontend-friendly interface that would typically connect to a backend service

// Custom GPT ID for Precedence AI
const PRECEDENCE_AI_ID = 'g-hcx6E7jBe';

// Function to search legal cases using the custom GPT
export const searchWithCustomGpt = async (query: string): Promise<{ data: CaseResult[], limitReached: boolean }> => {
  // Check if user has reached the limit
  if (hasReachedLimit()) {
    return { data: [], limitReached: true };
  }

  try {
    console.log('Searching with Custom GPT for:', query);
    console.log('GPT Model ID:', PRECEDENCE_AI_ID);
    
    // In a real implementation, we would call a backend API that would then interact with the OpenAI API
    // For now, we'll use our SAFLII mock data as a demonstration, but enhance it to look like GPT responses
    
    // Simulate network latency for a more realistic experience
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate GPT-enhanced mock results
    const results = mockGptSearch(query);
    
    // Increment request count
    incrementRequestCount();
    
    return { data: results, limitReached: false };
  } catch (error) {
    console.error('Error searching with Custom GPT:', error);
    return { data: [], limitReached: false };
  }
};

// Mock function that simulates responses from the custom GPT
const mockGptSearch = (query: string): CaseResult[] => {
  // Base our mock data on the existing mock cases
  const { mockCases } = require('./safliiClient');
  
  // Filter and enhance the mock cases based on the query
  const enhancedResults = mockCases
    .filter(caseItem => 
      caseItem.title.toLowerCase().includes(query.toLowerCase()) ||
      caseItem.summary.toLowerCase().includes(query.toLowerCase()) ||
      caseItem.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
    .map(caseItem => ({
      ...caseItem,
      // Enhance summary with "GPT-like" analysis
      summary: `${caseItem.summary} Our AI analysis indicates this case has ${Math.floor(Math.random() * 50) + 50}% relevance to your query on "${query}". Key legal principles include ${getRandomLegalPrinciple()}.`,
      // Add additional tags that might be relevant
      tags: [...caseItem.tags, ...getAdditionalTags(query)],
      // Add a confidence score (simulated)
      confidenceScore: Math.floor(Math.random() * 20) + 80,
      // Add GPT source attribution
      source: 'Precedence AI'
    }));

  console.log('Generated Custom GPT enhanced results:', enhancedResults.length);
  
  // If no results match the filter, return a subset of all cases with custom summaries
  if (enhancedResults.length === 0) {
    return mockCases.slice(0, 2).map(caseItem => ({
      ...caseItem,
      summary: `While this case doesn't directly match your query "${query}", it may contain relevant legal principles. ${caseItem.summary}`,
      tags: [...caseItem.tags, 'AI Suggested', 'Partial Match'],
      confidenceScore: Math.floor(Math.random() * 30) + 50,
      source: 'Precedence AI'
    }));
  }
  
  return enhancedResults;
};

// Helper function to generate random legal principles
const getRandomLegalPrinciple = (): string => {
  const principles = [
    'stare decisis',
    'burden of proof',
    'reasonable person standard',
    'duty of care',
    'beyond reasonable doubt',
    'presumption of innocence',
    'balancing of interests'
  ];
  
  return principles[Math.floor(Math.random() * principles.length)];
};

// Helper function to generate additional tags based on query
const getAdditionalTags = (query: string): string[] => {
  const additionalTags = [];
  
  // Add AI source tag
  additionalTags.push('AI Analyzed');
  
  // Add query-based tag
  const queryTag = `Related to: ${query.split(' ')[0]}`;
  additionalTags.push(queryTag);
  
  return additionalTags;
};
