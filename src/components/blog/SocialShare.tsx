
import React from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  variant?: 'horizontal' | 'vertical';
}

export function SocialShare({ url, title, variant = 'horizontal' }: SocialShareProps) {
  // Encode components for sharing
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  // Generate share URLs
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    // In a real app, you might want to show a toast notification here
  };
  
  return (
    <div className={`flex ${variant === 'vertical' ? 'flex-col space-y-2' : 'space-x-2'}`}>
      <Button variant="outline" size="icon" asChild>
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
          <Twitter size={18} />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
          <Facebook size={18} />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          <Linkedin size={18} />
        </a>
      </Button>
      <Button variant="outline" size="icon" onClick={copyToClipboard} aria-label="Copy link">
        <LinkIcon size={18} />
      </Button>
    </div>
  );
}
