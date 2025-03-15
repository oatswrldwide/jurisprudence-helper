
// Define shared types for legal search functionality
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
