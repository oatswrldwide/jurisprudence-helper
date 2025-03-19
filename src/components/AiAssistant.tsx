
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Send, CornerDownLeft, Sparkles, Database, AlertCircle } from 'lucide-react';
import { callCustomGpt, hasApiKey, isAiTestModeEnabled } from '@/services/legal';
import { useToast } from '@/components/ui/use-toast';

export const AiAssistant = () => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if test mode is enabled
    setTestMode(isAiTestModeEnabled());
    
    // Listen for storage events (when test mode or API key changes)
    const handleStorageChange = () => {
      setTestMode(isAiTestModeEnabled());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isProcessing) return;
    
    // In test mode, we don't require an API key
    if (!testMode && !hasApiKey()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key in the section below or enable Test Mode.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    setPulseEffect(true);
    
    try {
      const result = await callCustomGpt(query);
      
      if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive",
        });
        setResponse(null);
      } else if (result.data && result.data.length > 0) {
        // Format the response data into a readable string
        const formattedResponse = result.data.map(caseResult => {
          return `${caseResult.title || 'Untitled Case'}\n${caseResult.citation || ''}\n${caseResult.summary || 'No summary available.'}`;
        }).join('\n\n');
        
        setResponse(formattedResponse);
      } else {
        setResponse("No relevant cases found for your query. Please try a different search term.");
      }
    } catch (err) {
      console.error('Error processing AI request:', err);
      toast({
        title: "Error",
        description: "An error occurred while processing your request.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setPulseEffect(false);
    }
  };

  // Brain animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isProcessing) {
        setPulseEffect(prev => !prev);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isProcessing]);

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-legal-navy to-[#2a3f69] text-white overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Abstract background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`rounded-full bg-legal-gold/10 p-3 transition-all ${pulseEffect ? 'scale-110 shadow-[0_0_15px_rgba(191,155,48,0.5)]' : ''}`}>
                  <Brain className="h-8 w-8 text-legal-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">LexAI Assistant</h2>
                  <p className="text-sm text-white/70">
                    {testMode ? 
                      "Running in test mode (using mock data)" : 
                      "Powered by South African legal data"}
                  </p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-2 text-xs text-white/60">
                {testMode ? (
                  <>
                    <Sparkles className="h-3 w-3 text-legal-gold" />
                    <span>Test Mode Active</span>
                  </>
                ) : (
                  <>
                    <Database className="h-3 w-3" />
                    <span>Connected to OpenAI</span>
                  </>
                )}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="relative">
                <Input 
                  placeholder="Ask about case law, statutes, or legal principles..." 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-legal-gold"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-legal-gold hover:bg-legal-gold/90 text-legal-navy"
                  disabled={isProcessing || !query.trim()}
                >
                  {isProcessing ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-legal-navy border-t-transparent" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex items-center gap-1 text-xs text-white/50">
                  <CornerDownLeft className="h-3 w-3" />
                  <span>Press Enter to submit</span>
                </div>
                {query.length > 0 && (
                  <button 
                    type="button" 
                    className="text-xs text-white/50 hover:text-white/80"
                    onClick={() => setQuery('')}
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
            
            {response && (
              <div className="rounded-lg bg-white/10 p-4 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-legal-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <Textarea 
                      value={response} 
                      readOnly 
                      className="bg-transparent border-none text-white text-sm leading-relaxed min-h-[150px] resize-none focus-visible:ring-0"
                    />
                    <div className="flex items-center gap-2 mt-3">
                      <div className="text-xs flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                        {testMode ? (
                          <>
                            <Sparkles className="h-3 w-3 text-legal-gold" />
                            <span>Source: Test Mode</span>
                          </>
                        ) : (
                          <>
                            <Database className="h-3 w-3 text-legal-gold" />
                            <span>Source: OpenAI</span>
                          </>
                        )}
                      </div>
                      <div className="text-xs flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                        <AlertCircle className="h-3 w-3 text-legal-gold" />
                        <span>AI-generated response</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {!testMode && !hasApiKey() && !response && (
              <div className="rounded-lg bg-white/10 p-4 mt-4 border border-white/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-legal-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm leading-relaxed">Please add your OpenAI API key in the section below to use LexAI Assistant, or enable Test Mode for demo purposes.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
