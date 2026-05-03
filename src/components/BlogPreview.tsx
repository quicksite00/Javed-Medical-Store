import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/data/blogPosts';

export function BlogPreview() {
  const latest = blogPosts.slice(0, 3);

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Health Blog
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display">Latest Health Tips</h2>
            <p className="text-muted-foreground mt-2">Expert medical guides in English & Urdu</p>
          </div>
          <Button variant="outline" className="rounded-full font-semibold hidden sm:flex hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
            <Link to="/blog">All Articles <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group rounded-2xl border border-border/50 bg-card overflow-hidden hover-lift"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="aspect-video overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{post.category}</span>
                <h3 className="font-bold mt-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  <span>{post.readTime} read</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Button variant="outline" className="rounded-full font-semibold" asChild>
            <Link to="/blog">View All Articles <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
