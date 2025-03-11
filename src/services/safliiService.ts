
import { useState, useEffect } from 'react';
import { incrementRequestCount, hasReachedLimit } from './requestLimitService';

export interface CaseResult {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  summary: string;
  tags: string[];
  safliiLink: string;
  judge?: string; // Optional prop used in SearchResults
  url?: string; // Optional for backward compatibility
}

export interface SearchParams {
  query: string;
  court?: string;
  year?: string;
  topic?: string;
  page?: number;
  limit?: number;
}

// For now, we'll use mock data as a placeholder for the actual API
const mockCases: CaseResult[] = [
  {
    id: '1',
    title: 'Minister of Police v Mboweni',
    citation: '[2023] ZACC 12',
    court: 'Constitutional Court',
    date: '15 May 2023',
    summary: 'Deals with state liability for actions of police officers while on duty.',
    tags: ['Constitutional Law', 'State Liability'],
    safliiLink: 'http://www.saflii.org/za/cases/ZACC/2023/12.html',
    judge: 'Mogoeng CJ'
  },
  {
    id: '2',
    title: 'ABC Investments v Commissioner of SARS',
    citation: '[2023] ZASCA 47',
    court: 'Supreme Court of Appeal',
    date: '3 April 2023',
    summary: 'Tax assessment dispute regarding capital gains calculations.',
    tags: ['Tax Law', 'Capital Gains'],
    safliiLink: 'http://www.saflii.org/za/cases/ZASCA/2023/47.html',
    judge: 'Ponnan JA'
  },
  {
    id: '3',
    title: 'Smith v City of Cape Town',
    citation: '[2023] ZAWCHC 32',
    court: 'Western Cape High Court',
    date: '22 March 2023',
    summary: 'Property dispute over municipal zoning regulations.',
    tags: ['Property Law', 'Municipal Law'],
    safliiLink: 'http://www.saflii.org/za/cases/ZAWCHC/2023/32.html',
    judge: 'Binns-Ward J'
  },
  {
    id: '4',
    title: 'Naidoo v Transnet Ltd',
    citation: '[2023] ZALAC 15',
    court: 'Labour Appeal Court',
    date: '10 June 2023',
    summary: 'Unfair dismissal case involving misconduct allegations.',
    tags: ['Labour Law', 'Unfair Dismissal'],
    safliiLink: 'http://www.saflii.org/za/cases/ZALAC/2023/15.html',
    judge: 'Davis JP'
  },
  {
    id: '5',
    title: 'Kruger v Standard Bank',
    citation: '[2023] ZAGPPHC 74',
    court: 'Gauteng High Court',
    date: '2 July 2023',
    summary: 'Banking dispute regarding credit facility terms.',
    tags: ['Banking Law', 'Contract Law'],
    safliiLink: 'http://www.saflii.org/za/cases/ZAGPPHC/2023/74.html',
    judge: 'Meyer J'
  }
];

// Function to search SAFLII cases
export const searchSafliiCases = async (query: string): Promise<{ data: CaseResult[], limitReached: boolean }> => {
  // Check if user has reached the limit
  if (hasReachedLimit()) {
    return { data: [], limitReached: true };
  }
  
  // In a real implementation, this would make an API call to SAFLII
  // For now, we'll just filter our mock data
  const results = mockCases.filter(caseItem => 
    caseItem.title.toLowerCase().includes(query.toLowerCase()) ||
    caseItem.summary.toLowerCase().includes(query.toLowerCase()) ||
    caseItem.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  // Increment request count
  incrementRequestCount();
  
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { data: results, limitReached: false };
};

// Function to get a specific case by ID
export const getCaseById = async (id: string): Promise<{ data: CaseResult | null, limitReached: boolean }> => {
  // Check if user has reached the limit
  if (hasReachedLimit()) {
    return { data: null, limitReached: true };
  }
  
  // In a real implementation, this would make an API call to SAFLII
  const result = mockCases.find(caseItem => caseItem.id === id);
  
  // Increment request count if case is found
  if (result) {
    incrementRequestCount();
  }
  
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return { data: result || null, limitReached: false };
};

// Custom hook for searching SAFLII cases
export const useLegalCaseSearch = (params: SearchParams) => {
  const [cases, setCases] = useState<CaseResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchCases = async () => {
      // Skip if query is empty or just whitespace
      if (!params.query || !params.query.trim()) {
        setCases([]);
        setTotalResults(0);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, limitReached } = await searchSafliiCases(params.query);
        
        if (limitReached) {
          setError('Daily request limit reached. Please upgrade to premium.');
          setCases([]);
          setTotalResults(0);
        } else {
          setCases(data);
          setTotalResults(data.length);
        }
      } catch (err) {
        setError('Failed to fetch legal cases. Please try again.');
        setCases([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [params.query, params.court, params.year, params.topic, params.page]);

  return { cases, loading, error, totalResults };
};
