import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, Heart, User, Search, Menu, X, Phone, MapPin, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { CartDrawer } from './CartDrawer';
import logo from '@/assets/logo.png';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { totalItems, toggleCart } = useCart();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/blog', label: 'Health Blog' },
    { to: '/track-order', label: 'Track Order' },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="gradient-primary text-primary-foreground text-xs py-2">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> 0300-1234567</span>
            <span className="hidden sm:flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Phool Nagar, Kasur</span>
          </div>
          <span className="hidden sm:block font-medium tracking-wide animate-marquee">✨ Free Delivery on Orders Above PKR 2,000</span>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 glass">
        <div className="container flex items-center justify-between py-3 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img src={logo} alt="Javed Medical Store" className="h-11 w-11 rounded-xl group-hover:scale-105 transition-all duration-300" width={44} height={44} />
            <div className="leading-tight">
              <span className="font-display font-bold text-2xl md:text-3xl text-foreground block tracking-tight brand-text-hover cursor-pointer">
                Javed Medical
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Phool Nagar, Kasur</span>
            </div>
          </Link>

          {/* Search - desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search medicines, brands..."
                className="pl-10 pr-4 h-10 rounded-full bg-secondary/50 border-0 focus-visible:ring-primary/30"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-full nav-icon-hover" onClick={toggleTheme} title={theme === 'light' ? 'Dark mode' : 'Light mode'}>
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {user ? (
              <>
                <Button variant="ghost" size="icon" className="rounded-full nav-icon-hover" asChild>
                  <Link to="/wishlist"><Heart className="h-5 w-5" /></Link>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full nav-icon-hover" asChild>
                  <Link to="/account"><User className="h-5 w-5" /></Link>
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" className="rounded-full font-semibold nav-icon-hover" asChild>
                <Link to="/auth">Login</Link>
              </Button>
            )}

            <Button variant="ghost" size="icon" className="relative rounded-full nav-icon-hover" onClick={toggleCart}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-rx text-rx-foreground border-0 rounded-full">
                  {totalItems}
                </Badge>
              )}
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden rounded-full" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Nav - desktop */}
        <nav className="hidden md:block border-t border-border/50">
          <div className="container flex items-center gap-8 py-2.5">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} className="text-sm font-medium text-muted-foreground nav-link-animated relative group">
                {l.label}
                <span className="absolute -bottom-2.5 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
            {user && (
              <button onClick={() => signOut()} className="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors ml-auto">
                Sign Out
              </button>
            )}
          </div>
        </nav>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/50 bg-card animate-fade-in">
            <div className="container py-4 space-y-3">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search medicines..." className="pl-10 rounded-full" />
                </div>
              </form>
              {navLinks.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
              {user && (
                <>
                  <Link to="/account" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-medium text-foreground hover:text-primary">My Account</Link>
                  <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-medium text-foreground hover:text-primary">Wishlist</Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="block py-2.5 text-sm font-medium text-destructive">Sign Out</button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
      <CartDrawer />
    </>
  );
}
