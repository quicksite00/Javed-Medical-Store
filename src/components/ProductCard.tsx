import { Heart, ShoppingCart, Pill, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface ProductCardProps {
  id: string;
  name: string;
  brand: string | null;
  price: number;
  image_url: string | null;
  prescription_required: boolean;
  category: string;
  onWishlist?: () => void;
  isWishlisted?: boolean;
}

export function ProductCard({ id, name, brand, price, image_url, prescription_required, category, onWishlist, isWishlisted }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, brand, price, image_url, prescription_required });
    toast.success(`${name} added to cart`);
  };

  return (
    <div className="group relative rounded-2xl border border-border/50 bg-card overflow-hidden hover-lift hover-glow card-3d">
      <Link to={`/products/${id}`}>
        <div className="relative aspect-square bg-secondary/30 overflow-hidden">
          {image_url ? (
            <img src={image_url} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
              <Pill className="h-14 w-14 text-primary/30 group-hover:text-primary/60 transition-all duration-500 medicine-3d" />
            </div>
          )}
          {prescription_required && (
            <Badge className="absolute top-3 left-3 bg-rx text-rx-foreground border-0 text-[10px] font-bold rounded-full px-2.5 animate-pulse-soft">Rx Required</Badge>
          )}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            {onWishlist && (
              <button onClick={(e) => { e.preventDefault(); onWishlist(); }} className="h-9 w-9 rounded-full bg-card/90 backdrop-blur flex items-center justify-center hover:bg-card shadow-sm transition-transform hover:scale-110">
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-rx text-rx' : 'text-muted-foreground'}`} />
              </button>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">{category.replace('_', ' ')}</p>
        <Link to={`/products/${id}`}>
          <h3 className="font-semibold text-sm leading-snug hover:text-primary transition-colors duration-300 line-clamp-2">{name}</h3>
        </Link>
        {brand && <p className="text-xs text-muted-foreground">{brand}</p>}
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-extrabold text-gradient">PKR {price.toLocaleString()}</span>
          <Button size="icon" className="h-9 w-9 rounded-full gradient-primary border-0 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-110 transition-all duration-300" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4 text-primary-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
