
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Search } from "lucide-react";
import { useBlogContext } from "@/store/blogStore";

export function Header() {
  const { isDarkMode, toggleDarkMode } = useBlogContext();

  return (
    <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="blog-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-serif text-2xl font-bold">
            Muse
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="blog-link font-medium">
              Home
            </Link>
            <Link to="/categories" className="blog-link font-medium">
              Categories
            </Link>
            <Link to="/about" className="blog-link font-medium">
              About
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => {}} aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
