
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Filter, Activity, Thermometer, ShieldCheck, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

const HISTORY = [
  { id: '1', event: 'Flu Vaccination', date: 'Oct 15, 2023', doctor: 'City Pharmacy', type: 'vaccine' },
  { id: '2', event: 'Cardiac Checkup', date: 'Sep 22, 2023', doctor: 'Dr. Sarah Miller', type: 'appointment' },
  { id: '3', event: 'Blood Pressure High', date: 'Sep 20, 2023', doctor: 'Self-Logged', type: 'log' },
  { id: '4', event: 'General Health Exam', date: 'Jul 10, 2023', doctor: 'Dr. John Watson', type: 'appointment' },
  { id: '5', event: 'Tetanus Shot', date: 'Jun 15, 2023', doctor: 'Mercy Hospital', type: 'vaccine' },
];

export default function PatientHistory() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const getIcon = (type: string) => {
    switch (type) {
      case 'vaccine': return <ShieldCheck className="text-blue-500" />;
      case 'appointment': return <Activity className="text-green-500" />;
      case 'log': return <Thermometer className="text-orange-500" />;
      default: return <Activity />;
    }
  };

  return (
    <div className="flex flex-col min-h-svh bg-background p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-secondary">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold font-headline">Patient History</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-secondary">
          <Filter size={20} className="text-muted-foreground" />
        </button>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input 
          className="pl-12 h-12 rounded-2xl border-none shadow-sm bg-white" 
          placeholder="Search treatments, doctors..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-8 overflow-y-auto">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">Recent Activities</h2>
          <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {HISTORY.filter(h => h.event.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
              <div key={item.id} className="relative flex items-center justify-between group">
                <div className="flex items-center w-full">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-slate-100 shadow-sm shrink-0 z-10 transition-transform group-hover:scale-110">
                    {getIcon(item.type)}
                  </div>
                  <div className="ml-4 flex-1 bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold">{item.event}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.doctor}</p>
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
