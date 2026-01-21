import { SocialLinks } from '@/components/common/SocialLinks';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p className="text-sm text-muted-foreground">
              Feel free to contact me!
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-foreground hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>
          <SocialLinks {...siteConfig.social} />
        </div>
        <Separator className="my-6" />
        <p className="text-center text-xs text-muted-foreground">
          {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
