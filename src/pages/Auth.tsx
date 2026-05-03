import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) { toast.error(error.message); setLoading(false); return; }
      toast.success('Welcome back!');
      navigate('/');
    } else {
      if (!fullName.trim()) { toast.error('Enter your name'); setLoading(false); return; }
      const { error } = await signUp(email, password, fullName);
      if (error) { toast.error(error.message); setLoading(false); return; }
      toast.success('Account created! Check your email to verify.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-12 flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={logo} alt="Javed Medical" className="mx-auto h-16 w-16 rounded-2xl mb-4 shadow-xl shadow-primary/20" width={64} height={64} />
            <h1 className="text-2xl font-black tracking-tight">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-muted-foreground mt-1">{mode === 'login' ? 'Sign in to your account' : 'Join Javed Medical Store'}</p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-border/50 bg-card p-7 space-y-5">
            {mode === 'register' && (
              <div><Label className="font-semibold">Full Name</Label><Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your name" className="rounded-xl mt-1.5" /></div>
            )}
            <div><Label className="font-semibold">Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="rounded-xl mt-1.5" /></div>
            <div><Label className="font-semibold">Password</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="rounded-xl mt-1.5" /></div>
            <Button className="w-full rounded-full gradient-primary border-0 font-bold h-12" disabled={loading}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm mt-5 text-muted-foreground">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-primary font-bold hover:underline">
              {mode === 'login' ? 'Register' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
