
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Star, MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DOCTORS = [
  { 
    id: '1', 
    name: 'Dr. Sarah Miller', 
    specialty: 'Cardiologist', 
    rating: 4.9, 
    location: 'City Health Center', 
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  { 
    id: '2', 
    name: 'Dr. James Wilson', 
    specialty: 'Neurologist', 
    rating: 4.8, 
    location: 'Mercy Hospital', 
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  { 
    id: '3', 
    name: 'Dr. Emily Chen', 
    specialty: 'Pediatrician', 
    rating: 5.0, 
    location: 'Kidney Specialist Clinic', 
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
];

export default function DoctorAppointment() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col min-h-svh bg-background p-6 space-y-6">
      <header className="flex items-center space-x-4">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-secondary">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold font-headline">Doctor Appointment</h1>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input 
          className="pl-12 h-14 rounded-2xl border-none shadow-sm bg-white" 
          placeholder="Search specialists, clinics..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-6 overflow-y-auto pb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-headline">Top Specialists</h2>
          <button className="text-primary text-sm font-semibold">See All</button>
        </div>

        <div className="space-y-4">
          {DOCTORS.map(doc => (
            <div key={doc.id} className="bg-white p-4 rounded-3xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="flex space-x-4">
                <Avatar className="w-16 h-16 rounded-2xl">
                  <AvatarImage src={doc.image} />
                  <AvatarFallback>{doc.name[4]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base">{doc.name}</h3>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{doc.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-primary font-medium">{doc.specialty}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin size={12} className="mr-1" />
                    {doc.location}
                  </div>
                </div>
              </div>
              
              <div className="pt-2 flex space-x-2">
                <Button variant="outline" className="flex-1 rounded-xl text-xs h-10">Profile</Button>
                <Button className="flex-1 rounded-xl text-xs h-10 shadow-md">Book Appointment</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-3xl p-6 space-y-4">
          <h2 className="font-bold font-headline">Recent Appointments</h2>
          <div className="bg-white p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-secondary rounded-xl"><Calendar size={20} className="text-primary" /></div>
              <div>
                <p className="text-sm font-bold">Dr. James Wilson</p>
                <p className="text-xs text-muted-foreground">12 Oct 2023, 10:30 AM</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
