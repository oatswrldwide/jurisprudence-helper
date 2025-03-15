
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, signInWithGoogle } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
  isGuest: boolean;
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock guest user for development mode
const GUEST_USER: User = {
  id: 'guest',
  app_metadata: {},
  user_metadata: { name: 'Guest User' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Check if user was previously in guest mode
    const wasGuest = localStorage.getItem('guestMode') === 'true';
    if (wasGuest) {
      setUser(GUEST_USER);
      setIsGuest(true);
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsGuest(false); // Reset guest mode on auth change
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsGuest(false);
    localStorage.removeItem('guestMode');
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: window.location.origin
      }
    });
    if (error) throw error;
  };

  const handleSignInWithGoogle = async () => {
    setIsGuest(false);
    localStorage.removeItem('guestMode');
    
    const { error } = await signInWithGoogle();
    if (error) throw error;
  };

  const signOut = async () => {
    // Clear guest mode if applicable
    if (isGuest) {
      setUser(null);
      setIsGuest(false);
      localStorage.removeItem('guestMode');
      return;
    }
    
    // Otherwise sign out from Supabase
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const continueAsGuest = () => {
    setUser(GUEST_USER);
    setIsGuest(true);
    localStorage.setItem('guestMode', 'true');
    toast({
      title: "Welcome, Guest!",
      description: "You're using LexAI in guest mode",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      loading, 
      signIn,
      signUp, 
      signOut, 
      continueAsGuest,
      isGuest,
      signInWithGoogle: handleSignInWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
