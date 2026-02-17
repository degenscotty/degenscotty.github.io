import { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ProjectCategory } from '@/types/project';

export interface ProjectMetadata {
  title: string;
  category: ProjectCategory;
  thumbnail: string;
  shortDescription: string;
  technologies: string[];
}

interface ProjectMetadataFormProps {
  metadata: ProjectMetadata;
  onChange: (metadata: ProjectMetadata) => void;
}

export function ProjectMetadataForm({ metadata, onChange }: ProjectMetadataFormProps) {
  const [techInput, setTechInput] = useState('');

  function addTech() {
    const tag = techInput.trim();
    if (tag && !metadata.technologies.includes(tag)) {
      onChange({ ...metadata, technologies: [...metadata.technologies, tag] });
    }
    setTechInput('');
  }

  function removeTech(tech: string) {
    onChange({
      ...metadata,
      technologies: metadata.technologies.filter((t) => t !== tech),
    });
  }

  function handleTechKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTech();
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Title</Label>
        <Input
          value={metadata.title}
          onChange={(e) => onChange({ ...metadata, title: e.target.value })}
          placeholder="Project title..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Category</Label>
          <Select
            value={metadata.category}
            onValueChange={(v) => onChange({ ...metadata, category: v as ProjectCategory })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="art">Art</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Thumbnail</Label>
          <Input
            value={metadata.thumbnail}
            onChange={(e) => onChange({ ...metadata, thumbnail: e.target.value })}
            placeholder="/images/thumbnail.jpg"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Short Description</Label>
        <Textarea
          value={metadata.shortDescription}
          onChange={(e) => onChange({ ...metadata, shortDescription: e.target.value })}
          placeholder="A brief description shown on the card..."
          className="min-h-[60px] resize-none"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Technologies</Label>
        <div className="flex gap-2">
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={handleTechKeyDown}
            placeholder="Add technology..."
            className="flex-1"
          />
          <Button variant="outline" size="sm" onClick={addTech} disabled={!techInput.trim()}>
            Add
          </Button>
        </div>
        {metadata.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {metadata.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="font-mono text-xs gap-1">
                {tech}
                <button onClick={() => removeTech(tech)} className="ml-0.5 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
