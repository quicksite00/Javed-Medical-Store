import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, Package, ShoppingCart, FileText, Users, LogOut, Sparkles } from 'lucide-react';
import logo from '@/assets/logo.png';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/admin/prescriptions', icon: FileText, label: 'Prescriptions' },
  { to: '/admin/customers', icon: Users, label: 'Customers' },
];

export default function AdminLayout() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen bg-[hsl(250,30%,7%)] flex items-center justify-center text-white"><Sparkles className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" />;

  return (
    <div className="min-h-screen bg-[hsl(250,30%,7%)] text-[hsl(250,20%,95%)] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[hsl(250,25%,12%)] border-r border-white/5 hidden md:flex flex-col">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Admin" className="h-9 w-9 rounded-xl brightness-200" width={36} height={36} />
            <div>
              <span className="font-bold text-sm block">Javed Medical</span>
              <span className="text-[10px] text-white/40 font-medium">Admin Panel</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => {
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active ? 'gradient-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/5">
          <button onClick={() => signOut()} className="flex items-center gap-2 text-sm text-white/40 hover:text-white w-full px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[hsl(250,25%,12%)] border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Admin" className="h-7 w-7 rounded-lg brightness-200" width={28} height={28} />
            <span className="font-bold text-sm">Admin</span>
          </div>
          <div className="flex gap-1">
            {navItems.map(item => {
              const active = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to} className={`p-2.5 rounded-xl transition-all ${active ? 'gradient-primary text-primary-foreground' : 'text-white/40'}`}>
                  <item.icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto md:pt-0 pt-14">
        <div className="p-6"><Outlet /></div>
      </main>
    </div>
  );
}
