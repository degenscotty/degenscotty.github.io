import { useState } from 'react';
import { Copy, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useProjectStore } from '@/providers/ProjectStoreProvider';

interface ExportDialogProps {
  trigger: React.ReactNode;
}

export function ExportDialog({ trigger }: ExportDialogProps) {
  const { exportAsTypeScript } = useProjectStore();
  const [copied, setCopied] = useState(false);
  const code = exportAsTypeScript();

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.ts';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Export Projects</DialogTitle>
          <DialogDescription>
            Copy or download the generated TypeScript to replace your projects.ts file.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 mb-3">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? (
              <Check className="h-3.5 w-3.5 mr-1.5" />
            ) : (
              <Copy className="h-3.5 w-3.5 mr-1.5" />
            )}
            {copied ? 'Copied' : 'Copy to Clipboard'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Download File
          </Button>
        </div>
        <div className="overflow-auto max-h-[50vh] rounded-md border border-border/50 bg-muted/30 p-4">
          <pre className="text-xs font-mono whitespace-pre-wrap break-words">{code}</pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}
