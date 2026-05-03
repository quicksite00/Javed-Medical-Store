import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Check, CreditCard, Banknote, Smartphone, ArrowRight } from 'lucide-react';

const steps = ['Shipping', 'Payment', 'Review'];

const paymentMethods = [
  { id: 'cod' as const, label: 'Cash on Delivery', icon: Banknote, available: true },
  { id: 'jazzcash' as const, label: 'JazzCash', icon: Smartphone, available: false },
  { id: 'easypaisa' as const, label: 'EasyPaisa', icon: Smartphone, available: false },
  { id: 'card' as const, label: 'Credit/Debit Card', icon: CreditCard, available: false },
];

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '', phone: '', address: '', city: 'Phool Nagar',
    payment: 'cod' as 'cod' | 'jazzcash' | 'easypaisa' | 'card',
  });

  const delivery = totalPrice >= 2000 ? 0 : 150;
  const grandTotal = totalPrice + delivery;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: order, error } = await supabase.from('orders').insert({
        user_id: user?.id || null, total: grandTotal, shipping_name: form.name,
        shipping_phone: form.phone, shipping_address: form.address, shipping_city: form.city,
        payment_method: form.payment, order_number: 'temp',
      }).select().single();
      if (error) throw error;
      const orderItems = items.map(item => ({ order_id: order.id, product_id: item.id, product_name: item.name, quantity: item.quantity, price: item.price }));
      await supabase.from('order_items').insert(orderItems);
      clearCart();
      navigate(`/order-success/${order.order_number}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to place order');
    } finally { setLoading(false); }
  };

  if (items.length === 0) { navigate('/cart'); return null; }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-8 flex-1 max-w-3xl">
        {/* Steps */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i <= step ? 'gradient-primary text-primary-foreground shadow-lg shadow-primary/25' : 'bg-muted text-muted-foreground'
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-sm hidden sm:block font-semibold ${i <= step ? '' : 'text-muted-foreground'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-10 sm:w-20 h-0.5 rounded-full ${i < step ? 'bg-primary' : 'bg-muted'}`} />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-5 rounded-2xl border border-border/50 bg-card p-7">
            <h2 className="text-xl font-black">Shipping Information</h2>
            <div className="grid gap-4">
              <div><Label className="font-semibold">Full Name *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter your full name" className="rounded-xl mt-1.5" /></div>
              <div><Label className="font-semibold">Phone Number *</Label><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="03XX-XXXXXXX" className="rounded-xl mt-1.5" /></div>
              <div><Label className="font-semibold">Delivery Address *</Label><Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="House/Street/Area" className="rounded-xl mt-1.5" /></div>
              <div><Label className="font-semibold">City</Label><Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="rounded-xl mt-1.5" /></div>
            </div>
            <Button className="w-full rounded-full gradient-primary border-0 font-bold h-12" onClick={() => {
              if (!form.name || !form.phone || !form.address) { toast.error('Please fill all required fields'); return; }
              setStep(1);
            }}>Continue to Payment <ArrowRight className="h-4 w-4 ml-2" /></Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5 rounded-2xl border border-border/50 bg-card p-7">
            <h2 className="text-xl font-black">Payment Method</h2>
            <div className="grid gap-3">
              {paymentMethods.map(pm => (
                <button key={pm.id} onClick={() => pm.available && setForm(f => ({ ...f, payment: pm.id }))}
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                    form.payment === pm.id ? 'border-primary bg-accent/50' : 'border-border/50 hover:border-primary/30'
                  } ${!pm.available ? 'opacity-40 cursor-not-allowed' : ''}`}>
                  <div className={`rounded-xl p-2.5 ${form.payment === pm.id ? 'gradient-primary' : 'bg-muted'}`}>
                    <pm.icon className={`h-5 w-5 ${form.payment === pm.id ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  </div>
                  <span className="font-bold">{pm.label}</span>
                  {!pm.available && <span className="text-xs text-muted-foreground ml-auto">Coming Soon</span>}
                  {form.payment === pm.id && <Check className="h-5 w-5 text-primary ml-auto" />}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full" onClick={() => setStep(0)}>Back</Button>
              <Button className="flex-1 rounded-full gradient-primary border-0 font-bold" onClick={() => setStep(2)}>Review Order <ArrowRight className="h-4 w-4 ml-2" /></Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-border/50 bg-card p-7 space-y-5">
              <h2 className="text-xl font-black">Order Review</h2>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <p><strong>Ship to:</strong> {form.name}</p>
                <p><strong>Phone:</strong> {form.phone}</p>
                <p><strong>Address:</strong> {form.address}, {form.city}</p>
                <p><strong>Payment:</strong> {paymentMethods.find(p => p.id === form.payment)?.label}</p>
              </div>
              <hr />
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm"><span>{item.name} × {item.quantity}</span><span className="font-semibold">PKR {(item.price * item.quantity).toLocaleString()}</span></div>
                ))}
                <hr />
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>PKR {totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span>Delivery</span><span>{delivery === 0 ? 'Free' : `PKR ${delivery}`}</span></div>
                <div className="flex justify-between font-black text-xl"><span>Total</span><span className="text-gradient">PKR {grandTotal.toLocaleString()}</span></div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1 rounded-full gradient-primary border-0 font-bold h-12 text-base shadow-lg shadow-primary/25" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
