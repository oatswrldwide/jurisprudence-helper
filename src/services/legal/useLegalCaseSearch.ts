
import { useState, useEffect } from 'react';
import { CaseResult, SearchParams } from './types';
import { searchWithCustomGpt } from './customGptService';

// Custom hook for searching with Precedence AI
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
        // Use the custom GPT search instead of SAFLII
        const { data, limitReached } = await searchWithCustomGpt(params.query);
        
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
