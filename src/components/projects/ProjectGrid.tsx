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
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export function ProjectGrid({ projects, category, title }: ProjectGridProps) {
  const filteredProjects = category
    ? projects.filter((p) => p.category === category)
    : projects;

  if (filteredProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-10">
      {title && (
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.15em]">
            {title}
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>
      )}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
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
