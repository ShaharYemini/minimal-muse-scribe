
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MessageSquare, Heart, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface PostCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${
      isFeatured ? 'h-full' : ''
    }`}>
      <Link to={`/post/${post.slug}`}>
        <div className={`aspect-[16/9] relative overflow-hidden ${
          isCompact ? 'h-36' : 'h-48 md:h-64'
        }`}>
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        </div>
      </Link>
      
      <CardHeader className={`${isCompact ? 'p-3' : 'p-4'}`}>
        <div className="flex items-center gap-2 mb-1 text-sm text-muted-foreground">
          <Link 
            to={`/category/${post.tags[0]?.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-primary hover:underline"
          >
            {post.tags[0]}
          </Link>
          <span className="text-muted-foreground">•</span>
          <time dateTime={post.createdAt}>
            {format(new Date(post.createdAt), 'MMM d, yyyy')}
          </time>
        </div>
        
        <Link to={`/post/${post.slug}`}>
          <h3 className={`font-bold line-clamp-2 hover:text-primary ${
            isFeatured ? 'text-2xl' : isCompact ? 'text-base' : 'text-xl'
          }`}>
            {post.title}
          </h3>
        </Link>
        
        <div className="flex items-center mt-1">
          <Link to={`/author/${post.author.id}`} className="flex items-center gap-2">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium">{post.author.name}</span>
          </Link>
        </div>
      </CardHeader>
      
      {!isCompact && (
        <CardContent className={`${isCompact ? 'p-3' : 'p-4'} pt-0`}>
          <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
        </CardContent>
      )}
      
      <CardFooter className={`flex items-center justify-between border-t ${
        isCompact ? 'p-3' : 'p-4'
      }`}>
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{post.comments.length}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <Eye className="w-4 h-4" />
          <span>{post.views}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
