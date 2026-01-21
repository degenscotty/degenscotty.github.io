import { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Media } from '@/types/project';

interface ProjectMediaProps {
  media: Media;
  className?: string;
}

export function ProjectMedia({ media, className }: ProjectMediaProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (media.type === 'youtube') {
    return (
      <div className={className}>
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={`https://www.youtube.com/embed/${media.src}`}
            title={media.alt || 'YouTube video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </AspectRatio>
        {media.caption && (
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {media.caption}
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <div className={className}>
        <div
          className="cursor-pointer overflow-hidden rounded-lg"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={media.src}
            alt={media.alt || ''}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        {media.caption && (
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {media.caption}
          </p>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
          <DialogTitle className="sr-only">{media.alt || 'Image'}</DialogTitle>
          <img
            src={media.src}
            alt={media.alt || ''}
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

interface ProjectMediaGridProps {
  media: Media[];
  columns?: 2 | 3 | 4;
}

export function ProjectMediaGrid({ media, columns = 2 }: ProjectMediaGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {media.map((item, index) => (
        <ProjectMedia key={index} media={item} />
      ))}
    </div>
  );
}
