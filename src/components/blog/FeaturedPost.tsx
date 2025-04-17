
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="relative flex flex-col md:flex-row overflow-hidden rounded-lg bg-card border animate-fade-in">
      <div className="md:w-2/3 relative aspect-[16/9] md:aspect-auto">
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:hidden" />
      </div>
      
      <div className="md:w-1/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Featured</span>
            <span className="text-sm text-muted-foreground">
              {format(new Date(post.createdAt), 'MMM d, yyyy')}
            </span>
          </div>
          
          <Link to={`/post/${post.slug}`}>
            <h1 className="text-2xl md:text-3xl font-bold hover:text-primary transition-colors mb-4">
              {post.title}
            </h1>
          </Link>
          
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="h-10 w-10 rounded-full mr-2"
            />
            <div>
              <Link to={`/author/${post.author.id}`} className="font-medium hover:text-primary">
                {post.author.name}
              </Link>
              <p className="text-sm text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
          
          <Button variant="ghost" asChild className="group">
            <Link to={`/post/${post.slug}`}>
              Read
              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
