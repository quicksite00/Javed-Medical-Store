import { useState } from 'react';
import { X, Phone, Video, MessageCircle, Calendar, Stethoscope } from 'lucide-react';

export function FloatingConsultation() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {open && (
        <div className="mb-3 bg-card border border-border rounded-2xl shadow-2xl p-5 w-72 animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-sm font-display">Get Medical Help</h4>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            <a href="tel:03001234567" className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors">
              <Phone className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-semibold">Call Now</p>
                <p className="text-[10px] text-muted-foreground">0300-1234567</p>
              </div>
            </a>
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors">
              <MessageCircle className="h-4 w-4 text-success" />
              <div>
                <p className="text-xs font-semibold">WhatsApp Chat</p>
                <p className="text-[10px] text-muted-foreground">Quick consultation</p>
              </div>
            </a>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors cursor-pointer">
              <Video className="h-4 w-4 text-warning" />
              <div>
                <p className="text-xs font-semibold">Video Checkup</p>
                <p className="text-[10px] text-muted-foreground">Online doctor</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors cursor-pointer">
              <Calendar className="h-4 w-4 text-rx" />
              <div>
                <p className="text-xs font-semibold">Book Appointment</p>
                <p className="text-[10px] text-muted-foreground">Visit our store</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="gradient-primary text-primary-foreground h-14 w-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300"
      >
        {open ? <X className="h-5 w-5" /> : <Stethoscope className="h-6 w-6" />}
      </button>
    </div>
  );
}
