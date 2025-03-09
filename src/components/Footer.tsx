
import React from 'react';
import { Separator } from '@/components/ui/separator';

export const Footer = () => {
  return (
    <footer className="bg-legal-grey py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-legal-navy font-bold text-lg mb-3">Lex<span className="text-legal-gold">AI</span></h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Empowering legal professionals across South Africa with AI-powered research tools and insights.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium text-legal-navy mb-3">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-legal-gold">Features</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-legal-gold">Pricing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-legal-gold">Case Studies</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-legal-gold">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-legal-navy mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-legal-gold">Documentation</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-legal-gold">Help Center</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-legal-gold">Training</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-legal-gold">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-legal-navy mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-legal-gold">About</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-legal-gold">Contact</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-legal-gold">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-legal-gold">Blog</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <Separator className="mb-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="mb-4 md:mb-0">
            © 2023 LexAI. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-legal-gold">Terms</a>
            <a href="#" className="hover:text-legal-gold">Privacy</a>
            <a href="#" className="hover:text-legal-gold">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
