import { useState } from 'react';
import { Star, Send, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const defaultReviews = [
  { id: '1', name: 'Ahmed Khan', city: 'Phool Nagar', rating: 5, text: 'Excellent service! Medicines delivered within 2 hours. Very reliable pharmacy.', date: '2026-03-20' },
  { id: '2', name: 'Fatima Bibi', city: 'Kasur', rating: 5, text: 'Best pharmacy in the area. Staff is very helpful and medicines are genuine.', date: '2026-03-18' },
  { id: '3', name: 'Muhammad Ali', city: 'Phool Nagar', rating: 4, text: 'Good prices and authentic medicines. Home delivery is very convenient.', date: '2026-03-15' },
  { id: '4', name: 'Ayesha Siddiqui', city: 'Pattoki', rating: 5, text: 'I always order from Javed Medical. Their online service is amazing!', date: '2026-03-10' },
];

export function CustomerReviews() {
  const [reviews, setReviews] = useState(defaultReviews);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const submitReview = () => {
    if (!name.trim() || !text.trim()) {
      toast.error('Please enter your name and review');
      return;
    }
    const newReview = {
      id: Date.now().toString(),
      name: name.trim(),
      city: 'Customer',
      rating,
      text: text.trim(),
      date: new Date().toISOString().split('T')[0],
    };
    setReviews(prev => [newReview, ...prev]);
    setName('');
    setText('');
    setRating(5);
    toast.success('Thank you for your review!');
  };

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <Star className="h-4 w-4 fill-primary" /> Reviews
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display">What Our Customers Say</h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Real reviews from our valued customers</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {reviews.slice(0, 4).map((r, i) => (
            <div key={r.id} className="p-6 rounded-2xl border border-border/50 bg-card hover-lift group" style={{ animationDelay: `${i * 100}ms` }}>
              <Quote className="h-6 w-6 text-primary/30 mb-3" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{r.text}"</p>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? 'fill-warning text-warning' : 'text-muted'}`} />
                ))}
              </div>
              <p className="font-bold text-sm">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.city}</p>
            </div>
          ))}
        </div>

        {/* Submit Review */}
        <div className="max-w-lg mx-auto p-6 rounded-2xl border border-border/50 bg-card">
          <h3 className="font-bold text-lg mb-4 text-center">Leave Your Review</h3>
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(s => (
              <button
                key={s}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(s)}
                className="p-1 transition-transform duration-200 hover:scale-125"
              >
                <Star className={`h-6 w-6 ${s <= (hoverRating || rating) ? 'fill-warning text-warning' : 'text-muted'}`} />
              </button>
            ))}
          </div>
          <div className="space-y-3">
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="rounded-xl" />
            <Input value={text} onChange={e => setText(e.target.value)} placeholder="Write your review..." className="rounded-xl" />
            <Button onClick={submitReview} className="w-full rounded-full gradient-primary border-0 font-bold">
              <Send className="h-4 w-4 mr-2" /> Submit Review
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
