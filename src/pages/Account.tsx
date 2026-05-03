import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, Navigate } from 'react-router-dom';
import { Package, User } from 'lucide-react';

export default function Account() {
  const { user, loading, signOut } = useAuth();
  const { data: profile } = useQuery({ queryKey: ['profile', user?.id], enabled: !!user, queryFn: async () => { const { data } = await supabase.from('profiles').select('*').eq('user_id', user!.id).single(); return data; } });
  const { data: orders } = useQuery({ queryKey: ['my-orders', user?.id], enabled: !!user, queryFn: async () => { const { data } = await supabase.from('orders').select('*').eq('user_id', user!.id).order('created_at', { ascending: false }); return data || []; } });

  if (loading) return null;
  if (!user) return <Navigate to="/auth" />;

  const statusColor: Record<string, string> = {
    pending: 'bg-warning/10 text-warning', confirmed: 'bg-primary/10 text-primary', processing: 'bg-primary/10 text-primary',
    shipped: 'bg-primary/10 text-primary', delivered: 'bg-success/10 text-success', cancelled: 'bg-destructive/10 text-destructive',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-8 flex-1">
        <h1 className="text-3xl font-black tracking-tight mb-8">My Account</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border/50 bg-card p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center"><User className="h-7 w-7 text-primary-foreground" /></div>
              <div><p className="font-bold">{profile?.full_name || 'User'}</p><p className="text-sm text-muted-foreground">{profile?.email}</p></div>
            </div>
            {profile?.phone && <p className="text-sm"><strong>Phone:</strong> {profile.phone}</p>}
            {profile?.address && <p className="text-sm"><strong>Address:</strong> {profile.address}, {profile.city}</p>}
            <Button variant="outline" size="sm" className="w-full text-destructive rounded-full" onClick={() => signOut()}>Sign Out</Button>
          </div>
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-lg font-black flex items-center gap-2"><Package className="h-5 w-5 text-primary" /> Order History</h2>
            {!orders || orders.length === 0 ? (
              <div className="text-center py-10 rounded-2xl border border-border/50 bg-card text-muted-foreground">
                <p className="font-medium">No orders yet</p>
                <Button asChild className="mt-3 rounded-full gradient-primary border-0"><Link to="/products">Start Shopping</Link></Button>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map(o => (
                  <div key={o.id} className="rounded-2xl border border-border/50 bg-card p-5 flex items-center justify-between hover:shadow-lg transition-shadow">
                    <div><p className="font-bold text-primary">{o.order_number}</p><p className="text-sm text-muted-foreground">{new Date(o.created_at).toLocaleDateString()} · PKR {Number(o.total).toLocaleString()}</p></div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${statusColor[o.status]} border-0 capitalize rounded-full`}>{o.status}</Badge>
                      <Button variant="ghost" size="sm" className="rounded-full" asChild><Link to={`/track-order?order=${o.order_number}`}>Track</Link></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
