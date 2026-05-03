import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, Eye } from 'lucide-react';

const tabs = ['pending', 'approved', 'rejected'] as const;
const statusColor: Record<string, string> = { pending: 'bg-warning/20 text-warning', approved: 'bg-success/20 text-success', rejected: 'bg-destructive/20 text-destructive' };

export default function AdminPrescriptions() {
  const qc = useQueryClient();
  const [tab, setTab] = useState<string>('pending');
  const [selected, setSelected] = useState<any>(null);
  const [notes, setNotes] = useState('');

  const { data: prescriptions } = useQuery({ queryKey: ['admin-prescriptions'], queryFn: async () => { const { data } = await supabase.from('prescriptions').select('*').order('created_at', { ascending: false }); return data || []; } });

  const updatePrescription = useMutation({
    mutationFn: async ({ id, status, admin_notes }: { id: string; status: string; admin_notes?: string }) => { const { error } = await supabase.from('prescriptions').update({ status: status as any, admin_notes }).eq('id', id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-prescriptions'] }); setSelected(null); toast.success('Prescription updated'); },
  });

  const filtered = prescriptions?.filter(p => p.status === tab) || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black tracking-tight">Prescriptions</h1>
      <div className="flex gap-2">
        {tabs.map(t => (
          <Button key={t} variant={tab === t ? 'default' : 'outline'} size="sm" onClick={() => setTab(t)}
            className={`capitalize rounded-full font-semibold ${tab === t ? 'gradient-primary border-0' : 'border-white/10 text-white/60'}`}>{t}</Button>
        ))}
      </div>

      <div className="glass-dark rounded-2xl overflow-hidden">
        <Table>
          <TableHeader><TableRow className="border-white/5 hover:bg-transparent"><TableHead className="text-white/40 font-bold">ID</TableHead><TableHead className="text-white/40 font-bold">Status</TableHead><TableHead className="text-white/40 font-bold">Date</TableHead><TableHead className="text-white/40 font-bold">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center text-white/30 py-10">No prescriptions</TableCell></TableRow>
            ) : filtered.map(p => (
              <TableRow key={p.id} className="border-white/5 hover:bg-white/5">
                <TableCell className="font-mono text-xs">{p.id.slice(0, 8)}</TableCell>
                <TableCell><Badge className={`${statusColor[p.status]} border-0 capitalize rounded-full`}>{p.status}</Badge></TableCell>
                <TableCell className="text-white/40 text-xs">{new Date(p.created_at).toLocaleDateString()}</TableCell>
                <TableCell><Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 rounded-full" onClick={() => { setSelected(p); setNotes(p.admin_notes || ''); }}><Eye className="h-4 w-4" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-[hsl(250,25%,12%)] border-white/10 text-white rounded-2xl">
          <DialogHeader><DialogTitle className="font-black">Review Prescription</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              {selected.image_url && <img src={selected.image_url} alt="Prescription" className="w-full rounded-xl border border-white/10" />}
              <div><Label className="text-white/60 font-semibold">Admin Notes</Label><Input value={notes} onChange={e => setNotes(e.target.value)} className="bg-white/5 border-white/10 text-white rounded-xl mt-1" placeholder="Add notes..." /></div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-success hover:bg-success/80 rounded-full font-bold" onClick={() => updatePrescription.mutate({ id: selected.id, status: 'approved', admin_notes: notes })}><CheckCircle2 className="h-4 w-4 mr-1" /> Approve</Button>
                <Button variant="destructive" className="flex-1 rounded-full font-bold" onClick={() => updatePrescription.mutate({ id: selected.id, status: 'rejected', admin_notes: notes })}><XCircle className="h-4 w-4 mr-1" /> Reject</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
