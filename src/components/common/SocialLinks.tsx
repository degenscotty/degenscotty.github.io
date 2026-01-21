import { Github, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialLinksProps {
  github?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

export function SocialLinks({
  github,
  twitter,
  instagram,
  linkedin,
}: SocialLinksProps) {
  const links = [
    { url: github, icon: Github, label: 'GitHub' },
    { url: twitter, icon: Twitter, label: 'Twitter' },
    { url: instagram, icon: Instagram, label: 'Instagram' },
    { url: linkedin, icon: Linkedin, label: 'LinkedIn' },
  ].filter((link) => link.url);

  return (
    <div className="flex items-center gap-1">
      {links.map(({ url, icon: Icon, label }) => (
        <Button key={label} variant="ghost" size="icon" asChild className="h-9 w-9">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Icon className="h-4 w-4" />
            <span className="sr-only">{label}</span>
          </a>
        </Button>
      ))}
    </div>
  );
}
