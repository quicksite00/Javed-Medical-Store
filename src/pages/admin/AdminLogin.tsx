import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) { toast.error(error.message); setLoading(false); return; }
    toast.success('Welcome, Admin!');
    navigate('/admin');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[hsl(250,30%,7%)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={logo} alt="Javed Medical" className="mx-auto h-16 w-16 rounded-2xl mb-4 brightness-200" width={64} height={64} />
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Panel</h1>
          <p className="text-white/40 text-sm mt-1 flex items-center justify-center gap-1.5">
            <Shield className="h-3 w-3" /> Javed Medical Store
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-dark rounded-2xl p-7 space-y-5">
          <div><Label className="text-white/60 font-semibold">Email</Label><Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="admin@javedmedical.com" className="bg-white/5 border-white/10 text-white rounded-xl mt-1.5" /></div>
          <div><Label className="text-white/60 font-semibold">Password</Label><Input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" className="bg-white/5 border-white/10 text-white rounded-xl mt-1.5" /></div>
          <Button className="w-full rounded-full gradient-primary border-0 font-bold h-12" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
        </form>
      </div>
    </div>
  );
}
