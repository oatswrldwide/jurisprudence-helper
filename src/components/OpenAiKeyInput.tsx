
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Key, Eye, EyeOff, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface OpenAiKeyInputProps {
  onSaveKey: (key: string) => void;
  apiKey: string;
}

export const OpenAiKeyInput: React.FC<OpenAiKeyInputProps> = ({ 
  onSaveKey,
  apiKey 
}) => {
  const [key, setKey] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();

  const handleSaveKey = () => {
    if (!key.trim()) {
      toast({
        title: 'API Key Required',
        description: 'Please enter your OpenAI API key',
        variant: 'destructive',
      });
      return;
    }

    if (!key.startsWith('sk-')) {
      toast({
        title: 'Invalid API Key',
        description: 'OpenAI API keys typically start with "sk-"',
        variant: 'destructive',
      });
      return;
    }

    onSaveKey(key);
    toast({
      title: 'API Key Saved',
      description: 'Your OpenAI API key has been saved',
    });
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        <Key className="h-4 w-4 text-legal-gold" />
        OpenAI API Key
      </label>
      <div className="relative">
        <Input
          type={showKey ? 'text' : 'password'}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="sk-..."
          className="pr-20"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button
            type="button"
            size="sm"
            className="h-8 bg-legal-navy hover:bg-legal-navy/90 text-white"
            onClick={handleSaveKey}
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Your API key is stored locally in your browser and never sent to our servers
      </p>
    </div>
  );
};
