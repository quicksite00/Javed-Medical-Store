import { useState, useEffect } from 'react';
import { X, Phone, Calendar, Video, MessageCircle, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ConsultationPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('consultation-popup-dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('consultation-popup-dismissed', 'true');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative bg-card rounded-3xl shadow-2xl max-w-md w-full p-8 border border-border animate-scale-in">
        <button onClick={dismiss} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
            <Stethoscope className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-black font-display tracking-tight">Need Medical Guidance?</h3>
          <p className="text-muted-foreground text-sm mt-2">Get expert consultation from our licensed pharmacist</p>
        </div>

        <div className="space-y-3">
          <a href="tel:03001234567" className="flex items-center gap-3 p-4 rounded-2xl border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 group">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm">Call Us Now</p>
              <p className="text-xs text-muted-foreground">0300-1234567 (8AM–10PM)</p>
            </div>
          </a>

          <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 group">
            <div className="p-2.5 rounded-xl bg-success/10 text-success group-hover:bg-success group-hover:text-success-foreground transition-all duration-300">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm">WhatsApp Consultation</p>
              <p className="text-xs text-muted-foreground">Chat with our pharmacist</p>
            </div>
          </a>

          <div className="flex items-center gap-3 p-4 rounded-2xl border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 group cursor-pointer">
            <div className="p-2.5 rounded-xl bg-warning/10 text-warning group-hover:bg-warning group-hover:text-warning-foreground transition-all duration-300">
              <Video className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm">Online Doctor Checkup</p>
              <p className="text-xs text-muted-foreground">Video call with doctor</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 group cursor-pointer">
            <div className="p-2.5 rounded-xl bg-rx/10 text-rx group-hover:bg-rx group-hover:text-rx-foreground transition-all duration-300">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm">Book Appointment</p>
              <p className="text-xs text-muted-foreground">Schedule a visit to our store</p>
            </div>
          </div>
        </div>

        <Button onClick={dismiss} variant="ghost" className="w-full mt-4 text-muted-foreground text-sm">
          Maybe later
        </Button>
      </div>
    </div>
  );
}
