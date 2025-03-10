
import React, { useState } from 'react';
import { LoginForm } from '@/components/Auth/LoginForm';
import { SignUpForm } from '@/components/Auth/SignUpForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Auth = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  
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
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="login" className="data-[state=active]:bg-legal-gold data-[state=active]:text-white">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-legal-gold data-[state=active]:text-white">
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
