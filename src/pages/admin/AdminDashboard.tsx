
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MessageSquare, Users, BarChart } from 'lucide-react';
import { mockPosts } from '@/data/mockPosts';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  // Count stats from mock data
  const totalPosts = mockPosts.length;
  const totalComments = mockPosts.reduce((sum, post) => sum + post.comments.length, 0);
  const totalViews = mockPosts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = mockPosts.reduce((sum, post) => sum + post.likes, 0);
  
  // Get recent posts for the dashboard
  const recentPosts = [...mockPosts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {totalPosts > 0 ? `${recentPosts.length} posts this week` : 'No posts yet'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
            <p className="text-xs text-muted-foreground">
              {totalComments > 0 ? 'Active discussions' : 'No comments yet'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalViews > 0 ? '+10% from last month' : 'No views yet'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLikes}</div>
            <p className="text-xs text-muted-foreground">
              {totalLikes > 0 ? 'Likes across all posts' : 'No likes yet'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Posts */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <Button asChild>
            <Link to="/admin/posts/new">New Post</Link>
          </Button>
        </div>
        
        <div className="border rounded-md">
          <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto] gap-4 p-4 font-medium border-b">
            <div>Title</div>
            <div className="hidden md:block">Date</div>
            <div>Actions</div>
          </div>
          
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <div key={post.id} className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto] gap-4 p-4 border-b last:border-b-0 items-center">
                <div>
                  <Link to={`/post/${post.slug}`} className="font-medium hover:text-primary">
                    {post.title}
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-1 md:hidden">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="hidden md:block text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/admin/posts/edit/${post.slug}`}>Edit</Link>
                  </Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No posts yet</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center justify-center">
            <Link to="/admin/posts/new">
              <FileText className="h-10 w-10 mb-2" />
              <span>New Post</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center justify-center">
            <Link to="/admin/posts">
              <BarChart className="h-10 w-10 mb-2" />
              <span>View Analytics</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center justify-center">
            <Link to="/admin/users">
              <Users className="h-10 w-10 mb-2" />
              <span>Manage Users</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center justify-center">
            <Link to="/admin/settings">
              <Settings className="h-10 w-10 mb-2" />
              <span>Settings</span>
            </Link>
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
