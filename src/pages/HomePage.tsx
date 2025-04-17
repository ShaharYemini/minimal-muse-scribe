
import React, { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { FeaturedPost } from '@/components/blog/FeaturedPost';
import { PostGrid } from '@/components/blog/PostGrid';
import { 
  getRecentPosts, 
  getSameDateLastYearPosts, 
  getPopularPosts, 
  getRandomPosts,
  getFeaturedPosts
} from '@/data/mockPosts';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const HomePage = () => {
  // Get the different post categories
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts();
  const sameDateLastYearPosts = getSameDateLastYearPosts();
  const popularPosts = getPopularPosts();
  const randomPosts = getRandomPosts(3);
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => {
      section.classList.remove('animate-fade-in');
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  return (
    <Layout>
      <div className="container px-4 py-8 md:py-12 mx-auto space-y-12">
        {featuredPosts.length > 0 && (
          <section>
            <FeaturedPost post={featuredPosts[0]} />
          </section>
        )}
        
        {recentPosts.length > 0 && (
          <section className="animate-on-scroll">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Posts</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/category/recent" className="flex items-center">
                  View all <ChevronRight size={16} />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.slice(0, 3).map(post => (
                <div key={post.id} className="animate-on-scroll">
                  <Link to={`/post/${post.slug}`}>
                    <div className="aspect-[16/9] relative overflow-hidden rounded-lg mb-4">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{post.title}</h3>
                  </Link>
                  <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2 space-y-12">
            {sameDateLastYearPosts.length > 0 && (
              <section className="animate-on-scroll">
                <PostGrid 
                  title="On This Day Last Year" 
                  posts={sameDateLastYearPosts} 
                  variant="default"
                />
              </section>
            )}
            
            {popularPosts.length > 0 && (
              <section className="animate-on-scroll">
                <PostGrid 
                  title="Most Popular" 
                  posts={popularPosts.slice(0, 3)} 
                  variant="default"
                />
              </section>
            )}
          </div>
          
          <div className="space-y-8">
            <section className="animate-on-scroll">
              <h2 className="text-2xl font-bold mb-6">Discover More</h2>
              <div className="space-y-6">
                {randomPosts.map(post => (
                  <div key={post.id} className="flex gap-4 items-start">
                    <Link to={`/post/${post.slug}`} className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-md overflow-hidden">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </Link>
                    <div>
                      <Link to={`/post/${post.slug}`}>
                        <h3 className="font-medium hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="animate-on-scroll bg-muted rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Subscribe to Newsletter</h2>
              <p className="text-muted-foreground text-sm mb-4">Get the latest posts delivered right to your inbox.</p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  required
                />
                <Button type="submit" className="w-full">Subscribe</Button>
              </form>
            </section>
            
            <section className="animate-on-scroll">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {["Web Development", "Design", "Technology", "Tutorials", "Career"].map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-1 text-sm bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
