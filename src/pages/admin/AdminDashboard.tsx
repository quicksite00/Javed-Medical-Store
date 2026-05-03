import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, DollarSign, Package, AlertTriangle, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { data: orders } = useQuery({ queryKey: ['admin-orders'], queryFn: async () => { const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false }); return data || []; } });
  const { data: products } = useQuery({ queryKey: ['admin-products-stats'], queryFn: async () => { const { data } = await supabase.from('products').select('*'); return data || []; } });

  const today = new Date().toDateString();
  const todayOrders = orders?.filter(o => new Date(o.created_at).toDateString() === today) || [];
  const todayRevenue = todayOrders.reduce((s, o) => s + Number(o.total), 0);
  const lowStock = products?.filter(p => p.stock < 10) || [];
  const recentOrders = orders?.slice(0, 5) || [];

  const statusColor: Record<string, string> = {
    pending: 'bg-warning/20 text-warning', confirmed: 'bg-primary/20 text-primary', processing: 'bg-primary/20 text-primary',
    shipped: 'bg-primary/20 text-primary', delivered: 'bg-success/20 text-success', cancelled: 'bg-destructive/20 text-destructive',
  };

  const stats = [
    { label: "Today's Orders", value: todayOrders.length, icon: ShoppingCart, gradient: 'from-violet-500 to-purple-600' },
    { label: "Today's Revenue", value: `PKR ${todayRevenue.toLocaleString()}`, icon: DollarSign, gradient: 'from-emerald-500 to-green-600' },
    { label: 'Total Products', value: products?.length || 0, icon: Package, gradient: 'from-blue-500 to-cyan-600' },
    { label: 'Low Stock', value: lowStock.length, icon: AlertTriangle, gradient: lowStock.length > 0 ? 'from-amber-500 to-orange-600' : 'from-emerald-500 to-green-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tight">Dashboard</h1>
        <span className="text-sm text-white/40">{new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="glass-dark rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">{s.label}</p>
                <p className="text-2xl font-black mt-2">{s.value}</p>
              </div>
              <div className={`bg-gradient-to-br ${s.gradient} rounded-xl p-2.5`}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Recent Orders</h3>
          {recentOrders.length === 0 ? <p className="text-white/40 text-sm">No orders yet</p> : (
            <div className="space-y-3">
              {recentOrders.map(o => (
                <div key={o.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div><p className="font-semibold text-sm">{o.order_number}</p><p className="text-xs text-white/40">{o.shipping_name} · {new Date(o.created_at).toLocaleDateString()}</p></div>
                  <div className="text-right"><p className="text-sm font-bold">PKR {Number(o.total).toLocaleString()}</p><Badge className={`${statusColor[o.status]} border-0 text-[10px] capitalize rounded-full`}>{o.status}</Badge></div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-dark rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-warning" /> Low Stock Alerts</h3>
          {lowStock.length === 0 ? <p className="text-white/40 text-sm">All products are well stocked ✓</p> : (
            <div className="space-y-3">
              {lowStock.map(p => (
                <div key={p.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <p className="text-sm">{p.name}</p>
                  <Badge className="bg-warning/20 text-warning border-0 rounded-full">{p.stock} left</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
