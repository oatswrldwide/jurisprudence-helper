
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { initiatePayment } from '@/services/paystackService';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { LoaderCircle } from 'lucide-react';

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ open, onOpenChange }) => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = () => {
    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    // Generate a unique reference ID
    const reference = `lexai-sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Amount in cents (R299.99)
    const amount = 29999;
    
    initiatePayment({ amount, email, reference });
    
    // In a real implementation, we would wait for the payment callback
    // For now, we'll just close the modal after a delay
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-legal-navy">Upgrade to Premium</DialogTitle>
          <DialogDescription>
            Get unlimited access to SAFLII legal database and advanced features
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="rounded-lg bg-legal-gold/10 p-4 mb-4">
            <h3 className="font-semibold text-legal-gold mb-2">Premium Benefits</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Unlimited SAFLII database searches</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Full case law document access</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Advanced search filters</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Download and export capabilities</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Monthly Subscription</span>
              <span className="font-bold">R299.99/month</span>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            className="bg-legal-gold hover:bg-legal-gold/90 text-white"
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <span>Subscribe Now</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
