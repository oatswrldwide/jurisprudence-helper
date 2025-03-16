
import { CaseResult } from './types';

// OpenAI API configuration
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const CUSTOM_GPT_SYSTEM_PROMPT = `You are Precedence AI, a specialized legal assistant for South African law. 
Analyze queries about South African case law, statutes, and legal principles using the SAFLII database. 
Format your responses as legal case results with the following structure: 
title, citation, court, date, summary, tags, and confidence score.`;

// Interface for the GPT response
interface GPTResponse {
  cases: CaseResult[];
  limitReached?: boolean;
  error?: string;
}

// Function to call OpenAI API with custom GPT prompt
export const callOpenAiGpt = async (
  query: string, 
  apiKey: string
): Promise<GPTResponse> => {
  if (!apiKey) {
    return { 
      cases: [], 
      error: 'API key is required' 
    };
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: CUSTOM_GPT_SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: `Search for South African legal cases about: ${query}. 
            Return results in JSON format with the following properties for each case: 
            title, citation, court, date, summary, tags (array), and confidenceScore (number).`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      
      if (response.status === 429) {
        return { cases: [], limitReached: true };
      }
      
      return { 
        cases: [], 
        error: `API error: ${errorData.error?.message || 'Unknown error'}` 
      };
    }

    const data = await response.json();
    
    // Parse the content from the response
    try {
      const content = JSON.parse(data.choices[0].message.content);
      
      if (content.cases && Array.isArray(content.cases)) {
        // Format the cases to match our CaseResult interface
        return {
          cases: content.cases.map((caseItem: any) => ({
            id: caseItem.citation || crypto.randomUUID(),
            title: caseItem.title || 'Untitled Case',
            citation: caseItem.citation || 'No citation provided',
            court: caseItem.court || 'Unknown Court',
            date: caseItem.date || new Date().toISOString().split('T')[0],
            summary: caseItem.summary || 'No summary available',
            tags: caseItem.tags || ['AI Generated'],
            safliiLink: caseItem.url || '#',
            confidenceScore: caseItem.confidenceScore || 75,
            source: 'Precedence AI'
          }))
        };
      }
      
      return { 
        cases: [], 
        error: 'Invalid response format from AI' 
      };
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return { 
        cases: [], 
        error: 'Failed to parse AI response' 
      };
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return { 
      cases: [], 
      error: 'Failed to connect to AI service' 
    };
  }
};
