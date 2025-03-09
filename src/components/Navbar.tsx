
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sidebar } from './Sidebar';

export const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <header className="border-b border-legal-lightBlue bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
          )}
          <div className="flex items-center">
            <span className="text-legal-navy font-bold text-xl">Lex<span className="text-legal-gold">AI</span></span>
            <span className="text-xs text-muted-foreground ml-2">South Africa</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search cases, statutes, or documents..." 
              className="pl-10 pr-4 py-2 w-[350px] bg-legal-grey rounded-md focus:outline-none focus:ring-1 focus:ring-legal-navy text-sm"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-legal-navy text-white text-sm">SA</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
