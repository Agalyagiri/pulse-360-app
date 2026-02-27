
"use client";

import Link from 'next/link';
import { 
  Calendar, 
  Pill, 
  History, 
  AlertCircle, 
  Stethoscope, 
  UserRound, 
  FileText,
  Settings,
  Bell
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

const MODULES = [
  { id: 'period-tracker', name: 'Period Tracker', icon: Calendar, color: 'bg-rose-50 text-rose-600' },
  { id: 'medicine-reminder', name: 'Medicine Reminder', icon: Pill, color: 'bg-blue-50 text-blue-600' },
  { id: 'patient-history', name: 'Patient History', icon: History, color: 'bg-purple-50 text-purple-600' },
  { id: 'emergency-sos', name: 'Emergency SOS', icon: AlertCircle, color: 'bg-red-50 text-red-600' },
  { id: 'symptom-assistant', name: 'AI Symptom Assistant', icon: Stethoscope, color: 'bg-teal-50 text-teal-600' },
  { id: 'doctor-appointment', name: 'Doctor Appointment', icon: UserRound, color: 'bg-indigo-50 text-indigo-600' },
  { id: 'health-records', name: 'Health Records', icon: FileText, color: 'bg-emerald-50 text-emerald-600' },
  { id: 'settings', name: 'Settings', icon: Settings, color: 'bg-gray-50 text-gray-600' },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-svh bg-background p-6 space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">Hello,</h2>
          <h1 className="text-2xl font-bold font-headline">John Doe</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bell className="text-muted-foreground" size={24} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
          </div>
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/user/100" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <section className="bg-primary rounded-3xl p-6 text-primary-foreground shadow-lg flex flex-col space-y-4">
        <h3 className="text-xl font-headline font-semibold">Keep up with your health!</h3>
        <p className="text-primary-foreground/80 text-sm">You have 2 medicines scheduled for today and an appointment tomorrow.</p>
        <Link href="/medicine-reminder">
          <button className="bg-white/20 hover:bg-white/30 transition-colors rounded-xl px-4 py-2 text-sm font-medium w-fit">
            Check Reminders
          </button>
        </Link>
      </section>

      <div className="grid grid-cols-2 gap-4">
        {MODULES.map((module) => (
          <Link key={module.id} href={`/${module.id}`}>
            <Card className="flex flex-col items-center justify-center p-6 space-y-3 hover:shadow-md transition-all active:scale-95 border-none shadow-sm rounded-2xl h-full">
              <div className={`p-4 rounded-2xl ${module.color}`}>
                <module.icon size={28} />
              </div>
              <span className="text-center text-xs font-semibold font-headline">{module.name}</span>
            </Card>
          </Link>
        ))}
      </div>
      
      <footer className="mt-auto text-center py-4">
        <p className="text-xs text-muted-foreground">Pulse 360° • Version 1.0.0</p>
      </footer>
    </div>
  );
}
