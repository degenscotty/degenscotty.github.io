import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectDetail } from '@/components/projects/ProjectDetail';
import { useProjectStore } from '@/providers/ProjectStoreProvider';

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { getProject } = useProjectStore();
  const project = id ? getProject(id) : undefined;

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div>
      <div className="container mx-auto max-w-5xl px-4 pt-4 flex justify-between">
        <Button variant="outline" size="sm" asChild className="border-border/50 whitespace-nowrap">
          <Link to="/">
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            Back to projects
          </Link>
        </Button>
        {import.meta.env.DEV && (
          <Button variant="outline" size="sm" asChild className="border-border/50 whitespace-nowrap">
            <Link to={`/builder/${project.id}`}>
              <Pencil className="h-3.5 w-3.5 mr-1.5" />
              Edit
            </Link>
          </Button>
        )}
      </div>
      <ProjectDetail project={project} />
    </div>
  );
}
