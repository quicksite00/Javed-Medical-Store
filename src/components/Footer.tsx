import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Clock, ArrowRight, Globe, Github, Linkedin, Instagram } from 'lucide-react';
import logo from '@/assets/logo.png';

export function Footer() {
  return (
    <footer className="bg-background text-foreground mt-auto relative overflow-hidden border-t border-border">
      <div className="container py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Javed Medical Info - Left Side (2/3 part) */}
          <div className="md:col-span-8 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4 lg:col-span-1">
              <div className="flex items-center gap-2.5 group cursor-default">
                <img src={logo} alt="Javed Medical" className="h-10 w-10 rounded-xl brightness-200 group-hover:scale-110 transition-transform duration-300" width={40} height={40} />
                <span className="font-display font-black text-xl tracking-tight">Javed Medical</span>
              </div>
              <p className="text-xs opacity-60 leading-relaxed">Your trusted pharmacy in Phool Nagar, providing quality medicines and healthcare products.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider opacity-80">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                {[{ to: '/', label: 'Home' }, { to: '/products', label: 'Products' }, { to: '/blog', label: 'Health Blog' }, { to: '/track-order', label: 'Track Order' }, { to: '/auth', label: 'Login / Register' }].map(l => (
                  <li key={l.to}>
                    <Link to={l.to} className="opacity-60 hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 group hover:translate-x-1">
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider opacity-80">Categories</h4>
              <ul className="space-y-3 text-sm">
                {['Tablets', 'Capsules', 'Syrups', 'Injections', 'Ointments', 'First Aid'].map(c => (
                  <li key={c}>
                    <Link to={`/products?category=${c.toLowerCase().replace(' ', '_')}`} className="opacity-60 hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 group hover:translate-x-1">
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider opacity-80">Contact Us</h4>
              <ul className="space-y-3 text-xs sm:text-sm">
                <li className="flex items-start gap-2.5 opacity-60 hover:opacity-100 transition-all duration-300"><MapPin className="h-4 w-4 shrink-0 mt-0.5" /> Main Bazaar, Phool Nagar, Kasur, Pakistan</li>
                <li className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-all duration-300"><Phone className="h-4 w-4 shrink-0" /> 0300-1234567</li>
                <li className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-all duration-300"><Mail className="h-4 w-4 shrink-0" /> info@javedmedical.com</li>
                <li className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-all duration-300"><Clock className="h-4 w-4 shrink-0" /> Mon-Sat: 8AM - 10PM</li>
              </ul>
            </div>
          </div>

          {/* QuickSite Block - Right Side (1/3rd part) */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-start md:items-end text-left md:text-right border-t md:border-t-0 md:border-l border-border pt-8 md:pt-0 md:pl-8">
            <div className="flex flex-col items-start md:items-end bg-foreground/5 p-6 rounded-2xl w-full max-w-sm ml-auto border border-border hover:border-[#E58A37]/30 transition-colors">
                <a href="https://quick-site-00.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-4 group/qs">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#E58A37] flex items-center justify-center bg-[#0d0d1a] shadow-lg shadow-[#E58A37]/10 p-1 group-hover/qs:scale-110 transition-transform duration-300">
                    <img src="/assets/quicksite-icon.png" alt="Quick Site" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-bold text-[#E58A37] text-xl tracking-wide group-hover/qs:translate-x-1 transition-transform duration-300">QuickSite</span>
                </a>
              </div>
              
              <p className="text-sm opacity-70 mb-6 leading-relaxed">
                This medical store website was crafted with expertise by <a href="https://quick-site-00.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#E58A37] hover:underline">QuickSite</a>
              </p>

              {/* Social Links Row */}
              <div className="flex flex-wrap items-center justify-start md:justify-end gap-3 w-full">
                <a href="https://github.com/quicksite00" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#E58A37]/10 flex items-center justify-center text-[#E58A37] hover:bg-[#E58A37] hover:text-white transition-all duration-300 hover:scale-110" title="GitHub">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/company/quick-site-r/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#E58A37]/10 flex items-center justify-center text-[#E58A37] hover:bg-[#E58A37] hover:text-white transition-all duration-300 hover:scale-110" title="LinkedIn">
                  <Linkedin className="w-4 h-4 fill-current" />
                </a>
                <a href="https://quick-site-00.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#E58A37]/10 flex items-center justify-center text-[#E58A37] hover:bg-[#E58A37] hover:text-white transition-all duration-300 hover:scale-110" title="Portfolio">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/quick.site00/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#E58A37]/10 flex items-center justify-center text-[#E58A37] hover:bg-[#E58A37] hover:text-white transition-all duration-300 hover:scale-110" title="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="mailto:quicksite00@gmail.com" className="w-9 h-9 rounded-full bg-[#E58A37]/10 flex items-center justify-center text-[#E58A37] hover:bg-[#E58A37] hover:text-white transition-all duration-300 hover:scale-110" title="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-14 pt-6">
          <div className="flex items-center justify-center md:justify-start">
            <p className="text-sm opacity-40 text-center">&copy; {new Date().getFullYear()} Javed Medical Store. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
