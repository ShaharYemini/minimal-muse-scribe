
import React from 'react';
import { PostCard } from './PostCard';
import { BlogPost } from '@/types/blog';

interface PostGridProps {
  title: string;
  posts: BlogPost[];
  variant?: 'default' | 'compact';
}

export function PostGrid({ title, posts, variant = 'default' }: PostGridProps) {
  const isCompact = variant === 'compact';
  
  return (
    <section className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className={`grid gap-6 ${
        isCompact 
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' 
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            variant={variant === 'compact' ? 'compact' : 'default'} 
          />
        ))}
      </div>
    </section>
  );
}
