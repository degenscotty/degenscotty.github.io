import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import type { MediaGridBlock, Media, MediaType } from '@/types/project';

interface MediaGridBlockEditorProps {
  block: MediaGridBlock;
  onChange: (block: MediaGridBlock) => void;
}

export function MediaGridBlockEditor({ block, onChange }: MediaGridBlockEditorProps) {
  function updateItem(index: number, updates: Partial<Media>) {
    const newMedia = block.media.map((m, i) =>
      i === index ? { ...m, ...updates } : m
    );
    onChange({ ...block, media: newMedia });
  }

  function addItem() {
    onChange({
      ...block,
      media: [...block.media, { type: 'image', src: '', alt: '' }],
    });
  }

  function removeItem(index: number) {
    onChange({
      ...block,
      media: block.media.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Columns</Label>
        <Select
          value={String(block.columns ?? 2)}
          onValueChange={(v) => onChange({ ...block, columns: Number(v) as 2 | 3 | 4 })}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {block.media.map((item, index) => (
          <Card key={index} className="p-3 border-border/30 bg-muted/20">
            <div className="flex items-start gap-2">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <Select
                  value={item.type}
                  onValueChange={(v) => updateItem(index, { type: v as MediaType })}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="gif">GIF</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  className="h-8 text-xs"
                  value={item.src}
                  onChange={(e) => updateItem(index, { src: e.target.value })}
                  placeholder={item.type === 'youtube' ? 'Video ID' : 'URL / path'}
                />
                <Input
                  className="h-8 text-xs"
                  value={item.alt ?? ''}
                  onChange={(e) => updateItem(index, { alt: e.target.value })}
                  placeholder="Alt text"
                />
                <Input
                  className="h-8 text-xs"
                  value={item.caption ?? ''}
                  onChange={(e) => updateItem(index, { caption: e.target.value || undefined })}
                  placeholder="Caption (optional)"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0 text-destructive hover:text-destructive"
                onClick={() => removeItem(index)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={addItem} className="w-full border-dashed">
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        Add Media Item
      </Button>
    </div>
  );
}
