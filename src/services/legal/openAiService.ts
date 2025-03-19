
import { CaseResult } from './types';
import { mockCases } from './safliiClient';

// Define the type for our GPT API response
interface GPTResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export interface OpenAIError {
  message: string;
  code?: string;
  type?: string;
}

/**
 * Check if an OpenAI API key is stored
 */
export const hasApiKey = (): boolean => {
  return !!localStorage.getItem('openai_api_key');
};

/**
 * Call the custom GPT (Precedence AI) with the given query
 */
export const callCustomGpt = async (query: string): Promise<{ data: CaseResult[], error?: OpenAIError }> => {
  const apiKey = localStorage.getItem('openai_api_key');
  
  if (!apiKey) {
    return { 
      data: [],
      error: { 
        message: 'No OpenAI API key found. Please add your API key in settings.',
        code: 'no_api_key'
      } 
    };
  }

  try {
    // Check if test mode is enabled
    const testMode = localStorage.getItem('ai_test_mode') === 'true';
    
    if (testMode) {
      console.log('Using test mode for AI responses');
      return generateMockAiResponse(query);
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o", // Using latest model for best results
        messages: [
          {
            role: "system",
            content: "You are Precedence AI, a legal research assistant specialized in South African case law. Return results in JSON format with the following structure: array of objects with properties: id, title, citation, court, date, summary, tags, safliiLink, judge."
          },
          {
            role: "user",
            content: `Perform legal research on: ${query}. Focus on South African case law. Return ONLY JSON.`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('OpenAI API error:', errorData);
      
      // For quota/rate limit errors, fall back to mock responses
      if (errorData.error?.code === 'insufficient_quota' || 
          errorData.error?.type === 'insufficient_quota' ||
          errorData.error?.code === 'rate_limit_exceeded') {
        console.log('Falling back to mock AI response due to API limits');
        return generateMockAiResponse(query);
      }
      
      return { 
        data: [],
        error: { 
          message: errorData.error?.message || 'Failed to call OpenAI API',
          code: errorData.error?.code,
          type: errorData.error?.type
        }
      };
    }

    const data: GPTResponse = await response.json();
    
    // Parse the JSON string from the GPT response
    try {
      const content = data.choices[0].message.content;
      // Extract just the JSON part (GPT sometimes adds markdown code blocks)
      const jsonMatch = content.match(/```json\n([\s\S]*)\n```/) || content.match(/```\n([\s\S]*)\n```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      
      const parsedData = JSON.parse(jsonStr.trim()) as CaseResult[];
      
      // Ensure each case has an id
      const processedData = parsedData.map((item, index) => ({
        ...item,
        id: item.id || `gpt-case-${index}`
      }));
      
      return { data: processedData };
    } catch (parseError) {
      console.error("Failed to parse GPT response:", parseError);
      return { 
        data: [],
        error: { 
          message: 'Failed to parse GPT response. The response was not valid JSON.',
          code: 'invalid_json'
        }
      };
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return { 
      data: [],
      error: { 
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        code: 'api_error'
      }
    };
  }
};

/**
 * Generate a mock AI response for testing
 */
const generateMockAiResponse = (query: string): { data: CaseResult[], error?: OpenAIError } => {
  // Simple filtering based on the query
  const filteredCases = mockCases.filter(caseItem => 
    caseItem.title.toLowerCase().includes(query.toLowerCase()) ||
    caseItem.summary.toLowerCase().includes(query.toLowerCase()) ||
    caseItem.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
  
  // If no direct matches, return a subset of mock cases with modified titles/summaries
  const results = filteredCases.length > 0 ? filteredCases : mockCases.slice(0, 3).map((caseItem, index) => ({
    ...caseItem,
    id: `ai-mock-${index}`,
    title: `${caseItem.title} (related to "${query}")`,
    summary: `This case has relevance to "${query}". ${caseItem.summary}`,
    tags: [...caseItem.tags, query]
  }));
  
  return { 
    data: results
  };
};

/**
 * Enable or disable test mode for AI responses
 */
export const setAiTestMode = (enabled: boolean): void => {
  localStorage.setItem('ai_test_mode', enabled ? 'true' : 'false');
};

/**
 * Check if AI test mode is enabled
 */
export const isAiTestModeEnabled = (): boolean => {
  return localStorage.getItem('ai_test_mode') === 'true';
};
