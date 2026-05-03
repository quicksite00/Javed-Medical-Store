import { Minus, Plus, Trash2, ShoppingBag, Pill } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col rounded-l-3xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-black">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag className="h-20 w-20 opacity-15" />
            <p className="font-bold text-lg">Your cart is empty</p>
            <Button variant="outline" onClick={closeCart} asChild className="rounded-full">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 py-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 p-3.5 rounded-2xl bg-secondary/30 border border-border/30">
                  <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center overflow-hidden shrink-0">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <Pill className="h-6 w-6 text-primary/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold truncate">{item.name}</p>
                        {item.prescription_required && (
                          <Badge className="bg-rx text-rx-foreground text-[10px] mt-0.5 border-0 rounded-full">Rx</Badge>
                        )}
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-7 w-7 rounded-full border-2 flex items-center justify-center hover:bg-muted">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm w-7 text-center font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-7 w-7 rounded-full border-2 flex items-center justify-center hover:bg-muted">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-bold text-sm text-gradient">PKR {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-black">
                <span>Total</span>
                <span className="text-gradient">PKR {totalPrice.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={closeCart} asChild className="rounded-full">
                  <Link to="/cart">View Cart</Link>
                </Button>
                <Button onClick={closeCart} asChild className="rounded-full gradient-primary border-0 font-bold">
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
