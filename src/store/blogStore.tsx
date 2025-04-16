
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getPostBySlug, getRecentPosts, getPopularPosts, getRandomPosts, getSameMonthLastYearPosts, getPostComments } from '@/data/mockPosts';
import { Post, Comment } from '@/types/blog';

interface BlogContextType {
  // Posts
  currentPost: Post | null;
  recentPosts: Post[];
  popularPosts: Post[];
  randomPosts: Post[];
  sameMonthLastYearPosts: Post[];
  
  // Comment handling
  comments: Comment[];
  
  // Theme
  isDarkMode: boolean;
  
  // Actions
  fetchPostBySlug: (slug: string) => void;
  fetchHomepageData: () => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  toggleLikeComment: (commentId: string) => void;
  toggleDarkMode: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [randomPosts, setRandomPosts] = useState<Post[]>([]);
  const [sameMonthLastYearPosts, setSameMonthLastYearPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Check system preference for dark mode on initial load
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const fetchPostBySlug = useCallback((slug: string) => {
    const post = getPostBySlug(slug);
    setCurrentPost(post || null);
    
    if (post) {
      const postComments = getPostComments(post.id);
      setComments(postComments);
    }
  }, []);

  const fetchHomepageData = useCallback(() => {
    setRecentPosts(getRecentPosts());
    setPopularPosts(getPopularPosts());
    setRandomPosts(getRandomPosts());
    setSameMonthLastYearPosts(getSameMonthLastYearPosts());
  }, []);

  const addComment = useCallback((commentData: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: 0,
      ...commentData,
    };
    
    setComments(prevComments => [...prevComments, newComment]);
  }, []);

  const toggleLikeComment = useCallback((commentId: string) => {
    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 } 
          : comment
      )
    );
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newDarkMode = !prev;
      
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newDarkMode;
    });
  }, []);

  const value = {
    currentPost,
    recentPosts,
    popularPosts,
    randomPosts,
    sameMonthLastYearPosts,
    comments,
    isDarkMode,
    fetchPostBySlug,
    fetchHomepageData,
    addComment,
    toggleLikeComment,
    toggleDarkMode
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export function useBlogContext() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
}
