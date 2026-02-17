import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { HeadingBlock } from '@/types/project';

interface HeadingBlockEditorProps {
  block: HeadingBlock;
  onChange: (block: HeadingBlock) => void;
}

export function HeadingBlockEditor({ block, onChange }: HeadingBlockEditorProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Heading Text</Label>
        <Input
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          placeholder="Section heading..."
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Level</Label>
        <Select
          value={String(block.level ?? 2)}
          onValueChange={(v) => onChange({ ...block, level: Number(v) as 2 | 3 | 4 })}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">H2</SelectItem>
            <SelectItem value="3">H3</SelectItem>
            <SelectItem value="4">H4</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
