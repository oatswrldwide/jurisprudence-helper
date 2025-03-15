
import React from 'react';
import { Button } from '@/components/ui/button';
import { BeakerIcon } from 'lucide-react';

export const TestModeButton = () => {
  // Only show in development mode
  if (!import.meta.env.DEV) {
    return null;
  }

  const enableTestMode = () => {
    if (typeof window !== 'undefined' && (window as any).enableTestMode) {
      (window as any).enableTestMode();
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed bottom-4 right-4 bg-white shadow-md border-gray-200 text-xs"
      onClick={enableTestMode}
    >
      <BeakerIcon className="h-3 w-3 mr-1" />
      Enable Test Mode
    </Button>
  );
};
