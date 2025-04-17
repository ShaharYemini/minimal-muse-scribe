
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, Sun, Moon, Search, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center px-4 sm:px-8">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">MiniBlog</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {["Web Development", "Design", "Technology", "Tutorials", "Career"].map((category) => (
                      <NavigationMenuLink asChild key={category}>
                        <Link to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`} 
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          {category}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className={navigationMenuTriggerStyle()}>
                  About
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className={navigationMenuTriggerStyle()}>
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search, Theme Toggle & User Actions */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {showSearchBar ? (
            <div className="relative flex flex-1 max-w-sm items-center">
              <input
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Search..."
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0"
                onClick={() => setShowSearchBar(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setShowSearchBar(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          
          {isAuthenticated ? (
            <div className="flex items-center">
              {isAdmin && (
                <Button variant="ghost" asChild className="text-sm mr-2">
                  <Link to="/admin">Dashboard</Link>
                </Button>
              )}
              <Button variant="ghost" className="text-sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <Button variant="ghost" asChild className="text-sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="default" asChild className="text-sm">
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          )}
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-2 px-4 py-4 pb-6">
            <Link to="/" 
                  className="block py-2 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/category/web-development" 
                  className="block py-2 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}>
              Web Development
            </Link>
            <Link to="/category/design" 
                  className="block py-2 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}>
              Design
            </Link>
            <Link to="/category/technology" 
                  className="block py-2 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}>
              Technology
            </Link>
            <Link to="/about" 
                  className="block py-2 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" 
                  className="block py-2 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
