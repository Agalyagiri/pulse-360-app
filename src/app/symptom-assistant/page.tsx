
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, Sparkles, Loader2, AlertTriangle, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { aiSymptomGuidance, type AiSymptomGuidanceOutput } from '@/ai/flows/ai-symptom-guidance';

export default function SymptomAssistant() {
  const router = useRouter();
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiSymptomGuidanceOutput | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;
    
    setLoading(true);
    try {
      const guidance = await aiSymptomGuidance({ symptoms });
      setResult(guidance);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-svh bg-background p-6 space-y-6">
      <header className="flex items-center space-x-4">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-secondary">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold font-headline">Symptom Assistant</h1>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto pb-20">
        <div className="bg-primary/5 rounded-2xl p-4 flex items-start space-x-3">
          <Sparkles className="text-primary shrink-0 mt-1" size={20} />
          <p className="text-sm text-primary-foreground/90 leading-relaxed text-slate-700">
            Tell me about your symptoms. I'll provide guidance and let you know if you should see a doctor.
          </p>
        </div>

        {!result && !loading && (
          <form onSubmit={handleAnalyze} className="space-y-4">
            <Textarea 
              placeholder="e.g., I have a persistent headache and feel dizzy for the last two days..."
              className="min-h-[150px] rounded-2xl bg-white border-none shadow-sm focus-visible:ring-accent"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <Button 
              disabled={!symptoms.trim()}
              type="submit" 
              className="w-full h-12 rounded-2xl flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Analyze Symptoms</span>
              <Send size={18} />
            </Button>
          </form>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="animate-spin text-primary" size={48} />
            <p className="text-muted-foreground font-medium animate-pulse">Analyzing health patterns...</p>
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-white">
              <CardHeader className="bg-secondary/50 pb-4">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Stethoscope className="text-primary" size={20} />
                  <span>Personalized Guidance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">{result.guidance}</p>
                
                {result.consultationNeeded && (
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start space-x-3">
                    <AlertTriangle className="text-red-500 shrink-0 mt-1" size={20} />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-red-900">Doctor Consultation Recommended</p>
                      <p className="text-xs text-red-700">{result.recommendationReason}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1 rounded-2xl h-12" onClick={() => {setResult(null); setSymptoms('');}}>
                Start Over
              </Button>
              {result.consultationNeeded && (
                <Button className="flex-1 rounded-2xl h-12" onClick={() => router.push('/doctor-appointment')}>
                  Book Appointment
                </Button>
              )}
            </div>
            
            <p className="text-[10px] text-center text-muted-foreground italic px-4">
              Disclaimer: This AI tool is for informational purposes only and not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
