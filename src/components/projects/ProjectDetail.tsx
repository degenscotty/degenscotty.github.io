import { motion } from 'framer-motion';
import { ExternalLink, Download, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProjectMedia, ProjectMediaGrid } from './ProjectMedia';
import type { Project, ContentBlock, LinkIcon } from '@/types/project';

interface ProjectDetailProps {
  project: Project;
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const iconMap: Record<LinkIcon, React.ComponentType<{ className?: string }>> = {
  github: GitHubIcon,
  external: ExternalLink,
  download: Download,
  video: Play,
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const headingClasses = {
  2: 'text-2xl md:text-3xl font-bold tracking-tight',
  3: 'text-xl md:text-2xl font-semibold tracking-tight',
  4: 'text-lg md:text-xl font-medium',
} as const;

function renderContentBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'heading': {
      const level = block.level ?? 2;
      const Tag = `h${level}` as const;
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Tag className={headingClasses[level]}>{block.text}</Tag>
        </motion.div>
      );
    }
    case 'paragraph':
      return (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );
    case 'media':
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ProjectMedia media={block.media} />
        </motion.div>
      );
    case 'media-grid':
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ProjectMediaGrid media={block.media} columns={block.columns} />
        </motion.div>
      );
    default:
      return null;
  }
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <motion.header
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mb-12"
      >
        <motion.div variants={fadeUp} className="mb-4">
          <Badge variant={project.category}>{project.category}</Badge>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
        >
          {project.title}
        </motion.h1>

        {project.technologies && project.technologies.length > 0 && (
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="font-mono text-xs">
                {tech}
              </Badge>
            ))}
          </motion.div>
        )}
      </motion.header>

      <Separator className="mb-12 opacity-50" />

      {/* Content — paragraphs at readable width, media full-width */}
      <div className="space-y-8 mb-12">
        {project.content.map((block, index) => renderContentBlock(block, index))}
      </div>

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Separator className="mb-8 opacity-50" />
          <div className="flex flex-wrap gap-3">
            {project.links.map((link, index) => {
              const Icon = link.icon ? iconMap[link.icon] : ExternalLink;
              return (
                <Button key={index} variant="outline" asChild className="border-border/50 whitespace-nowrap">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-4 w-4 mr-2" />
                    {link.label}
                  </a>
                </Button>
              );
            })}
          </div>
        </motion.div>
      )}

    </div>
  );
}
