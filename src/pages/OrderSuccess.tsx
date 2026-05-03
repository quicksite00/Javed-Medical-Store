import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Package, Home, Sparkles } from 'lucide-react';

export default function OrderSuccess() {
  const { orderNumber } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-16 flex-1 max-w-lg text-center space-y-6">
        <div className="mx-auto w-24 h-24 rounded-3xl bg-success/10 flex items-center justify-center animate-scale-in">
          <CheckCircle2 className="h-14 w-14 text-success" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Order Placed! 🎉</h1>
          <p className="text-muted-foreground mt-2">Thank you for your order. We'll prepare it right away.</p>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-6 space-y-4 text-left">
          <div className="flex justify-between"><span className="text-muted-foreground">Order Number</span><span className="font-black text-primary">{orderNumber}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Estimated Delivery</span><span className="font-bold">1-2 Business Days</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="text-warning font-bold">Pending</span></div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button variant="outline" className="rounded-full" asChild><Link to={`/track-order?order=${orderNumber}`}><Package className="h-4 w-4 mr-1" /> Track</Link></Button>
          <Button className="rounded-full gradient-primary border-0 font-bold" asChild><Link to="/"><Home className="h-4 w-4 mr-1" /> Continue Shopping</Link></Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
