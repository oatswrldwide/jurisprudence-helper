import { CaseResult } from './types';

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
