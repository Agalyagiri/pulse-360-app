
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldAlert, Phone, MapPin, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function EmergencySOS() {
  const router = useRouter();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setActive(true);
      setCountdown(null);
      toast({
        title: "SOS Alert Sent!",
        description: "Emergency services and contacts have been notified with your location.",
        variant: "destructive",
      });
    }
    return () => clearTimeout(timer);
  }, [countdown, toast]);

  const triggerSOS = () => {
    setCountdown(5);
  };

  const cancelSOS = () => {
    setCountdown(null);
    setActive(false);
  };

  return (
    <div className="flex flex-col min-h-svh bg-background p-6 space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center space-x-4">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-secondary">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold font-headline">Emergency SOS</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold font-headline">In an Emergency?</h2>
          <p className="text-muted-foreground text-sm max-w-[250px] mx-auto">
            Press the button below. We'll alert your doctor, family, and emergency services.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          {countdown !== null ? (
            <div className="w-64 h-64 rounded-full border-8 border-red-500 flex items-center justify-center animate-pulse">
              <span className="text-7xl font-bold text-red-500">{countdown}</span>
            </div>
          ) : (
            <button 
              onClick={triggerSOS}
              className={`w-64 h-64 rounded-full flex flex-col items-center justify-center space-y-2 transition-all shadow-2xl ${active ? 'bg-red-600 scale-105' : 'bg-red-500 hover:bg-red-600 active:scale-95'}`}
            >
              <ShieldAlert size={80} className="text-white" />
              <span className="text-white font-bold text-2xl uppercase tracking-widest">SOS</span>
            </button>
          )}
          
          {countdown === null && !active && (
            <div className="absolute -z-10 w-72 h-72 bg-red-100 rounded-full animate-ping opacity-50"></div>
          )}
        </div>

        {countdown !== null && (
          <Button variant="outline" size="lg" className="rounded-2xl px-12" onClick={cancelSOS}>
            Cancel Alert
          </Button>
        )}

        {active && (
          <div className="text-center text-red-600 font-bold animate-pulse">
            EMERGENCY SIGNAL ACTIVE
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center space-x-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Heart size={20} /></div>
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Doctor</p>
              <p className="text-xs font-semibold">Dr. Sarah Miller</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center space-x-3">
            <div className="p-2 bg-green-50 text-green-600 rounded-xl"><Users size={20} /></div>
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Family</p>
              <p className="text-xs font-semibold">Home (Wife)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-auto">
        <div className="flex items-center space-x-3 text-sm font-medium text-muted-foreground bg-secondary/50 p-4 rounded-2xl">
          <MapPin size={20} className="text-primary" />
          <span>742 Evergreen Terrace, Springfield</span>
        </div>
        <Button variant="ghost" className="w-full text-red-500 hover:bg-red-50 hover:text-red-600 font-bold">
          <Phone size={18} className="mr-2" /> CALL 911 DIRECTLY
        </Button>
      </div>
    </div>
  );
}
