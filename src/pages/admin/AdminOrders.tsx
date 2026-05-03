import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Eye } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type OrderStatus = Database['public']['Enums']['order_status'];
const statuses: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusColor: Record<string, string> = {
  pending: 'bg-warning/20 text-warning', confirmed: 'bg-primary/20 text-primary', processing: 'bg-primary/20 text-primary',
  shipped: 'bg-primary/20 text-primary', delivered: 'bg-success/20 text-success', cancelled: 'bg-destructive/20 text-destructive',
};

export default function AdminOrders() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<any>(null);

  const { data: orders } = useQuery({ queryKey: ['admin-orders'], queryFn: async () => { const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false }); return data || []; } });
  const { data: orderItems } = useQuery({ queryKey: ['admin-order-items', selected?.id], enabled: !!selected, queryFn: async () => { const { data } = await supabase.from('order_items').select('*').eq('order_id', selected.id); return data || []; } });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => { const { error } = await supabase.from('orders').update({ status }).eq('id', id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-orders'] }); toast.success('Status updated'); },
  });

  const filtered = filter === 'all' ? orders : orders?.filter(o => o.status === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black tracking-tight">Orders</h1>
      <div className="flex gap-2 flex-wrap">
        <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}
          className={`rounded-full font-semibold ${filter === 'all' ? 'gradient-primary border-0' : 'border-white/10 text-white/60'}`}>All</Button>
        {statuses.map(s => (
          <Button key={s} variant={filter === s ? 'default' : 'outline'} size="sm" onClick={() => setFilter(s)}
            className={`capitalize rounded-full font-semibold ${filter === s ? 'gradient-primary border-0' : 'border-white/10 text-white/60'}`}>{s}</Button>
        ))}
      </div>

      <div className="glass-dark rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-white/40 font-bold">Order #</TableHead>
              <TableHead className="text-white/40 font-bold">Customer</TableHead>
              <TableHead className="text-white/40 font-bold">Total</TableHead>
              <TableHead className="text-white/40 font-bold">Status</TableHead>
              <TableHead className="text-white/40 font-bold">Date</TableHead>
              <TableHead className="text-white/40 font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered?.map(o => (
              <TableRow key={o.id} className="border-white/5 hover:bg-white/5">
                <TableCell className="font-bold text-primary">{o.order_number}</TableCell>
                <TableCell>{o.shipping_name}<br /><span className="text-xs text-white/30">{o.shipping_phone}</span></TableCell>
                <TableCell className="font-semibold">PKR {Number(o.total).toLocaleString()}</TableCell>
                <TableCell>
                  <Select value={o.status} onValueChange={(v: OrderStatus) => updateStatus.mutate({ id: o.id, status: v })}>
                    <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white h-8 rounded-full">
                      <Badge className={`${statusColor[o.status]} border-0 capitalize text-xs rounded-full`}>{o.status}</Badge>
                    </SelectTrigger>
                    <SelectContent>{statuses.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}</SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-white/40 text-xs">{new Date(o.created_at).toLocaleDateString()}</TableCell>
                <TableCell><Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white rounded-full" onClick={() => setSelected(o)}><Eye className="h-4 w-4" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-[hsl(250,25%,12%)] border-white/10 text-white rounded-2xl">
          <DialogHeader><DialogTitle className="font-black">Order {selected?.order_number}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-2 text-white/60">
                <p><strong className="text-white/80">Name:</strong> {selected.shipping_name}</p>
                <p><strong className="text-white/80">Phone:</strong> {selected.shipping_phone}</p>
                <p><strong className="text-white/80">Address:</strong> {selected.shipping_address}, {selected.shipping_city}</p>
                <p><strong className="text-white/80">Payment:</strong> {selected.payment_method?.toUpperCase()}</p>
              </div>
              <hr className="border-white/10" />
              <div className="space-y-2">
                {orderItems?.map((item: any) => (<div key={item.id} className="flex justify-between"><span>{item.product_name} × {item.quantity}</span><span>PKR {(item.price * item.quantity).toLocaleString()}</span></div>))}
                <hr className="border-white/10" />
                <div className="flex justify-between font-black text-lg"><span>Total</span><span className="text-primary">PKR {Number(selected.total).toLocaleString()}</span></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
