import { useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { ParagraphBlock } from '@/types/project';

interface ParagraphBlockEditorProps {
  block: ParagraphBlock;
  onChange: (block: ParagraphBlock) => void;
}

export function ParagraphBlockEditor({ block, onChange }: ParagraphBlockEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  }, [block.text]);

  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">
        Content <span className="text-muted-foreground/60">(HTML supported)</span>
      </Label>
      <Textarea
        ref={ref}
        value={block.text}
        onChange={(e) => onChange({ ...block, text: e.target.value })}
        placeholder="Write your paragraph content..."
        className="min-h-[80px] resize-none"
      />
    </div>
  );
}
