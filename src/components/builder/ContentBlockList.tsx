import { BlockEditorWrapper } from './blocks/BlockEditorWrapper';
import { HeadingBlockEditor } from './blocks/HeadingBlockEditor';
import { ParagraphBlockEditor } from './blocks/ParagraphBlockEditor';
import { MediaBlockEditor } from './blocks/MediaBlockEditor';
import { MediaGridBlockEditor } from './blocks/MediaGridBlockEditor';
import { AddBlockButton } from './AddBlockButton';
import type { ContentBlock } from '@/types/project';

interface ContentBlockListProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export function ContentBlockList({ blocks, onChange }: ContentBlockListProps) {
  function updateBlock(index: number, block: ContentBlock) {
    const next = [...blocks];
    next[index] = block;
    onChange(next);
  }

  function moveBlock(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function deleteBlock(index: number) {
    onChange(blocks.filter((_, i) => i !== index));
  }

  function insertBlock(index: number, block: ContentBlock) {
    const next = [...blocks];
    next.splice(index, 0, block);
    onChange(next);
  }

  function renderEditor(block: ContentBlock, index: number) {
    switch (block.type) {
      case 'heading':
        return (
          <HeadingBlockEditor
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        );
      case 'paragraph':
        return (
          <ParagraphBlockEditor
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        );
      case 'media':
        return (
          <MediaBlockEditor
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        );
      case 'media-grid':
        return (
          <MediaGridBlockEditor
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        );
    }
  }

  return (
    <div className="space-y-2">
      {blocks.map((block, index) => (
        <div key={index}>
          {index > 0 && (
            <div className="py-0.5">
              <AddBlockButton
                subtle
                onAdd={(b) => insertBlock(index, b)}
              />
            </div>
          )}
          <BlockEditorWrapper
            type={block.type}
            index={index}
            total={blocks.length}
            onMoveUp={() => moveBlock(index, -1)}
            onMoveDown={() => moveBlock(index, 1)}
            onDelete={() => deleteBlock(index)}
          >
            {renderEditor(block, index)}
          </BlockEditorWrapper>
        </div>
      ))}
      <div className="pt-2">
        <AddBlockButton onAdd={(b) => insertBlock(blocks.length, b)} />
      </div>
    </div>
  );
}
