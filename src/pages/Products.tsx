import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, SlidersHorizontal, X, Pill } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  tablets: 'Tablets', capsules: 'Capsules', syrups: 'Syrups',
  injections: 'Injections', ointments: 'Ointments', first_aid: 'First Aid',
};

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('name');
  const [rxOnly, setRxOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await supabase.from('products').select('*').eq('active', true);
      return data || [];
    },
  });

  const filtered = useMemo(() => {
    if (!products) return [];
    let result = [...products];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q));
    }
    if (category && category !== 'all') result = result.filter(p => p.category === category);
    if (rxOnly) result = result.filter(p => p.prescription_required);
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      default: result.sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [products, search, category, sortBy, rxOnly]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-8 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div className="animate-slide-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight font-display">All Products</h1>
            <p className="text-muted-foreground text-sm mt-1 font-medium">{filtered.length} products found</p>
          </div>
          <Button variant="outline" size="sm" className="md:hidden rounded-full" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4 mr-1" /> Filters
          </Button>
        </div>

        <div className="flex gap-8">
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0 space-y-5`}>
            <div className="rounded-2xl border border-border/50 bg-card p-5 space-y-5">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-10 rounded-full" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="rounded-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {Object.entries(categoryLabels).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="rounded-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2.5">
                <Checkbox id="rx" checked={rxOnly} onCheckedChange={(c) => setRxOnly(!!c)} />
                <label htmlFor="rx" className="text-sm font-medium">Prescription Only</label>
              </div>
              {(search || category !== 'all' || rxOnly) && (
                <Button variant="ghost" size="sm" className="w-full rounded-full" onClick={() => { setSearch(''); setCategory('all'); setRxOnly(false); }}>
                  <X className="h-4 w-4 mr-1" /> Clear Filters
                </Button>
              )}
            </div>
          </aside>

          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse rounded-2xl border bg-card">
                    <div className="aspect-square bg-muted rounded-t-2xl" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-muted rounded-full w-3/4" />
                      <div className="h-3 bg-muted rounded-full w-1/2" />
                      <div className="h-5 bg-muted rounded-full w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Pill className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-bold">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {filtered.map(p => (
                  <ProductCard key={p.id} {...p} category={p.category} />
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
