import { Plus, Heading, AlignLeft, Image, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ContentBlock } from '@/types/project';

interface AddBlockButtonProps {
  onAdd: (block: ContentBlock) => void;
  subtle?: boolean;
}

export function AddBlockButton({ onAdd, subtle = false }: AddBlockButtonProps) {
  function addHeading() {
    onAdd({ type: 'heading', text: '', level: 2 });
  }

  function addParagraph() {
    onAdd({ type: 'paragraph', text: '' });
  }

  function addMedia() {
    onAdd({ type: 'media', media: { type: 'image', src: '' } });
  }

  function addMediaGrid() {
    onAdd({ type: 'media-grid', media: [{ type: 'image', src: '' }], columns: 2 });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {subtle ? (
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-6 text-muted-foreground/40 hover:text-muted-foreground border border-transparent hover:border-dashed hover:border-border/50"
          >
            <Plus className="h-3 w-3" />
          </Button>
        ) : (
          <Button variant="outline" className="w-full border-dashed border-border/50">
            <Plus className="h-4 w-4 mr-2" />
            Add Block
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-48">
        <DropdownMenuItem onClick={addHeading}>
          <Heading className="h-4 w-4 mr-2" />
          Heading
        </DropdownMenuItem>
        <DropdownMenuItem onClick={addParagraph}>
          <AlignLeft className="h-4 w-4 mr-2" />
          Paragraph
        </DropdownMenuItem>
        <DropdownMenuItem onClick={addMedia}>
          <Image className="h-4 w-4 mr-2" />
          Media
        </DropdownMenuItem>
        <DropdownMenuItem onClick={addMediaGrid}>
          <LayoutGrid className="h-4 w-4 mr-2" />
          Media Grid
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
