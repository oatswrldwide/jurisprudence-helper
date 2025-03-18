
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Key, Eye, EyeOff, Save, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { hasApiKey } from '@/services/legal';

export const OpenAiKeyInput: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isKeyStored, setIsKeyStored] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key is stored
    const keyExists = hasApiKey();
    setIsKeyStored(keyExists);
    
    // If key is stored, show first 4 and last 4 chars only
    if (keyExists) {
      const storedKey = localStorage.getItem('openai_api_key') || '';
      const maskedKey = `${storedKey.substring(0, 4)}...${storedKey.substring(storedKey.length - 4)}`;
      setApiKey(maskedKey);
    }
  }, []);

  const handleSaveKey = () => {
    if (!apiKey.trim() || apiKey.includes('...')) {
      toast({
        title: "Error",
        description: "Please enter a valid OpenAI API key",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('openai_api_key', apiKey.trim());
    setIsKeyStored(true);
    setShowKey(false);
    
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved securely in your browser.",
    });
    
    // Force a refresh to update components that depend on the API key
    window.dispatchEvent(new Event('storage'));
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setIsKeyStored(false);
    
    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed.",
    });
    
    // Force a refresh to update components that depend on the API key
    window.dispatchEvent(new Event('storage'));
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    setIsKeyStored(false);
  };

  return (
    <Card className="mb-6 border-legal-navy/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-md font-medium flex items-center">
          <Key className="h-4 w-4 mr-2 text-legal-gold" />
          OpenAI API Key
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Input
            type={showKey ? "text" : "password"}
            value={apiKey}
            onChange={handleKeyChange}
            placeholder="Enter your OpenAI API key"
            className="pr-10"
            disabled={isKeyStored && !showKey}
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showKey ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Your API key is stored locally in your browser and never sent to our servers.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-0">
        {isKeyStored && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemoveKey}
            className="text-destructive hover:bg-destructive/10 border-destructive/20"
          >
            <X className="h-4 w-4 mr-1" />
            Remove
          </Button>
        )}
        <Button
          size="sm"
          onClick={handleSaveKey}
          className="bg-legal-navy hover:bg-legal-navy/90"
          disabled={!apiKey || (isKeyStored && apiKey.includes('...'))}
        >
          <Save className="h-4 w-4 mr-1" />
          Save API Key
        </Button>
      </CardFooter>
    </Card>
  );
};
