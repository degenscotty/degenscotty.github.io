import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center"
      >
        <p className="font-mono text-sm text-muted-foreground mb-4">// error</p>
        <h1 className="text-7xl md:text-8xl font-bold tracking-tight mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-10">
          This page doesn't exist.
        </p>
        <Button asChild variant="outline">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
