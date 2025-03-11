
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getRequestLimit } from '@/services/requestLimitService';

interface LimitReachedAlertProps {
  onSubscribe: () => void;
}

export const LimitReachedAlert: React.FC<LimitReachedAlertProps> = ({ onSubscribe }) => {
  const { count } = getRequestLimit();
  
  return (
    <Alert className="bg-legal-navy/5 border-legal-navy/20">
      <AlertTriangle className="h-4 w-4 text-legal-navy" />
      <AlertTitle className="text-legal-navy font-medium flex items-center gap-2">
        Daily Request Limit Reached
      </AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-3 text-muted-foreground">
          You've used {count}/3 free daily requests to the SAFLII database. 
          Upgrade to premium for unlimited access to South Africa's legal resources.
        </p>
        <Button 
          className="bg-legal-gold hover:bg-legal-gold/90 text-white"
          onClick={onSubscribe}
        >
          Upgrade to Premium
        </Button>
      </AlertDescription>
    </Alert>
  );
};
