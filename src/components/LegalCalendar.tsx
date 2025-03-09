
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

const upcomingDates = [
  {
    id: 1,
    title: 'Constitutional Court Term Begins',
    date: 'May 14, 2023',
    time: '10:00 AM',
    type: 'Court Term'
  },
  {
    id: 2,
    title: 'Deadline: Tax Returns (Companies)',
    date: 'June 30, 2023',
    type: 'Filing Deadline'
  },
  {
    id: 3,
    title: 'Smith v. Johnson Hearing',
    date: 'May 22, 2023',
    time: '9:30 AM',
    location: 'Cape Town High Court, Court 3',
    type: 'Client Case'
  },
  {
    id: 4,
    title: 'New Data Protection Act Effective',
    date: 'July 1, 2023',
    type: 'Legislation Date'
  }
];

export const LegalCalendar = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-legal-navy">Legal Calendar</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {upcomingDates.map((event) => (
            <div key={event.id} className="flex items-start space-x-3 p-2 rounded hover:bg-legal-grey/50 transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                event.type === 'Client Case' 
                  ? 'bg-blue-100 text-blue-600'
                  : event.type === 'Filing Deadline'
                  ? 'bg-red-100 text-red-600'
                  : event.type === 'Legislation Date'
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-green-100 text-green-600'
              }`}>
                <Calendar className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-legal-navy">{event.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{event.date}</span>
                  {event.time && (
                    <>
                      <span className="mx-1">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{event.time}</span>
                    </>
                  )}
                </div>
                {event.location && (
                  <p className="text-xs text-muted-foreground mt-1">{event.location}</p>
                )}
                <div className="mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    event.type === 'Client Case' 
                      ? 'bg-blue-50 text-blue-600'
                      : event.type === 'Filing Deadline'
                      ? 'bg-red-50 text-red-600'
                      : event.type === 'Legislation Date'
                      ? 'bg-purple-50 text-purple-600'
                      : 'bg-green-50 text-green-600'
                  }`}>
                    {event.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
