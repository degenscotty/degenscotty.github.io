import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { MediaBlock, MediaType } from '@/types/project';

interface MediaBlockEditorProps {
  block: MediaBlock;
  onChange: (block: MediaBlock) => void;
}

export function MediaBlockEditor({ block, onChange }: MediaBlockEditorProps) {
  const { media } = block;

  function updateMedia(updates: Partial<typeof media>) {
    onChange({ ...block, media: { ...media, ...updates } });
  }

  const previewUrl =
    media.type === 'youtube'
      ? `https://img.youtube.com/vi/${media.src}/mqdefault.jpg`
      : media.src;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Media Type</Label>
          <Select
            value={media.type}
            onValueChange={(v) => updateMedia({ type: v as MediaType })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="gif">GIF</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">
            {media.type === 'youtube' ? 'Video ID' : 'URL / Path'}
          </Label>
          <Input
            value={media.src}
            onChange={(e) => updateMedia({ src: e.target.value })}
            placeholder={media.type === 'youtube' ? 'dQw4w9WgXcQ' : '/images/example.jpg'}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Alt Text</Label>
          <Input
            value={media.alt ?? ''}
            onChange={(e) => updateMedia({ alt: e.target.value })}
            placeholder="Describe the media..."
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Caption</Label>
          <Input
            value={media.caption ?? ''}
            onChange={(e) => updateMedia({ caption: e.target.value || undefined })}
            placeholder="Optional caption"
          />
        </div>
      </div>

      {media.src && (
        <div className="mt-2 rounded-md overflow-hidden border border-border/50 bg-muted/30">
          <img
            src={previewUrl}
            alt={media.alt ?? 'Preview'}
            className="max-h-32 w-auto mx-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
}
