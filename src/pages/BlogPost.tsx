import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Clock, BookOpen, Globe, Pill, Syringe, Heart, Shield, Droplets, Activity, Baby, Thermometer, Share2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts';

const iconMap: Record<string, any> = {
  pill: Pill, syringe: Syringe, heart: Heart, shield: Shield,
  droplets: Droplets, activity: Activity, baby: Baby, thermometer: Thermometer,
};

const BlogPost = () => {
  const { slug } = useParams();
  const [lang, setLang] = useState<'en' | 'ur'>('en');

  const post = blogPosts.find(p => p.slug === slug);
  const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Article not found</h1>
            <Link to="/blog">
              <Button variant="outline"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = iconMap[post.icon] || BookOpen;
  const content = lang === 'en' ? post.content : post.contentUrdu;
  const title = lang === 'en' ? post.title : post.titleUrdu;

  // Simple markdown renderer
  const renderContent = (md: string) => {
    const lines = md.split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-foreground mt-8 mb-4 font-display">{trimmed.slice(3)}</h2>;
      if (trimmed.startsWith('### ')) return <h3 key={i} className="text-xl font-semibold text-foreground mt-6 mb-3">{trimmed.slice(4)}</h3>;
      if (trimmed.startsWith('#### ')) return <h4 key={i} className="text-lg font-semibold text-foreground mt-4 mb-2">{trimmed.slice(5)}</h4>;
      if (trimmed.startsWith('- ')) {
        const text = trimmed.slice(2);
        const boldMatch = text.match(/^\*\*(.+?)\*\*(.*)$/);
        return (
          <li key={i} className="text-muted-foreground ml-4 mb-1.5 list-disc">
            {boldMatch ? <><strong className="text-foreground">{boldMatch[1]}</strong>{boldMatch[2]}</> : renderInline(text)}
          </li>
        );
      }
      if (trimmed.startsWith('|')) return null; // skip table markup
      if (trimmed.startsWith('---')) return null;
      if (trimmed.startsWith('❌') || trimmed.startsWith('✅')) {
        return <p key={i} className="text-muted-foreground mb-2 pl-2">{trimmed}</p>;
      }
      // Bold inline
      return <p key={i} className="text-muted-foreground mb-3 leading-relaxed">{renderInline(trimmed)}</p>;
    });
  };

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src={post.image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container pb-8">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/80 mb-3">
            <Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="truncate">{post.category}</span>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="container max-w-3xl -mt-8 relative z-10 pb-20">
        <div className="bg-card rounded-2xl border border-border shadow-lg p-6 md:p-10">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Icon className="h-3 w-3 mr-1" />
              {post.category}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" /> {post.readTime}
            </span>
            <time className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>

          {/* Language toggle */}
          <div className="flex items-center gap-2 mb-6">
            <Button
              variant={lang === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLang('en')}
              className="rounded-full"
            >
              <Globe className="h-3 w-3 mr-1" /> English
            </Button>
            <Button
              variant={lang === 'ur' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLang('ur')}
              className="rounded-full"
            >
              <Globe className="h-3 w-3 mr-1" /> اردو
            </Button>
            <Button variant="ghost" size="icon" className="ml-auto rounded-full" onClick={() => navigator.share?.({ title, url: window.location.href })}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-display"
            dir={lang === 'ur' ? 'rtl' : 'ltr'}
          >
            {title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs bg-accent text-accent-foreground rounded-full px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div dir={lang === 'ur' ? 'rtl' : 'ltr'} className="prose-custom">
            {renderContent(content)}
          </div>

          {/* Disclaimer */}
          <div className="mt-10 p-4 bg-warning/10 border border-warning/30 rounded-xl">
            <p className="text-sm text-warning font-medium" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
              {lang === 'en'
                ? '⚠️ Disclaimer: This article is for educational purposes only. Always consult a qualified healthcare professional before starting, stopping, or changing any medication.'
                : '⚠️ دستبرداری: یہ مضمون صرف تعلیمی مقاصد کے لیے ہے۔ کوئی بھی دوائی شروع، بند، یا تبدیل کرنے سے پہلے ہمیشہ اہل طبی پیشہ ور سے مشورہ کریں۔'}
            </p>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-display">
              {lang === 'en' ? 'Related Articles' : 'متعلقہ مضامین'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} className="group">
                  <div className="bg-card rounded-xl border border-border overflow-hidden hover-lift transition-all duration-500">
                    <div className="h-32 overflow-hidden">
                      <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-2">
                        {lang === 'en' ? rp.title : rp.titleUrdu}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/blog">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {lang === 'en' ? 'Back to All Articles' : 'تمام مضامین پر واپس جائیں'}
            </Button>
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
