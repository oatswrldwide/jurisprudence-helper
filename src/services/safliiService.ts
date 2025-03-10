
import { useState, useEffect } from 'react';

export interface LegalCase {
  id: string;
  title: string;
  court: string;
  date: string;
  citation: string;
  judge: string;
  summary: string;
  url: string;
}

export interface SearchParams {
  query: string;
  court?: string;
  year?: string;
  topic?: string;
  page?: number;
  limit?: number;
}

export const useLegalCaseSearch = (params: SearchParams) => {
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchCases = async () => {
      if (!params.query) {
        setCases([]);
        setTotalResults(0);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // In a real implementation, this would make an API call to SAFLII or a backend service
        // For now, we'll simulate the response with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock cases based on search query
        const mockCases = generateMockCases(params);
        setCases(mockCases);
        setTotalResults(mockCases.length > 0 ? 127 : 0); // Mock total count
      } catch (err) {
        console.error('Error fetching legal cases:', err);
        setError('Failed to fetch legal cases. Please try again.');
        setCases([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [params]);

  return { cases, loading, error, totalResults };
};

// Mock data generator (to be replaced with actual API integration)
const generateMockCases = (params: SearchParams): LegalCase[] => {
  if (!params.query.trim()) return [];
  
  const courts = [
    'Constitutional Court',
    'Supreme Court of Appeal',
    'High Court (Cape Town)',
    'High Court (Johannesburg)',
    'Labour Court'
  ];
  
  const judges = [
    'Mogoeng CJ',
    'Madlanga J',
    'Khampepe J',
    'Jafta J',
    'Froneman J'
  ];
  
  // Filter by court if specified
  let filteredCourts = courts;
  if (params.court && params.court !== 'all') {
    switch (params.court) {
      case 'cc':
        filteredCourts = ['Constitutional Court'];
        break;
      case 'sca':
        filteredCourts = ['Supreme Court of Appeal'];
        break;
      case 'high':
        filteredCourts = ['High Court (Cape Town)', 'High Court (Johannesburg)'];
        break;
      case 'labour':
        filteredCourts = ['Labour Court'];
        break;
    }
  }
  
  // Filter by year if specified
  const currentYear = new Date().getFullYear();
  let yearRange = [currentYear - 5, currentYear];
  if (params.year && params.year !== 'all') {
    if (params.year === 'older') {
      yearRange = [currentYear - 20, currentYear - 5];
    } else {
      const year = parseInt(params.year);
      yearRange = [year, year];
    }
  }
  
  // Generate mock cases
  return Array.from({ length: 10 }, (_, i) => {
    const courtIndex = i % filteredCourts.length;
    const court = filteredCourts[courtIndex];
    const year = Math.floor(Math.random() * (yearRange[1] - yearRange[0] + 1)) + yearRange[0];
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    return {
      id: `case-${i + 1}-${Date.now()}`,
      title: `${params.query.toUpperCase()} v Minister of Justice (${i + 1}/2${year})`,
      court,
      date,
      citation: `[${year}] ZACC ${i + 1}`,
      judge: judges[i % judges.length],
      summary: `This case involves a dispute regarding ${params.query}. The court found that the respondent had violated the plaintiff's constitutional rights.`,
      url: `https://www.saflii.org/za/cases/ZACC/${year}/${i + 1}.html`
    };
  });
};
