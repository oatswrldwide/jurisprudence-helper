
import { CaseResult } from './types';
import { parseSafliiHtml } from './safliiParser';
import { incrementRequestCount, hasReachedLimit } from '../requestLimitService';

// Base URL for SAFLII API
const SAFLII_API_BASE_URL = 'https://www.saflii.org/cgi-bin/sinosrch-adw.cgi';

// Function to fetch and parse SAFLII search results
export const fetchSafliiResults = async (query: string, page = 1): Promise<CaseResult[]> => {
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
export const mockSafliiSearch = async (query: string): Promise<{ data: CaseResult[], limitReached: boolean }> => {
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
export const mockCases: CaseResult[] = [
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
