"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login/signup
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-svh space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg mb-2">
          <Activity size={32} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">Pulse 360°</h1>
        <p className="text-muted-foreground text-sm">Your modern health companion</p>
      </div>

      <Card className="w-full border-none shadow-none bg-transparent">
        <CardHeader className="text-center px-0">
          <CardTitle className="text-2xl font-headline">{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
          <CardDescription>
            {isLogin ? 'Sign in to access your records' : 'Start your health journey today'}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required />
              </div>
            )}
            <Button type="submit" className="w-full h-12 text-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline font-medium"
              suppressHydrationWarning
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </CardContent>
      </Card>
      
      <p className="text-xs text-muted-foreground mt-auto">
        By continuing, you agree to our Terms and Privacy Policy.
      </p>
    </div>
  );
}
