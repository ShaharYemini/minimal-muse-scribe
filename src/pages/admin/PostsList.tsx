
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { mockPosts } from '@/data/mockPosts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Eye, MessageSquare, Heart, Search, Plus, Trash2, Edit, ChevronDown } from 'lucide-react';

const PostsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'views'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Filter posts based on search term
  const filteredPosts = mockPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'title') {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortBy === 'views') {
      return sortOrder === 'asc'
        ? a.views - b.views
        : b.views - a.views;
    }
    return 0;
  });
  
  const toggleSort = (field: 'date' | 'title' | 'views') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Button asChild>
          <Link to="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'date' ? 'default' : 'outline'}
            onClick={() => toggleSort('date')}
            className="flex items-center gap-1"
          >
            Date
            {sortBy === 'date' && (
              <ChevronDown className={`h-4 w-4 transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
            )}
          </Button>
          <Button
            variant={sortBy === 'title' ? 'default' : 'outline'}
            onClick={() => toggleSort('title')}
            className="flex items-center gap-1"
          >
            Title
            {sortBy === 'title' && (
              <ChevronDown className={`h-4 w-4 transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
            )}
          </Button>
          <Button
            variant={sortBy === 'views' ? 'default' : 'outline'}
            onClick={() => toggleSort('views')}
            className="flex items-center gap-1"
          >
            Views
            {sortBy === 'views' && (
              <ChevronDown className={`h-4 w-4 transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
            )}
          </Button>
        </div>
      </div>
      
      {/* Posts Table */}
      <div className="border rounded-md">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto_auto] gap-4 p-4 font-medium border-b">
          <div>Title</div>
          <div className="hidden md:block">Published</div>
          <div className="hidden md:block">Stats</div>
          <div>Actions</div>
        </div>
        
        {/* Table Body */}
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <div 
              key={post.id} 
              className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto_auto] gap-4 p-4 border-b last:border-b-0 items-center hover:bg-muted/50"
            >
              <div>
                <Link 
                  to={`/post/${post.slug}`} 
                  className="font-medium hover:text-primary"
                  target="_blank"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {post.excerpt}
                </p>
                <p className="text-xs text-muted-foreground md:hidden mt-1">
                  Published: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="hidden md:block text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
              
              <div className="hidden md:flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/admin/posts/edit/${post.slug}`}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                  </Link>
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:ml-2">Delete</span>
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No posts found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PostsList;
