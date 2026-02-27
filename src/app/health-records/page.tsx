
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, FileText, Upload, MoreVertical, Search, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const RECORDS = [
  { id: '1', title: 'Blood Test Report', date: 'Oct 24, 2023', type: 'PDF', size: '1.2 MB' },
  { id: '2', title: 'Chest X-Ray', date: 'Sep 12, 2023', type: 'JPG', size: '4.5 MB' },
  { id: '3', title: 'Vaccination Certificate', date: 'Aug 05, 2023', type: 'PDF', size: '0.8 MB' },
  { id: '4', title: 'MRI Scan - Head', date: 'Jul 21, 2023', type: 'DICOM', size: '124 MB' },
];

export default function HealthRecords() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col min-h-svh bg-background p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-secondary">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold font-headline">Health Records</h1>
        </div>
        <Button size="icon" variant="outline" className="rounded-full">
          <Upload size={20} />
        </Button>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input 
          className="pl-12 h-12 rounded-2xl border-none shadow-sm bg-white" 
          placeholder="Search reports..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">All Documents</h2>
          <span className="text-xs text-muted-foreground">{RECORDS.length} items</span>
        </div>

        <div className="grid gap-4">
          {RECORDS.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase())).map(record => (
            <div key={record.id} className="bg-white p-4 rounded-3xl shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{record.title}</h3>
                  <div className="flex items-center space-x-2 text-[10px] text-muted-foreground">
                    <span>{record.date}</span>
                    <span>•</span>
                    <span>{record.type}</span>
                    <span>•</span>
                    <span>{record.size}</span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-full hover:bg-secondary">
                    <MoreVertical size={20} className="text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  <DropdownMenuItem className="flex items-center space-x-2">
                    <Eye size={16} /> <span>View</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-2">
                    <Download size={16} /> <span>Download</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary rounded-3xl p-6 text-white space-y-4 shadow-lg shadow-primary/20">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-2xl">
            <Upload size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg font-headline">New Record?</h3>
            <p className="text-xs text-white/70">Upload reports for better history tracking.</p>
          </div>
        </div>
        <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-xl font-bold">
          Upload Now
        </Button>
      </div>
    </div>
  );
}
