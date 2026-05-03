import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Link, Navigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

export default function Wishlist() {
  const { user, loading } = useAuth();
  const qc = useQueryClient();
  const { data: wishlistItems } = useQuery({ queryKey: ['wishlist', user?.id], enabled: !!user, queryFn: async () => { const { data } = await supabase.from('wishlist').select('*, products(*)').eq('user_id', user!.id); return data || []; } });
  const removeFromWishlist = useMutation({
    mutationFn: async (productId: string) => { await supabase.from('wishlist').delete().eq('user_id', user!.id).eq('product_id', productId); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['wishlist'] }); toast.success('Removed from wishlist'); },
  });
  if (loading) return null;
  if (!user) return <Navigate to="/auth" />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-8 flex-1">
        <h1 className="text-3xl font-black tracking-tight mb-8 flex items-center gap-3"><Heart className="h-8 w-8 text-rx" /> My Wishlist</h1>
        {!wishlistItems || wishlistItems.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground space-y-5">
            <Heart className="h-20 w-20 mx-auto opacity-15" />
            <p className="text-xl font-bold">Your wishlist is empty</p>
            <Button asChild className="rounded-full gradient-primary border-0"><Link to="/products">Browse Products</Link></Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {wishlistItems.map((w: any) => (<ProductCard key={w.id} {...w.products} category={w.products.category} isWishlisted={true} onWishlist={() => removeFromWishlist.mutate(w.product_id)} />))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
