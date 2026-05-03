import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Pill, Syringe, FlaskConical, Droplets, Heart, ShieldPlus, Search, Truck, Clock, Award, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/ProductCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CustomerReviews } from '@/components/CustomerReviews';
import { BlogPreview } from '@/components/BlogPreview';
import { FloatingConsultation } from '@/components/FloatingConsultation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ParticleNetwork } from '@/components/ParticleNetwork';
import { localProducts } from '@/data/products';

const categories = [
  { name: 'Tablets', slug: 'tablets', icon: Pill, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  { name: 'Capsules', slug: 'capsules', icon: Pill, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  { name: 'Syrups', slug: 'syrups', icon: FlaskConical, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { name: 'Injections', slug: 'injections', icon: Syringe, color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
  { name: 'Ointments', slug: 'ointments', icon: Droplets, color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
  { name: 'First Aid', slug: 'first_aid', icon: ShieldPlus, color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
];

const features = [
  { icon: Truck, title: 'Same Day Delivery', desc: 'Free in Phool Nagar' },
  { icon: Award, title: '100% Authentic', desc: 'Genuine branded medicines' },
  { icon: Clock, title: 'Open 8AM-10PM', desc: 'Mon-Sat convenience' },
  { icon: Heart, title: 'Expert Pharmacist', desc: 'Licensed & available' },
];

const Index = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  useScrollReveal();

  const { data: products } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      // Use local products for the featured section to ensure images from /assets are used
      return localProducts.slice(0, 8);
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <FloatingConsultation />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center bg-mesh">
        <div className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-[0.25] mix-blend-multiply dark:mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1920&q=80" 
            alt="Pharmacy background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-grid bg-grid-animated opacity-100" />
        <ParticleNetwork />
        
        <div className="container relative py-20 md:py-32 z-10">
          <div className="max-w-2xl space-y-7">
            <h1 className="font-syne font-[800] leading-[1.1] tracking-tight text-[clamp(48px,7vw,80px)] text-foreground">
              <span className="inline-block animate-slide-up opacity-0 [animation-fill-mode:forwards] interactive-hover" style={{ animationDelay: '0.2s' }}>Your</span>{' '}
              <span className="inline-block animate-slide-up opacity-0 [animation-fill-mode:forwards] interactive-hover" style={{ animationDelay: '0.4s' }}>Health,</span><br />
              <span className="text-shimmer inline-block animate-slide-up opacity-0 [animation-fill-mode:forwards] interactive-hover" style={{ animationDelay: '0.6s' }}>Our Priority</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed animate-slide-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.8s' }}>
              Quality medicines delivered to your doorstep in Phool Nagar, Kasur. Order online — same-day delivery.
            </p>
            <form onSubmit={handleSearch} className="flex gap-2 max-w-md animate-slide-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '1s' }}>
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  placeholder="Search medicines..." 
                  className="pl-12 h-13 rounded-full text-base bg-background/60 backdrop-blur-[20px] border border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_rgba(6,182,212,0.3)] transition-all" 
                />
              </div>
              <Button type="submit" size="lg" className="h-13 px-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 border-0 font-bold text-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20 bg-secondary/30 relative z-10">
        <div className="container">
          <div className="flex items-end justify-between mb-10 animate-fade-in">
            <div>
              <p className="text-primary font-bold text-sm md:text-base uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> Popular
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight font-display text-foreground interactive-title">Featured Products</h2>
              <p className="text-muted-foreground mt-3 text-base md:text-lg font-medium">Popular medicines & healthcare essentials</p>
            </div>
            <Button variant="outline" className="rounded-full font-semibold hidden sm:flex hover:bg-primary hover:text-primary-foreground transition-all" asChild>
              <Link to="/products">View All <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {products?.map((p, i) => (
              <div key={p.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <ProductCard {...p} category={p.category} />
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Button variant="outline" className="rounded-full font-semibold" asChild>
              <Link to="/products">View All Products <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ticker Bar */}
      <div className="w-full overflow-hidden bg-secondary/50 border-y border-border/50 py-[18px]">
        <div className="flex whitespace-nowrap animate-scroll hover:[animation-play-state:paused] w-max">
          {[...categories, ...categories].map((c, i) => (
            <div key={`ticker-${c.slug}-${i}`} className="flex items-center pr-[48px]">
              <span className="text-muted-foreground text-[13px] mr-1">✓</span>
              <span className="text-foreground font-bold text-[13px]">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features strip */}
      <section className="py-8 border-y border-border/30 bg-card/40 backdrop-blur-md relative z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div 
                key={f.title} 
                className="flex items-center gap-3 p-5 rounded-2xl bg-card/40 backdrop-blur-md border border-border/50 hover:bg-card/60 transition-all duration-500 group animate-slide-up opacity-0 [animation-fill-mode:forwards]"
                style={{ animationDelay: `${0.1 * (i + 1)}s` }}
              >
                <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl p-3 shrink-0 border border-border/50">
                  <f.icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400 group-hover:animate-spin-slow transition-transform" />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2">Browse</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display interactive-title">Shop by Category</h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm">Browse our wide range of medicines and healthcare products</p>
          </div>
          <div className="relative w-full overflow-hidden py-4 -mx-4 px-4 sm:mx-0 sm:px-0 group">
            <div className="flex whitespace-nowrap animate-scroll-slow hover:[animation-play-state:paused] w-max">
              {[...categories, ...categories, ...categories, ...categories].map((c, i) => (
                <div key={`category-${c.slug}-${i}`} className="pr-4 flex-shrink-0">
                  <Link
                    to={`/products?category=${c.slug}`}
                    className={`w-36 sm:w-48 flex flex-col items-center gap-3 p-6 rounded-2xl border border-border/50 bg-card hover-lift group/card`}
                  >
                    <div className={`rounded-xl p-4 ${c.color} group-hover/card:scale-110 transition-all duration-300`}>
                      <c.icon className="h-7 w-7" />
                    </div>
                    <span className="font-semibold text-sm group-hover/card:text-primary transition-colors">{c.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Customer Reviews */}
      <div className="scroll-reveal">
        <CustomerReviews />
      </div>

      {/* Blog Preview */}
      <div className="scroll-reveal">
        <BlogPreview />
      </div>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden scroll-reveal">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 backdrop-blur-sm border-y border-primary/10" />
        <div className="container relative text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black font-display text-foreground">Need a Prescription Medicine?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">Upload your prescription and we'll prepare your order. Quick approval by our licensed pharmacist.</p>
          <Button size="lg" className="rounded-full font-bold px-8 shadow-xl hover:scale-105 transition-all gradient-primary border-0" asChild>
            <Link to="/products">Order Now <ArrowRight className="h-4 w-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
