import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, Pill, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-8 flex-1">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 space-y-5">
            <ShoppingBag className="h-24 w-24 text-muted-foreground/15 mx-auto" />
            <p className="text-xl font-bold text-muted-foreground">Your cart is empty</p>
            <Button asChild className="rounded-full gradient-primary border-0 font-bold"><Link to="/products">Browse Products</Link></Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-5 rounded-2xl border border-border/50 bg-card hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 rounded-2xl bg-secondary/30 flex items-center justify-center overflow-hidden shrink-0">
                    {item.image_url ? <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" /> : <Pill className="h-10 w-10 text-primary/20" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        {item.brand && <p className="text-sm text-muted-foreground">{item.brand}</p>}
                        {item.prescription_required && <Badge className="bg-rx text-rx-foreground text-[10px] mt-1 border-0 rounded-full">Rx</Badge>}
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive h-fit"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-9 w-9 rounded-full border-2 flex items-center justify-center hover:bg-muted"><Minus className="h-3 w-3" /></button>
                        <span className="w-9 text-center font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-9 w-9 rounded-full border-2 flex items-center justify-center hover:bg-muted"><Plus className="h-3 w-3" /></button>
                      </div>
                      <span className="font-black text-lg text-gradient">PKR {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive rounded-full">Clear Cart</Button>
            </div>

            <div>
              <div className="rounded-2xl border border-border/50 bg-card p-6 space-y-5 sticky top-24">
                <h3 className="font-black text-lg">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">PKR {totalPrice.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="font-semibold text-success">{totalPrice >= 2000 ? 'Free' : 'PKR 150'}</span></div>
                  <hr />
                  <div className="flex justify-between text-xl font-black">
                    <span>Total</span>
                    <span className="text-gradient">PKR {(totalPrice + (totalPrice >= 2000 ? 0 : 150)).toLocaleString()}</span>
                  </div>
                </div>
                <Button className="w-full rounded-full gradient-primary border-0 font-bold h-12 text-base shadow-lg shadow-primary/25" asChild>
                  <Link to="/checkout">Proceed to Checkout <ArrowRight className="h-4 w-4 ml-2" /></Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
