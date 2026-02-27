
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Droplets, Calendar as CalendarIcon, Heart, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';

export default function PeriodTracker() {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    // Initialize date only on client to avoid hydration mismatch
    setDate(new Date());
  }, []);

  return (
    <div className="flex flex-col min-h-svh bg-background p-6 space-y-6">
      <header className="flex items-center space-x-4">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-secondary">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold font-headline">Period Tracker</h1>
      </header>

      <section className="bg-rose-500 rounded-3xl p-6 text-white shadow-lg space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Droplets size={120} />
        </div>
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h2 className="text-3xl font-bold font-headline">Day 14</h2>
            <p className="text-rose-100 text-sm">Ovulation Phase</p>
          </div>
          <div className="p-2 bg-white/20 rounded-full">
            <Info size={20} />
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <div className="flex justify-between text-xs font-bold text-rose-100 uppercase tracking-widest">
            <span>Period starts in</span>
            <span>8 Days</span>
          </div>
          <div className="h-2 w-full bg-white/30 rounded-full">
            <div className="h-2 w-[70%] bg-white rounded-full"></div>
          </div>
        </div>

        <Button className="w-full bg-white text-rose-500 hover:bg-rose-50 rounded-2xl font-bold shadow-md relative z-10">
          Log Symptoms
        </Button>
      </section>

      <div className="bg-white rounded-3xl shadow-sm p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-3xl border-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="rounded-3xl border-none shadow-sm bg-purple-50">
          <CardContent className="p-4 flex flex-col items-center space-y-2">
            <div className="p-3 bg-white rounded-2xl text-purple-600 shadow-sm">
              <Heart size={24} />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-purple-600 uppercase">Mood</p>
              <p className="font-bold text-sm">Happy</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-none shadow-sm bg-orange-50">
          <CardContent className="p-4 flex flex-col items-center space-y-2">
            <div className="p-3 bg-white rounded-2xl text-orange-600 shadow-sm">
              <CalendarIcon size={24} />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-orange-600 uppercase">Cycle</p>
              <p className="font-bold text-sm">28 Days</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
