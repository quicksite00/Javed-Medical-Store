import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { Package, Search, CheckCircle2, Clock, Truck, Box } from 'lucide-react';
import { toast } from 'sonner';

const statusSteps = [
  { key: 'pending', label: 'Pending', icon: Clock },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
  { key: 'processing', label: 'Processing', icon: Box },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Package },
];

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [orderNum, setOrderNum] = useState(searchParams.get('order') || '');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNum.trim()) { toast.error('Enter order number'); return; }
    setLoading(true); setSearched(true);
    const { data } = await supabase.from('orders').select('*').eq('order_number', orderNum.trim().toUpperCase()).maybeSingle();
    if (data && (!phone || data.shipping_phone.includes(phone))) { setOrder(data); } else { setOrder(null); toast.error('Order not found'); }
    setLoading(false);
  };

  const currentIndex = order ? statusSteps.findIndex(s => s.key === order.status) : -1;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-8 flex-1 max-w-2xl">
        <h1 className="text-3xl font-black tracking-tight mb-8 flex items-center gap-3"><Package className="h-8 w-8 text-primary" /> Track Your Order</h1>

        <form onSubmit={handleSearch} className="rounded-2xl border border-border/50 bg-card p-7 space-y-5 mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label className="font-semibold">Order Number *</Label><Input value={orderNum} onChange={e => setOrderNum(e.target.value)} placeholder="JMS-XXXXX" className="rounded-xl mt-1.5" /></div>
            <div><Label className="font-semibold">Phone (optional)</Label><Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="03XX-XXXXXXX" className="rounded-xl mt-1.5" /></div>
          </div>
          <Button type="submit" disabled={loading} className="w-full rounded-full gradient-primary border-0 font-bold h-12">
            <Search className="h-4 w-4 mr-2" /> {loading ? 'Searching...' : 'Track Order'}
          </Button>
        </form>

        {order && (
          <div className="rounded-2xl border border-border/50 bg-card p-7 space-y-8 animate-scale-in">
            <div className="flex justify-between items-start">
              <div><p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Order Number</p><p className="text-2xl font-black text-gradient mt-1">{order.order_number}</p></div>
              <div className="text-right"><p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total</p><p className="text-xl font-black mt-1">PKR {Number(order.total).toLocaleString()}</p></div>
            </div>
            <div className="space-y-0">
              {statusSteps.map((s, i) => {
                const isActive = i <= currentIndex;
                const isCurrent = i === currentIndex;
                return (
                  <div key={s.key} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${
                        isCurrent ? 'gradient-primary text-primary-foreground ring-4 ring-primary/20 shadow-lg shadow-primary/25' :
                        isActive ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}><s.icon className="h-5 w-5" /></div>
                      {i < statusSteps.length - 1 && <div className={`w-0.5 h-8 ${isActive ? 'bg-primary' : 'bg-muted'}`} />}
                    </div>
                    <div className="pt-3"><p className={`font-bold ${isActive ? '' : 'text-muted-foreground'}`}>{s.label}</p></div>
                  </div>
                );
              })}
            </div>
            <div className="text-sm space-y-1.5 text-muted-foreground bg-accent/30 rounded-2xl p-5">
              <p><strong className="text-foreground">Deliver to:</strong> {order.shipping_name}</p>
              <p><strong className="text-foreground">Address:</strong> {order.shipping_address}, {order.shipping_city}</p>
              <p><strong className="text-foreground">Phone:</strong> {order.shipping_phone}</p>
              <p><strong className="text-foreground">Placed:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {searched && !order && !loading && <div className="text-center py-16 text-muted-foreground"><p className="font-bold">No order found with that number.</p></div>}
      </div>
      <Footer />
    </div>
  );
}
