import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { localProducts } from '@/data/products';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { Minus, Plus, ShoppingCart, ArrowLeft, Pill, CheckCircle2, Truck, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      // Find product in local list
      const localProduct = localProducts.find(p => p.id === id);
      if (localProduct) return { ...localProduct, stock: 10, description: `High quality ${localProduct.name} available at Javed Medical Store. Guaranteed 100% authentic.` };
      
      const { data } = await supabase.from('products').select('*').eq('id', id!).single();
      return data;
    },
  });

  const { data: related } = useQuery({
    queryKey: ['related', product?.category],
    enabled: !!product,
    queryFn: async () => {
      // Get related products from local list
      const filtered = localProducts.filter(p => p.category === product!.category && p.id !== product!.id);
      if (filtered.length > 0) return filtered.slice(0, 4);

      const { data } = await supabase.from('products').select('*').eq('category', product!.category).neq('id', product!.id).eq('active', true).limit(4);
      return data || [];
    },
  });

  const handleAdd = () => {
    if (!product) return;
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, brand: product.brand, price: product.price, image_url: product.image_url, prescription_required: product.prescription_required });
    }
    toast.success(`${product.name} added to cart`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container py-12 flex-1">
          <div className="animate-pulse grid md:grid-cols-2 gap-10">
            <div className="aspect-square bg-muted rounded-3xl" />
            <div className="space-y-4"><div className="h-8 bg-muted rounded-full w-3/4" /><div className="h-4 bg-muted rounded-full w-1/2" /><div className="h-10 bg-muted rounded-full w-1/3" /></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container py-16 flex-1 text-center">
          <p className="text-lg font-bold">Product not found</p>
          <Button asChild className="mt-4 rounded-full"><Link to="/products">Back to Products</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-8 flex-1">
        <Button variant="ghost" size="sm" asChild className="mb-6 rounded-full">
          <Link to="/products"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Products</Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="aspect-square bg-secondary/30 rounded-3xl overflow-hidden flex items-center justify-center border border-border/50">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <Pill className="h-28 w-28 text-primary/15" />
            )}
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{product.category.replace('_', ' ')}</p>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">{product.name}</h1>
              {product.brand && <p className="text-muted-foreground mt-1 font-medium">{product.brand}</p>}
            </div>

            {product.prescription_required && (
              <Badge className="bg-rx text-rx-foreground border-0 rounded-full px-4 py-1">Prescription Required</Badge>
            )}

            <p className="text-4xl font-black text-gradient">PKR {product.price.toLocaleString()}</p>

            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-success' : 'text-destructive'}`}>
                {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✕ Out of Stock'}
              </span>
            </div>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border-2 rounded-full overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-muted transition-colors"><Minus className="h-4 w-4" /></button>
                <span className="w-12 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-muted transition-colors"><Plus className="h-4 w-4" /></button>
              </div>
              <Button size="lg" onClick={handleAdd} disabled={product.stock <= 0} className="flex-1 rounded-full gradient-primary border-0 shadow-lg shadow-primary/25 font-bold h-14 text-base">
                <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { icon: Truck, text: 'Free Delivery' },
                { icon: Shield, text: '100% Genuine' },
                { icon: CheckCircle2, text: 'Quality Assured' },
              ].map(f => (
                <div key={f.text} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-accent/50 text-center">
                  <f.icon className="h-5 w-5 text-accent-foreground" />
                  <span className="text-xs font-semibold text-accent-foreground">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related && related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-black mb-8 tracking-tight">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} {...p} category={p.category} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
