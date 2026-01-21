import { useParams, Navigate } from 'react-router-dom';
import { ProjectDetail } from '@/components/projects/ProjectDetail';
import { projects } from '@/config/projects';

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return <ProjectDetail project={project} />;
}
