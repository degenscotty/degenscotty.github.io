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
import type { ProjectLink, LinkIcon } from '@/types/project';

interface ProjectLinksEditorProps {
  links: ProjectLink[];
  onChange: (links: ProjectLink[]) => void;
}

export function ProjectLinksEditor({ links, onChange }: ProjectLinksEditorProps) {
  function updateLink(index: number, updates: Partial<ProjectLink>) {
    const next = links.map((l, i) => (i === index ? { ...l, ...updates } : l));
    onChange(next);
  }

  function addLink() {
    onChange([...links, { label: '', url: '', icon: 'external' }]);
  }

  function removeLink(index: number) {
    onChange(links.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <Label className="text-xs text-muted-foreground">Project Links</Label>

      {links.map((link, index) => (
        <Card key={index} className="p-3 border-border/30 bg-muted/20">
          <div className="flex items-start gap-2">
            <div className="flex-1 grid grid-cols-3 gap-2">
              <Input
                className="h-8 text-xs"
                value={link.label}
                onChange={(e) => updateLink(index, { label: e.target.value })}
                placeholder="Label"
              />
              <Input
                className="h-8 text-xs"
                value={link.url}
                onChange={(e) => updateLink(index, { url: e.target.value })}
                placeholder="https://..."
              />
              <Select
                value={link.icon ?? 'external'}
                onValueChange={(v) => updateLink(index, { icon: v as LinkIcon })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="github">GitHub</SelectItem>
                  <SelectItem value="external">External</SelectItem>
                  <SelectItem value="download">Download</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 text-destructive hover:text-destructive"
              onClick={() => removeLink(index)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </Card>
      ))}

      <Button variant="outline" size="sm" onClick={addLink} className="w-full border-dashed">
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        Add Link
      </Button>
    </div>
  );
}
