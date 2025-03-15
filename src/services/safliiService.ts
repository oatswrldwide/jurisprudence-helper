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
  judge?: string;
  url?: string;
}

export interface SearchParams {
  query: string;
  court?: string;
  year?: string;
  topic?: string;
  page?: number;
  limit?: number;
}

// Base URL for SAFLII API
const SAFLII_API_BASE_URL = 'https://www.saflii.org/cgi-bin/sinosrch-adw.cgi';

// Function to fetch and parse SAFLII search results
const fetchSafliiResults = async (query: string, page = 1): Promise<CaseResult[]> => {
  try {
    // Construct the SAFLII search URL
    const searchUrl = `${SAFLII_API_BASE_URL}?method=boolean&query=${encodeURIComponent(query)}&meta=%2Fjurisdiction&mask_path=&submit=Search&pagenum=${page}&rank=on`;
    
    console.log('Fetching from SAFLII with URL:', searchUrl);
    
    // Fetch the search results page
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from SAFLII: ${response.status}`);
    }
    
    // Get the HTML content
    const htmlContent = await response.text();
    
    // Parse the HTML to extract case data
    const cases = parseSafliiHtml(htmlContent);
    
    return cases;
  } catch (error) {
    console.error('Error fetching from SAFLII:', error);
    throw error;
  }
};

// Function to parse the HTML response from SAFLII
const parseSafliiHtml = (html: string): CaseResult[] => {
  const results: CaseResult[] = [];
  
  try {
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Find all search result items
    const resultItems = doc.querySelectorAll('.search-result');
    
    resultItems.forEach((item, index) => {
      try {
        // Extract title and link
        const titleElement = item.querySelector('h3 a');
        const title = titleElement?.textContent?.trim() || 'Unknown Title';
        const safliiLink = titleElement?.getAttribute('href') || '';
        
        // Extract citation and date
        const metaText = item.querySelector('.search-result-meta')?.textContent || '';
        const citation = extractCitation(metaText);
        const date = extractDate(metaText);
        
        // Extract court
        const court = extractCourt(metaText);
        
        // Extract summary
        const summary = item.querySelector('.search-result-text')?.textContent?.trim() || '';
        
        // Generate a unique ID
        const id = `saflii-${Date.now()}-${index}`;
        
        // Extract or generate tags
        const tags = extractTags(title, court, summary);
        
        // Extract judge if available
        const judge = extractJudge(metaText);
        
        results.push({
          id,
          title,
          citation,
          court,
          date,
          summary,
          tags,
          safliiLink,
          judge,
          url: safliiLink
        });
      } catch (error) {
        console.error('Error parsing result item:', error);
      }
    });
    
    console.log('Parsed SAFLII results:', results);
    return results;
  } catch (error) {
    console.error('Error parsing SAFLII HTML:', error);
    return [];
  }
};

// Helper function to extract citation
const extractCitation = (text: string): string => {
  // Citation patterns like [2023] ZACC 12 or (123/2023) [2023] ZASCA 34
  const citationRegex = /\[\d{4}\]\s[A-Z]+\s\d+/;
  const match = text.match(citationRegex);
  return match ? match[0] : 'Citation not available';
};

// Helper function to extract date
const extractDate = (text: string): string => {
  // Look for dates in format like 15 May 2023 or 2023-05-15
  const dateRegex = /\b\d{1,2}\s(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}\b|\d{4}-\d{2}-\d{2}/i;
  const match = text.match(dateRegex);
  return match ? match[0] : new Date().toDateString();
};

// Helper function to extract court
const extractCourt = (text: string): string => {
  if (text.includes('ZACC')) return 'Constitutional Court';
  if (text.includes('ZASCA')) return 'Supreme Court of Appeal';
  if (text.includes('ZAGPPHC')) return 'Gauteng High Court';
  if (text.includes('ZAWCHC')) return 'Western Cape High Court';
  if (text.includes('ZAKZPHC')) return 'KwaZulu-Natal High Court';
  if (text.includes('ZALAC')) return 'Labour Appeal Court';
  if (text.includes('ZALC')) return 'Labour Court';
  return 'South African Court';
};

// Helper function to extract or generate tags
const extractTags = (title: string, court: string, summary: string): string[] => {
  const tags: string[] = [];
  
  // Add court as a tag
  if (court && !tags.includes(court)) {
    tags.push(court);
  }
  
  // Common legal topics to check for
  const legalTopics = [
    'Constitutional Law', 'Criminal Law', 'Civil Procedure', 
    'Contract Law', 'Property Law', 'Administrative Law',
    'Labour Law', 'Family Law', 'Tax Law', 'Commercial Law'
  ];
  
  // Check title and summary for legal topics
  const fullText = `${title} ${summary}`.toLowerCase();
  legalTopics.forEach(topic => {
    if (fullText.includes(topic.toLowerCase()) && !tags.includes(topic)) {
      tags.push(topic);
    }
  });
  
  // Add default tag if none found
  if (tags.length < 2) {
    tags.push('Legal Case');
  }
  
  return tags;
};

// Helper function to extract judge
const extractJudge = (text: string): string | undefined => {
  // Look for patterns like "Mogoeng CJ" or "Judge Smith"
  const judgeRegex = /\b[A-Z][a-z]+ (?:CJ|J|AJ|JA|JP)\b/;
  const match = text.match(judgeRegex);
  return match ? match[0] : undefined;
};

// Function to search SAFLII cases with real API
export const searchSafliiCases = async (query: string): Promise<{ data: CaseResult[], limitReached: boolean }> => {
  // Check if user has reached the limit
  if (hasReachedLimit()) {
    return { data: [], limitReached: true };
  }

  try {
    console.log('Searching SAFLII for:', query);
    
    // Fetch real results from SAFLII
    const results = await fetchSafliiResults(query);
    
    // Increment request count
    incrementRequestCount();
    
    return { data: results, limitReached: false };
  } catch (error) {
    console.error('Error searching SAFLII:', error);
    // Fallback to mock data if there's an error with the API
    console.log('Falling back to mock data');
    return mockSafliiSearch(query);
  }
};

// Function to get a specific case by ID
export const getCaseById = async (id: string): Promise<{ data: CaseResult | null, limitReached: boolean }> => {
  // Check if user has reached the limit
  if (hasReachedLimit()) {
    return { data: null, limitReached: true };
  }
  
  try {
    // In a real implementation, we would fetch the specific case from SAFLII
    // For now, we'll use our mock data as a fallback
    const result = mockCases.find(caseItem => caseItem.id === id);
    
    // Increment request count if case is found
    if (result) {
      incrementRequestCount();
    }
    
    return { data: result || null, limitReached: false };
  } catch (error) {
    console.error('Error getting case by ID:', error);
    return { data: null, limitReached: false };
  }
};

// Fallback mock search for when the API fails
const mockSafliiSearch = async (query: string): Promise<{ data: CaseResult[], limitReached: boolean }> => {
  // Filter mock data based on query
  const results = mockCases.filter(caseItem => 
    caseItem.title.toLowerCase().includes(query.toLowerCase()) ||
    caseItem.summary.toLowerCase().includes(query.toLowerCase()) ||
    caseItem.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
  
  console.log('Using mock data with results:', results.length);
  
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { data: results, limitReached: false };
};

// Mock data as a fallback
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
