
import { CaseResult } from './types';

// Function to parse the HTML response from SAFLII
export const parseSafliiHtml = (html: string): CaseResult[] => {
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
export const extractCitation = (text: string): string => {
  // Citation patterns like [2023] ZACC 12 or (123/2023) [2023] ZASCA 34
  const citationRegex = /\[\d{4}\]\s[A-Z]+\s\d+/;
  const match = text.match(citationRegex);
  return match ? match[0] : 'Citation not available';
};

// Helper function to extract date
export const extractDate = (text: string): string => {
  // Look for dates in format like 15 May 2023 or 2023-05-15
  const dateRegex = /\b\d{1,2}\s(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}\b|\d{4}-\d{2}-\d{2}/i;
  const match = text.match(dateRegex);
  return match ? match[0] : new Date().toDateString();
};

// Helper function to extract court
export const extractCourt = (text: string): string => {
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
export const extractTags = (title: string, court: string, summary: string): string[] => {
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
export const extractJudge = (text: string): string | undefined => {
  // Look for patterns like "Mogoeng CJ" or "Judge Smith"
  const judgeRegex = /\b[A-Z][a-z]+ (?:CJ|J|AJ|JA|JP)\b/;
  const match = text.match(judgeRegex);
  return match ? match[0] : undefined;
};
