
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  Search, 
  FileText, 
  BookOpen, 
  Scale, 
  Calendar, 
  Settings,
  Briefcase
} from 'lucide-react';

export const Sidebar = () => {
  // Active section state would go here in a real app
  const activeSection = 'dashboard';
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'search', label: 'Legal Search', icon: Search },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'research', label: 'Research', icon: BookOpen },
    { id: 'cases', label: 'Case Law', icon: Scale },
    { id: 'calendar', label: 'Legal Calendar', icon: Calendar },
  ];
  
  const bottomNavItems = [
    { id: 'client', label: 'Client Portal', icon: Briefcase },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  
  return (
    <aside className="h-screen flex flex-col bg-legal-navy text-white w-64 min-w-64 shrink-0">
      <div className="p-6">
        <h2 className="font-bold text-xl">Lex<span className="text-legal-gold">AI</span></h2>
        <p className="text-xs text-gray-400 mt-1">Legal Assistant for South Africa</p>
      </div>
      
      <Separator className="bg-legal-navy/20" />
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1.5">
          {navItems.map((item) => (
            <li key={item.id}>
              <Button
                variant="ghost"
                className={`w-full justify-start font-medium ${
                  activeSection === item.id
                    ? 'bg-legal-gold/20 text-legal-gold'
                    : 'hover:bg-legal-navy/80 hover:text-legal-gold'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        <Separator className="bg-legal-navy/20 mb-4" />
        <ul className="space-y-1.5">
          {bottomNavItems.map((item) => (
            <li key={item.id}>
              <Button
                variant="ghost"
                className="w-full justify-start font-medium hover:bg-legal-navy/80 hover:text-legal-gold"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
