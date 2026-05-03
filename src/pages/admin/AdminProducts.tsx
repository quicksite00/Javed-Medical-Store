import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type Category = Database['public']['Enums']['product_category'];
const categories: Category[] = ['tablets', 'capsules', 'syrups', 'injections', 'ointments', 'first_aid'];
const emptyProduct: Partial<ProductInsert> = { name: '', brand: '', price: 0, category: 'tablets', stock: 100, prescription_required: false, description: '', active: true };

export default function AdminProducts() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Partial<ProductInsert> & { id?: string }>(emptyProduct);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: products } = useQuery({ queryKey: ['admin-products'], queryFn: async () => { const { data } = await supabase.from('products').select('*').order('name'); return data || []; } });

  const saveMutation = useMutation({
    mutationFn: async (product: Partial<ProductInsert> & { id?: string }) => {
      if (product.id) { const { id, ...rest } = product; const { error } = await supabase.from('products').update(rest).eq('id', id); if (error) throw error; }
      else { const { error } = await supabase.from('products').insert(product as ProductInsert); if (error) throw error; }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-products'] }); setDialogOpen(false); toast.success('Product saved'); },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from('products').delete().eq('id', id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-products'] }); toast.success('Product deleted'); },
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => { await supabase.from('products').update({ active }).eq('id', id); },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  const filtered = products?.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand?.toLowerCase().includes(search.toLowerCase())) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tight">Products</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing(emptyProduct)} className="rounded-full gradient-primary border-0 font-bold"><Plus className="h-4 w-4 mr-1" /> Add Product</Button>
          </DialogTrigger>
          <DialogContent className="bg-[hsl(250,25%,12%)] border-white/10 text-white max-h-[80vh] overflow-y-auto rounded-2xl">
            <DialogHeader><DialogTitle className="font-black">{editing.id ? 'Edit Product' : 'Add Product'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label className="text-white/60 font-semibold">Name *</Label><Input value={editing.name || ''} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} className="bg-white/5 border-white/10 text-white rounded-xl mt-1" /></div>
              <div><Label className="text-white/60 font-semibold">Brand</Label><Input value={editing.brand || ''} onChange={e => setEditing(p => ({ ...p, brand: e.target.value }))} className="bg-white/5 border-white/10 text-white rounded-xl mt-1" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-white/60 font-semibold">Price (PKR) *</Label><Input type="number" value={editing.price || ''} onChange={e => setEditing(p => ({ ...p, price: Number(e.target.value) }))} className="bg-white/5 border-white/10 text-white rounded-xl mt-1" /></div>
                <div><Label className="text-white/60 font-semibold">Stock</Label><Input type="number" value={editing.stock || ''} onChange={e => setEditing(p => ({ ...p, stock: Number(e.target.value) }))} className="bg-white/5 border-white/10 text-white rounded-xl mt-1" /></div>
              </div>
              <div><Label className="text-white/60 font-semibold">Category</Label>
                <Select value={editing.category} onValueChange={(v: Category) => setEditing(p => ({ ...p, category: v }))}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>{categories.map(c => <SelectItem key={c} value={c} className="capitalize">{c.replace('_', ' ')}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label className="text-white/60 font-semibold">Image URL</Label><Input value={editing.image_url || ''} onChange={e => setEditing(p => ({ ...p, image_url: e.target.value }))} className="bg-white/5 border-white/10 text-white rounded-xl mt-1" /></div>
              <div><Label className="text-white/60 font-semibold">Description</Label><Input value={editing.description || ''} onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} className="bg-white/5 border-white/10 text-white rounded-xl mt-1" /></div>
              <div className="flex items-center gap-2.5"><Switch checked={!!editing.prescription_required} onCheckedChange={v => setEditing(p => ({ ...p, prescription_required: v }))} /><Label className="text-white/60 font-semibold">Prescription Required</Label></div>
              <Button className="w-full rounded-full gradient-primary border-0 font-bold" onClick={() => saveMutation.mutate(editing)} disabled={saveMutation.isPending}>
                {saveMutation.isPending ? 'Saving...' : 'Save Product'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="pl-10 bg-white/5 border-white/10 text-white rounded-full" />
      </div>

      <div className="glass-dark rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-white/40 font-bold">Name</TableHead>
              <TableHead className="text-white/40 font-bold">Category</TableHead>
              <TableHead className="text-white/40 font-bold">Price</TableHead>
              <TableHead className="text-white/40 font-bold">Stock</TableHead>
              <TableHead className="text-white/40 font-bold">Rx</TableHead>
              <TableHead className="text-white/40 font-bold">Active</TableHead>
              <TableHead className="text-white/40 font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(p => (
              <TableRow key={p.id} className="border-white/5 hover:bg-white/5">
                <TableCell className="font-semibold">{p.name}<br /><span className="text-xs text-white/30">{p.brand}</span></TableCell>
                <TableCell className="capitalize text-white/60">{p.category.replace('_', ' ')}</TableCell>
                <TableCell className="font-semibold">PKR {p.price.toLocaleString()}</TableCell>
                <TableCell><Badge className={`${p.stock < 10 ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'} border-0 rounded-full`}>{p.stock}</Badge></TableCell>
                <TableCell>{p.prescription_required && <Badge className="bg-rx/20 text-rx border-0 rounded-full">Rx</Badge>}</TableCell>
                <TableCell><Switch checked={p.active} onCheckedChange={v => toggleActive.mutate({ id: p.id, active: v })} /></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white rounded-full" onClick={() => { setEditing(p); setDialogOpen(true); }}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-destructive rounded-full" onClick={() => deleteMutation.mutate(p.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
