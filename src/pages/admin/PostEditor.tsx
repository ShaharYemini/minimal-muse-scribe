
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { getPostBySlug, mockPosts } from '@/data/mockPosts';
import { X, Eye, Save, ChevronLeft } from 'lucide-react';

const PostEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isEditing = !!slug;
  const existingPost = isEditing ? getPostBySlug(slug) : null;
  
  const [title, setTitle] = useState(existingPost?.title || '');
  const [content, setContent] = useState(existingPost?.content || '');
  const [excerpt, setExcerpt] = useState(existingPost?.excerpt || '');
  const [coverImage, setCoverImage] = useState(existingPost?.coverImage || '');
  const [tags, setTags] = useState<string[]>(existingPost?.tags || []);
  const [currentTag, setCurrentTag] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  
  // Reset form if slug changes
  useEffect(() => {
    if (isEditing && existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
      setExcerpt(existingPost.excerpt);
      setCoverImage(existingPost.coverImage);
      setTags(existingPost.tags);
    }
  }, [slug, existingPost, isEditing]);
  
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to the backend
    alert(`Post ${isEditing ? 'updated' : 'created'} successfully!`);
    navigate('/admin/posts');
  };
  
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate('/admin/posts')}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={previewMode ? 'default' : 'outline'} 
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button type="submit" form="post-form">
            <Save className="mr-2 h-4 w-4" />
            {isEditing ? 'Update' : 'Publish'}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Main Editor / Preview */}
        <div className="space-y-6">
          {previewMode ? (
            // Preview Mode
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <h1>{title || 'Untitled Post'}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map(tag => (
                      <span 
                        key={tag} 
                        className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {coverImage && (
                    <img 
                      src={coverImage} 
                      alt={title} 
                      className="w-full aspect-[16/9] object-cover rounded-md mb-6"
                    />
                  )}
                  <p className="text-lg font-medium text-muted-foreground mb-8">{excerpt}</p>
                  <div className="whitespace-pre-wrap">{content}</div>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Edit Mode
            <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post title"
                  className="text-lg font-medium"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Input
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of your post"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content here..."
                  className="w-full h-96 p-4 border rounded-md resize-none bg-background"
                  required
                />
              </div>
            </form>
          )}
        </div>
        
        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium">Post Settings</h3>
              
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                {coverImage && (
                  <div className="mt-2">
                    <img 
                      src={coverImage} 
                      alt="Cover preview" 
                      className="rounded-md object-cover w-full h-40"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex">
                  <Input
                    id="tags"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add tag and press Enter"
                    onKeyPress={handleTagKeyPress}
                    className="rounded-r-none"
                  />
                  <Button 
                    type="button" 
                    onClick={addTag}
                    className="rounded-l-none"
                  >
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map(tag => (
                    <div 
                      key={tag} 
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm flex items-center group"
                    >
                      {tag}
                      <button 
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button 
                  type="submit" 
                  form="post-form" 
                  className="w-full"
                >
                  {isEditing ? 'Update Post' : 'Publish Post'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium">SEO Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  defaultValue={title}
                  placeholder="SEO title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <textarea
                  id="meta-description"
                  defaultValue={excerpt}
                  placeholder="SEO description"
                  className="w-full h-24 p-2 border rounded-md resize-none bg-background"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PostEditor;
