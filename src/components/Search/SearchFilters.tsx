
import React from 'react';
import { Filter } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface SearchFiltersProps {
  court: string;
  setCourt: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  topic: string;
  setTopic: (value: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  court,
  setCourt,
  year,
  setYear,
  topic,
  setTopic
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div>
        <Select value={court} onValueChange={setCourt}>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Court" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courts</SelectItem>
            <SelectItem value="cc">Constitutional Court</SelectItem>
            <SelectItem value="sca">Supreme Court of Appeal</SelectItem>
            <SelectItem value="high">High Courts</SelectItem>
            <SelectItem value="labour">Labour Court</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Year" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
            <SelectItem value="2020">2020</SelectItem>
            <SelectItem value="older">2019 & Older</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Select value={topic} onValueChange={setTopic}>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Topic" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            <SelectItem value="constitutional">Constitutional Law</SelectItem>
            <SelectItem value="criminal">Criminal Law</SelectItem>
            <SelectItem value="civil">Civil Procedure</SelectItem>
            <SelectItem value="commercial">Commercial Law</SelectItem>
            <SelectItem value="administrative">Administrative Law</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
