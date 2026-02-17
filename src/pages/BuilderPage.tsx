import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, FileCode, Trash2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProjectMetadataForm } from '@/components/builder/ProjectMetadataForm';
import { ContentBlockList } from '@/components/builder/ContentBlockList';
import { ProjectLinksEditor } from '@/components/builder/ProjectLinksEditor';
import { ExportDialog } from '@/components/builder/ExportDialog';
import { useProjectStore } from '@/providers/ProjectStoreProvider';
import type { ProjectMetadata } from '@/components/builder/ProjectMetadataForm';
import type { ContentBlock, ProjectLink } from '@/types/project';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function BuilderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProject, addProject, updateProject, deleteProject } = useProjectStore();

  const existing = id ? getProject(id) : undefined;
  const isEditing = !!existing;

  const [metadata, setMetadata] = useState<ProjectMetadata>({
    title: '',
    category: 'programming',
    thumbnail: '',
    shortDescription: '',
    technologies: [],
  });
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [links, setLinks] = useState<ProjectLink[]>([]);

  useEffect(() => {
    if (existing) {
      setMetadata({
        title: existing.title,
        category: existing.category,
        thumbnail: existing.thumbnail,
        shortDescription: existing.shortDescription,
        technologies: existing.technologies ?? [],
      });
      setBlocks(existing.content);
      setLinks(existing.links ?? []);
    }
  }, [existing]);

  function handleSave() {
    const projectId = isEditing ? existing.id : slugify(metadata.title) || `project-${Date.now()}`;

    const project = {
      id: projectId,
      title: metadata.title,
      category: metadata.category,
      thumbnail: metadata.thumbnail,
      shortDescription: metadata.shortDescription,
      technologies: metadata.technologies.length > 0 ? metadata.technologies : undefined,
      content: blocks,
      links: links.length > 0 ? links : [],
    };

    if (isEditing) {
      updateProject(project);
    } else {
      addProject(project);
    }

    navigate(`/project/${projectId}`);
  }

  function handleDelete() {
    if (existing) {
      deleteProject(existing.id);
      navigate('/');
    }
  }

  const canSave = metadata.title.trim().length > 0;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="ghost" size="sm" className="-ml-2 mb-2 text-muted-foreground" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              {isEditing ? 'Edit Project' : 'New Project'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ExportDialog
              trigger={
                <Button variant="outline" size="sm" className="border-border/50">
                  <FileCode className="h-3.5 w-3.5 mr-1.5" />
                  Export
                </Button>
              }
            />
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                className="border-border/50 text-destructive hover:text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Delete
              </Button>
            )}
          </div>
        </div>

        {/* Metadata */}
        <Card className="mb-6 border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectMetadataForm metadata={metadata} onChange={setMetadata} />
          </CardContent>
        </Card>

        <Separator className="my-6 opacity-50" />

        {/* Content Blocks */}
        <Card className="mb-6 border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Content</CardTitle>
          </CardHeader>
          <CardContent>
            <ContentBlockList blocks={blocks} onChange={setBlocks} />
          </CardContent>
        </Card>

        <Separator className="my-6 opacity-50" />

        {/* Links */}
        <Card className="mb-8 border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Links</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectLinksEditor links={links} onChange={setLinks} />
          </CardContent>
        </Card>

        {/* Save */}
        <div className="flex justify-end">
          <Button size="lg" onClick={handleSave} disabled={!canSave}>
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
