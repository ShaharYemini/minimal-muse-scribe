
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SocialShare } from '@/components/blog/SocialShare';
import { getPostBySlug, getRandomPosts } from '@/data/mockPosts';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  Heart,
  Share2, 
  Edit,
  BookOpen
} from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Comment as CommentType } from '@/types/blog';

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug || '');
  const { isAuthenticated, isAdmin, user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [showSocialShare, setShowSocialShare] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [comments, setComments] = useState<CommentType[]>(post?.comments || []);
  
  // Related posts (using random posts as a proxy)
  const relatedPosts = getRandomPosts(3);
  
  // Calculate reading time
  const readingTime = Math.max(1, Math.ceil(post?.content.split(' ').length / 200)) || 5;
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Apply scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
      element.classList.remove('animate-fade-in');
      observer.observe(element);
    });
    
    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [slug]);
  
  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Post not found</h1>
            <p className="mb-6">The post you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  const toggleLike = () => {
    setLiked(prev => !prev);
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !isAuthenticated) return;
    
    const newComment: CommentType = {
      id: `temp-${Date.now()}`,
      postId: post.id,
      author: {
        id: user?.id || 'anonymous',
        name: user?.name || 'Anonymous',
        avatar: user?.avatar || 'https://via.placeholder.com/150',
      },
      content: commentText,
      createdAt: new Date().toISOString(),
    };
    
    setComments(prev => [newComment, ...prev]);
    setCommentText('');
  };
  
  const handleSubmitReply = (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyText.trim() || !isAuthenticated) return;
    
    const newReply: CommentType = {
      id: `temp-reply-${Date.now()}`,
      postId: post.id,
      parentId,
      author: {
        id: user?.id || 'anonymous',
        name: user?.name || 'Anonymous',
        avatar: user?.avatar || 'https://via.placeholder.com/150',
      },
      content: replyText,
      createdAt: new Date().toISOString(),
    };
    
    setComments(prev => {
      const updatedComments = [...prev];
      const parentIndex = updatedComments.findIndex(c => c.id === parentId);
      
      if (parentIndex !== -1) {
        updatedComments[parentIndex] = {
          ...updatedComments[parentIndex],
          replies: [
            ...(updatedComments[parentIndex].replies || []),
            newReply
          ]
        };
      }
      
      return updatedComments;
    });
    
    setReplyText('');
    setShowReplyForm(null);
  };
  
  const markdownRenderers = {
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      <div className="my-4">
        <img src={src} alt={alt} className="rounded-lg mx-auto max-w-full" />
        {alt && <p className="text-center text-sm text-muted-foreground mt-2">{alt}</p>}
      </div>
    )
  };
  
  return (
    <Layout>
      <article className="bg-background">
        {/* Hero Section with Cover Image */}
        <div className="relative h-96 overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <div className="flex items-center space-x-2 text-white mb-3">
                <Link 
                  to={`/category/${post.tags[0]?.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-primary px-3 py-1 rounded-full text-xs font-medium"
                >
                  {post.tags[0]}
                </Link>
                <span>•</span>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <time dateTime={post.createdAt}>
                    {format(new Date(post.createdAt), 'MMM d, yyyy')}
                  </time>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{readingTime} min read</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full mr-3 border-2 border-white"
                />
                <div>
                  <Link to={`/author/${post.author.id}`} className="text-white font-medium hover:underline">
                    {post.author.name}
                  </Link>
                  <p className="text-white/80 text-sm">{post.author.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            {/* Actions Bar */}
            <div className="flex items-center justify-between border-y py-4 mb-8">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={liked ? "text-red-500" : ""}
                  onClick={toggleLike}
                >
                  <Heart className={`mr-1 ${liked ? "fill-current" : ""}`} size={18} />
                  <span>{liked ? post.likes + 1 : post.likes}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <MessageSquare className="mr-1" size={18} />
                  <span>{comments.length}</span>
                </Button>
              </div>
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowSocialShare(prev => !prev)}
                >
                  <Share2 className="mr-1" size={18} />
                  Share
                </Button>
                {showSocialShare && (
                  <div className="absolute right-0 mt-2 p-2 bg-popover rounded-md shadow-md z-10 border">
                    <SocialShare 
                      url={window.location.href} 
                      title={post.title} 
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Admin Edit Button */}
            {isAdmin && (
              <div className="mb-6">
                <Button variant="outline" asChild>
                  <Link to={`/admin/posts/edit/${post.slug}`}>
                    <Edit className="mr-2" size={16} />
                    Edit Post
                  </Link>
                </Button>
              </div>
            )}
            
            {/* Post Content */}
            <div className="prose prose-lg max-w-none animate-on-scroll">
              <ReactMarkdown components={markdownRenderers}>
                {post.content}
              </ReactMarkdown>
            </div>
            
            {/* Tags */}
            <div className="mt-8 mb-12 animate-on-scroll">
              <h3 className="font-bold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link 
                    key={tag}
                    to={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Author Box */}
            <div className="border rounded-lg p-6 my-8 animate-on-scroll">
              <div className="flex items-center space-x-4">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-lg">
                    <Link to={`/author/${post.author.id}`} className="hover:text-primary">
                      {post.author.name}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground">{post.author.bio}</p>
                </div>
              </div>
            </div>
            
            {/* Comments Section */}
            <div id="comments" className="mt-12 animate-on-scroll">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MessageSquare className="mr-2" />
                Comments ({comments.length})
              </h2>
              
              {/* Comment Form */}
              {isAuthenticated ? (
                <form onSubmit={handleSubmitComment} className="mb-8">
                  <div className="border rounded-lg p-4 mb-4">
                    <textarea
                      className="w-full h-24 p-2 border rounded resize-none bg-background"
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                    ></textarea>
                    <div className="flex justify-end mt-2">
                      <Button type="submit" disabled={!commentText.trim()}>
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="mb-8 p-4 bg-muted rounded-lg text-center">
                  <p className="mb-2">You need to be logged in to leave a comment.</p>
                  <div className="flex justify-center space-x-2">
                    <Button asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/register">Register</Link>
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No comments yet</h3>
                    <p className="text-muted-foreground mb-4">Be the first to share your thoughts!</p>
                  </div>
                ) : (
                  comments.map(comment => (
                    <div key={comment.id} className="border-b pb-6 last:border-b-0 transition-opacity" id={`comment-${comment.id}`}>
                      <div className="flex items-start space-x-4">
                        <img 
                          src={comment.author.avatar} 
                          alt={comment.author.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{comment.author.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(comment.createdAt), 'MMM d, yyyy • h:mm a')}
                              </p>
                            </div>
                          </div>
                          <p className="mt-2">{comment.content}</p>
                          <div className="mt-2">
                            {isAuthenticated && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setShowReplyForm(prev => prev === comment.id ? null : comment.id)}
                              >
                                Reply
                              </Button>
                            )}
                          </div>
                          
                          {/* Reply Form */}
                          {showReplyForm === comment.id && (
                            <form 
                              onSubmit={(e) => handleSubmitReply(e, comment.id)}
                              className="mt-3 pl-6 border-l-2 border-muted"
                            >
                              <textarea
                                className="w-full h-16 p-2 border rounded resize-none text-sm bg-background"
                                placeholder="Write a reply..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                required
                              ></textarea>
                              <div className="flex justify-end mt-2 space-x-2">
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setShowReplyForm(null)}
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  type="submit" 
                                  size="sm"
                                  disabled={!replyText.trim()}
                                >
                                  Reply
                                </Button>
                              </div>
                            </form>
                          )}
                          
                          {/* Replies */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-4 pl-6 space-y-4 border-l-2 border-muted">
                              {comment.replies.map(reply => (
                                <div key={reply.id} className="flex items-start space-x-3">
                                  <img 
                                    src={reply.author.avatar} 
                                    alt={reply.author.name}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <h5 className="font-medium">{reply.author.name}</h5>
                                      <p className="text-xs text-muted-foreground">
                                        {format(new Date(reply.createdAt), 'MMM d, yyyy • h:mm a')}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm">{reply.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
      
      {/* Related Posts */}
      <section className="bg-muted py-12 animate-on-scroll">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <Link 
                key={relatedPost.id} 
                to={`/post/${relatedPost.slug}`}
                className="bg-background border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-[16/9]">
                  <img 
                    src={relatedPost.coverImage} 
                    alt={relatedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2 hover:text-primary transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PostPage;
