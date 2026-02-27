
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Clock, Pill, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

export default function MedicineReminder() {
  const router = useRouter();
  const [meds, setMeds] = useState<Medication[]>([
    { id: '1', name: 'Amoxicillin', dosage: '500mg', time: '08:00 AM', taken: true },
    { id: '2', name: 'Vitamin D3', dosage: '2000IU', time: '10:00 AM', taken: false },
    { id: '3', name: 'Metformin', dosage: '850mg', time: '02:00 PM', taken: false },
  ]);

  const [newName, setNewName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newTime, setNewTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleAddMed = () => {
    if (!newName || !newDosage || !newTime) return;
    const newMed = {
      id: Math.random().toString(),
      name: newName,
      dosage: newDosage,
      time: newTime,
      taken: false,
    };
    setMeds([...meds, newMed]);
    setNewName('');
    setNewDosage('');
    setNewTime('');
    setIsOpen(false);
  };

  const toggleTaken = (id: string) => {
    setMeds(meds.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  const deleteMed = (id: string) => {
    setMeds(meds.filter(m => m.id !== id));
  };

  return (
    <div className="flex flex-col min-h-svh bg-background p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-secondary">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold font-headline">Medicine Reminder</h1>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="icon" className="rounded-full shadow-lg">
              <Plus size={24} />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90%] rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="font-headline text-xl">Add Medication</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Medicine Name</Label>
                <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Paracetamol" />
              </div>
              <div className="space-y-2">
                <Label>Dosage</Label>
                <Input value={newDosage} onChange={e => setNewDosage(e.target.value)} placeholder="e.g. 500mg" />
              </div>
              <div className="space-y-2">
                <Label>Reminder Time</Label>
                <Input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} />
              </div>
              <Button onClick={handleAddMed} className="w-full h-12 rounded-2xl mt-4">Save Reminder</Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Scheduled Today</h2>
        <div className="space-y-3">
          {meds.map(med => (
            <div 
              key={med.id} 
              className={`p-4 rounded-3xl bg-white shadow-sm flex items-center justify-between transition-all ${med.taken ? 'opacity-60 grayscale' : ''}`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-2xl ${med.taken ? 'bg-secondary' : 'bg-primary/10 text-primary'}`}>
                  <Pill size={24} />
                </div>
                <div>
                  <h3 className={`font-bold text-base ${med.taken ? 'line-through' : ''}`}>{med.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground space-x-2">
                    <span className="flex items-center"><Clock size={12} className="mr-1" /> {med.time}</span>
                    <span>•</span>
                    <span>{med.dosage}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => toggleTaken(med.id)} className={`p-2 rounded-full ${med.taken ? 'text-green-500' : 'text-muted-foreground hover:text-primary'}`}>
                  <CheckCircle2 size={24} />
                </button>
                <button onClick={() => deleteMed(med.id)} className="p-2 rounded-full text-muted-foreground hover:text-destructive">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {meds.length === 0 && (
            <div className="py-20 text-center">
              <Pill className="mx-auto text-muted-foreground opacity-20 mb-4" size={64} />
              <p className="text-muted-foreground font-medium">No medication reminders set.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
