import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import type { Project, ProjectCategory } from '@/types/project';

interface ProjectGridProps {
  projects: Project[];
  category?: ProjectCategory;
  title?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ProjectGrid({ projects, category, title }: ProjectGridProps) {
  const filteredProjects = category
    ? projects.filter((p) => p.category === category)
    : projects;

  if (filteredProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      {title && (
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
          {title}
        </h2>
      )}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project) => (
          <motion.div key={project.id} variants={item}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
