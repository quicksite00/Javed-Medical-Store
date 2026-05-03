import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-20 flex-1 text-center space-y-6">
        <h1 className="text-8xl font-black text-gradient">404</h1>
        <p className="text-xl text-muted-foreground font-medium">Page not found</p>
        <Button className="rounded-full gradient-primary border-0 font-bold" asChild>
          <Link to="/"><Home className="h-4 w-4 mr-2" /> Go Home</Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
}
