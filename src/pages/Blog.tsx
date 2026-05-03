import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, ArrowRight, Pill, Syringe, Heart, Shield, Droplets, Activity, Baby, Thermometer, Globe, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts';

const iconMap: Record<string, any> = {
  pill: Pill, syringe: Syringe, heart: Heart, shield: Shield,
  droplets: Droplets, activity: Activity, baby: Baby, thermometer: Thermometer,
};

const Blog = () => {
  const [search, setSearch] = useState('');
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(blogPosts.map(p => p.category))];

  const filtered = blogPosts.filter(post => {
    const title = lang === 'en' ? post.title : post.titleUrdu;
    const matchesSearch = title.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary-foreground/10 animate-float"
              style={{
                width: `${30 + i * 15}px`,
                height: `${30 + i * 15}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i}s`,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
            <BookOpen className="h-4 w-4 text-primary-foreground" />
            <span className="text-primary-foreground text-sm font-medium">
              {lang === 'en' ? 'Health & Medicine Blog' : 'صحت اور دوائیوں کا بلاگ'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 font-display">
            {lang === 'en' ? 'Medicine Usage Guides' : 'دوائیوں کے استعمال کی رہنمائی'}
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            {lang === 'en'
              ? 'Expert guides on proper medicine usage, dosage, storage, and health tips for Pakistani families.'
              : 'پاکستانی خاندانوں کے لیے دوائیوں کے صحیح استعمال، خوراک، ذخیرہ، اور صحت کی تجاویز پر ماہرانہ رہنمائی۔'}
          </p>

          {/* Language Toggle */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Button
              variant={lang === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLang('en')}
              className={lang === 'en' ? 'bg-primary-foreground text-primary' : 'border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/20'}
            >
              <Globe className="h-4 w-4 mr-1" /> English
            </Button>
            <Button
              variant={lang === 'ur' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLang('ur')}
              className={lang === 'ur' ? 'bg-primary-foreground text-primary' : 'border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/20'}
            >
              <Globe className="h-4 w-4 mr-1" /> اردو
            </Button>
          </div>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={lang === 'en' ? 'Search articles...' : 'مضامین تلاش کریں...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-12 h-12 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
              dir={lang === 'ur' ? 'rtl' : 'ltr'}
            />
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="container py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant={!selectedCategory ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
          >
            {lang === 'en' ? 'All' : 'سب'}
          </Button>
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container pb-20 flex-1">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, index) => {
            const Icon = iconMap[post.icon] || BookOpen;
            return (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group animate-slide-up opacity-0 [animation-fill-mode:forwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <article className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover-lift card-3d transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                        <Icon className="h-3 w-3 mr-1" />
                        {post.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 text-primary-foreground/80 text-xs">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
                    <time className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString(lang === 'ur' ? 'ur-PK' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    <h2 className="text-lg font-bold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {lang === 'en' ? post.title : post.titleUrdu}
                    </h2>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {lang === 'en' ? post.excerpt : post.excerptUrdu}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-accent text-accent-foreground rounded-full px-2.5 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                      {lang === 'en' ? 'Read More' : 'مزید پڑھیں'}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              {lang === 'en' ? 'No articles found' : 'کوئی مضمون نہیں ملا'}
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
