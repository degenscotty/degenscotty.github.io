import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SocialLinks } from '@/components/common/SocialLinks';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { useProjectStore } from '@/providers/ProjectStoreProvider';
import { siteConfig } from '@/config/site';

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export function HomePage() {
  const { projects } = useProjectStore();
  const programmingProjects = projects.filter((p) => p.category === 'programming');
  const artProjects = projects.filter((p) => p.category === 'art');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative container mx-auto max-w-5xl px-4 pt-24 pb-20 md:pt-36 md:pb-28">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-sm text-muted-foreground tracking-wider mb-6"
            >
              // hello world<span className="animate-blink">_</span>
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-2"
            >
              {siteConfig.name.split(' ')[0]}
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] text-muted-foreground mb-8"
            >
              {siteConfig.name.split(' ')[1]}
            </motion.h1>

            <motion.div variants={fadeUp} className="h-px w-12 bg-foreground/25 mb-8" />

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg"
            >
              {siteConfig.title} — building games, engines, and creative tools.
            </motion.p>

            <motion.div variants={fadeUp}>
              <SocialLinks {...siteConfig.social} />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-4 w-4 text-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Projects */}
      <div className="container mx-auto max-w-5xl px-4 pb-16">
        <ProjectGrid projects={programmingProjects} title="Programming" />
        <ProjectGrid projects={artProjects} title="Art" />
      </div>
    </>
  );
}
