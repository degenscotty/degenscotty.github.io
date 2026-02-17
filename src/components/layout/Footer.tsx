import { useLocation } from 'react-router-dom';
import { Mail, Github, Twitter, Instagram } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer className="mt-auto border-t border-border/50">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        {isHome && (
          <>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Get in touch
                </h3>
                <p className="text-sm text-muted-foreground/80 max-w-sm">
                  Interested in working together or have a question? Feel free to reach out.
                </p>
                <Button variant="outline" size="lg" asChild className="w-fit whitespace-nowrap">
                  <a href={`mailto:${siteConfig.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    {siteConfig.email}
                  </a>
                </Button>
              </div>

              <div className="flex flex-col gap-4 md:items-end">
                <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Socials
                </h3>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.social.github && (
                    <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
                      <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {siteConfig.social.twitter && (
                    <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
                      <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="mr-2 h-4 w-4" />
                        Twitter
                      </a>
                    </Button>
                  )}
                  {siteConfig.social.instagram && (
                    <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
                      <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
                        <Instagram className="mr-2 h-4 w-4" />
                        Instagram
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <Separator className="my-8 opacity-50" />
          </>
        )}
        <p className="text-center text-xs text-muted-foreground/60">
          {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
