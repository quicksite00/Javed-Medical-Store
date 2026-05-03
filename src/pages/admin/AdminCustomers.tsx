import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function AdminCustomers() {
  const { data: profiles } = useQuery({ queryKey: ['admin-customers'], queryFn: async () => { const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false }); return data || []; } });
  const { data: orders } = useQuery({ queryKey: ['admin-all-orders'], queryFn: async () => { const { data } = await supabase.from('orders').select('user_id'); return data || []; } });

  const orderCounts = orders?.reduce((acc: Record<string, number>, o) => { if (o.user_id) acc[o.user_id] = (acc[o.user_id] || 0) + 1; return acc; }, {}) || {};

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black tracking-tight">Customers</h1>
      <div className="glass-dark rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-white/40 font-bold">Name</TableHead>
              <TableHead className="text-white/40 font-bold">Email</TableHead>
              <TableHead className="text-white/40 font-bold">Phone</TableHead>
              <TableHead className="text-white/40 font-bold">City</TableHead>
              <TableHead className="text-white/40 font-bold">Orders</TableHead>
              <TableHead className="text-white/40 font-bold">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles?.map(p => (
              <TableRow key={p.id} className="border-white/5 hover:bg-white/5">
                <TableCell className="font-semibold">{p.full_name || '—'}</TableCell>
                <TableCell className="text-white/60">{p.email}</TableCell>
                <TableCell className="text-white/60">{p.phone || '—'}</TableCell>
                <TableCell className="text-white/60">{p.city || '—'}</TableCell>
                <TableCell><Badge className="bg-primary/20 text-primary border-0 rounded-full">{orderCounts[p.user_id] || 0}</Badge></TableCell>
                <TableCell className="text-white/40 text-xs">{new Date(p.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
