
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  // If not admin, redirect to login
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }
  
  const navItems = [
    { title: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { title: 'Posts', path: '/admin/posts', icon: <FileText className="h-5 w-5" /> },
    { title: 'Users', path: '/admin/users', icon: <Users className="h-5 w-5" /> },
    { title: 'Settings', path: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile topbar */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="font-bold">Admin Dashboard</h1>
        <Link to="/">
          <Button variant="ghost" size="sm">View Site</Button>
        </Link>
      </div>
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-4 border-b flex items-center justify-between">
            <Link to="/admin" className="font-bold text-lg">Admin Panel</Link>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent transition-colors group"
              >
                <div className="text-muted-foreground group-hover:text-foreground">
                  {item.icon}
                </div>
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
          
          {/* Bottom actions */}
          <div className="p-4 border-t mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">Theme</span>
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {theme === 'light' ? 'Dark' : 'Light'}
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="lg:ml-64">
        {/* Desktop header */}
        <header className="hidden lg:flex items-center justify-between p-4 border-b">
          <h1 className="font-bold text-xl">Admin Dashboard</h1>
          <Link to="/">
            <Button variant="outline">View Site</Button>
          </Link>
        </header>
        
        {/* Content */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
