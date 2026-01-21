import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Download, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProjectMedia, ProjectMediaGrid } from './ProjectMedia';
import type { Project, ContentBlock, LinkIcon } from '@/types/project';

interface ProjectDetailProps {
  project: Project;
}

const iconMap: Record<LinkIcon, React.ComponentType<{ className?: string }>> = {
  github: Github,
  external: ExternalLink,
  download: Download,
  video: Play,
};

function renderContentBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p
          key={index}
          className="text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );
    case 'media':
      return (
        <ProjectMedia key={index} media={block.media} className="my-6" />
      );
    case 'media-grid':
      return (
        <ProjectMediaGrid
          key={index}
          media={block.media}
          columns={block.columns}
        />
      );
    default:
      return null;
  }
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto max-w-3xl px-4 py-8"
    >
      <Link to="/">
        <Button variant="ghost" size="sm" className="mb-6 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to projects
        </Button>
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant={project.category}>{project.category}</Badge>
        </div>
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <Card className="mb-8">
        <CardContent className="p-6 space-y-4">
          {project.content.map((block, index) => renderContentBlock(block, index))}
        </CardContent>
      </Card>

      {project.links && project.links.length > 0 && (
        <>
          <Separator className="my-8" />
          <div className="flex flex-wrap gap-3">
            {project.links.map((link, index) => {
              const Icon = link.icon ? iconMap[link.icon] : ExternalLink;
              return (
                <Button key={index} variant="outline" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-4 w-4 mr-2" />
                    {link.label}
                  </a>
                </Button>
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
}
