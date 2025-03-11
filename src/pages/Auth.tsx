
import React, { useState } from 'react';
import { LoginForm } from '@/components/Auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';

const Auth = () => {
  const { user, continueAsGuest } = useAuth();
  
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-legal-grey flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-legal-navy">
          Lex<span className="text-legal-gold">AI</span>
        </h1>
        <p className="text-muted-foreground">South Africa's Premier Legal AI Platform</p>
      </div>
      
      <div className="w-full max-w-md">
        <div className="space-y-4">
          <div>
            <LoginForm />
          </div>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-legal-grey px-2 text-muted-foreground">
                Or continue without an account
              </span>
            </div>
          </div>
          
          <Button 
            onClick={continueAsGuest}
            className="w-full bg-legal-navy/10 hover:bg-legal-navy/20 text-legal-navy"
            variant="outline"
          >
            <UserIcon className="mr-2 h-4 w-4" />
            Continue as Guest
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
