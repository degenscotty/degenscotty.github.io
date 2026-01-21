import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/project/${project.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="overflow-hidden group cursor-pointer border-transparent hover:border-border transition-colors">
          <AspectRatio ratio={16 / 10}>
            <img
              src={project.thumbnail}
              alt={project.title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <Badge variant={project.category}>
                {project.category}
              </Badge>
            </div>
          </AspectRatio>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.shortDescription}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
