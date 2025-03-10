
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Brain, Send, CornerDownLeft, Sparkles, Database, AlertCircle } from 'lucide-react';

export const AiAssistant = () => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [pulseEffect, setPulseEffect] = useState(false);

  // Simulated response messages for the demo
  const demoResponses = [
    "Based on the recent Constitutional Court case S v Ndlovu (2023), the admissibility of evidence obtained through electronic surveillance requires a warrant under section 24 of the RICA Act.",
    "The precedent in Minister of Home Affairs v CSARS (2022) suggests that your tax dispute may qualify for the alternative dispute resolution process before proceeding to litigation.",
    "According to the Consumer Protection Act, section 54, your client is entitled to a cooling-off period of 5 business days for this type of agreement.",
    "In analyzing similar cases from the Supreme Court of Appeal, the claim for non-patrimonial damages in this medical negligence case would likely be quantified using the guidelines from MEC for Health v Johnson (2023)."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isProcessing) return;
    
    setIsProcessing(true);
    setPulseEffect(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      setResponse(randomResponse);
      setIsProcessing(false);
      setPulseEffect(false);
    }, 2000);
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
                  <p className="text-sm text-white/70">Powered by South African legal data</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-2 text-xs text-white/60">
                <Database className="h-3 w-3" />
                <span>Connected to SAFLII</span>
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
                    <p className="text-sm leading-relaxed">{response}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="text-xs flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                        <Database className="h-3 w-3 text-legal-gold" />
                        <span>Source: SAFLII</span>
                      </div>
                      <div className="text-xs flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                        <AlertCircle className="h-3 w-3 text-legal-gold" />
                        <span>92% confidence</span>
                      </div>
                    </div>
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
