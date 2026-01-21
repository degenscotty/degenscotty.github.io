import { motion } from 'framer-motion';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { projects } from '@/config/projects';
import { siteConfig } from '@/config/site';

export function HomePage() {
  const programmingProjects = projects.filter((p) => p.category === 'programming');
  const artProjects = projects.filter((p) => p.category === 'art');

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold mb-2">
          My name is {siteConfig.name.split(' ')[0]}
        </h1>
        <p className="text-xl text-muted-foreground">{siteConfig.title}</p>
      </motion.header>

      <ProjectGrid
        projects={programmingProjects}
        title="Programming"
      />

      <ProjectGrid
        projects={artProjects}
        title="Art"
      />
    </div>
  );
}
