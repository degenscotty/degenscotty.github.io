import { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { projects as defaultProjects } from '@/config/projects';
import type { Project, ContentBlock, Media } from '@/types/project';

const STORAGE_KEY = 'portfolio-projects';

interface ProjectStoreState {
  projects: Project[];
}

type ProjectStoreAction =
  | { type: 'SET_PROJECTS'; projects: Project[] }
  | { type: 'ADD_PROJECT'; project: Project }
  | { type: 'UPDATE_PROJECT'; project: Project }
  | { type: 'DELETE_PROJECT'; id: string };

function projectReducer(state: ProjectStoreState, action: ProjectStoreAction): ProjectStoreState {
  switch (action.type) {
    case 'SET_PROJECTS':
      return { projects: action.projects };
    case 'ADD_PROJECT':
      return { projects: [...state.projects, action.project] };
    case 'UPDATE_PROJECT':
      return {
        projects: state.projects.map((p) =>
          p.id === action.project.id ? action.project : p
        ),
      };
    case 'DELETE_PROJECT':
      return {
        projects: state.projects.filter((p) => p.id !== action.id),
      };
    default:
      return state;
  }
}

function loadProjects(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Project[];
    }
  } catch {
    // Fall through to default
  }
  return defaultProjects;
}

function serializeMedia(media: Media): string {
  const parts: string[] = [];
  parts.push(`          type: '${media.type}'`);
  parts.push(`          src: '${media.src}'`);
  if (media.alt) parts.push(`          alt: '${escapeStr(media.alt)}'`);
  if (media.caption) parts.push(`          caption: '${escapeStr(media.caption)}'`);
  return `{\n${parts.join(',\n')},\n        }`;
}

function escapeStr(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function serializeBlock(block: ContentBlock): string {
  switch (block.type) {
    case 'heading':
      return `      {\n        type: 'heading',\n        text: '${escapeStr(block.text)}',${block.level && block.level !== 2 ? `\n        level: ${block.level},` : ''}\n      }`;
    case 'paragraph':
      return `      {\n        type: 'paragraph',\n        text: '${escapeStr(block.text)}',\n      }`;
    case 'media':
      return `      {\n        type: 'media',\n        media: ${serializeMedia(block.media)},\n      }`;
    case 'media-grid': {
      const items = block.media.map((m) => `          ${serializeMedia(m)}`).join(',\n');
      return `      {\n        type: 'media-grid',\n        media: [\n${items},\n        ],${block.columns ? `\n        columns: ${block.columns},` : ''}\n      }`;
    }
  }
}

function generateTypeScript(projects: Project[]): string {
  const projectEntries = projects.map((p) => {
    const content = p.content.map(serializeBlock).join(',\n');
    const links = (p.links ?? [])
      .map(
        (l) =>
          `      {\n        label: '${escapeStr(l.label)}',\n        url: '${escapeStr(l.url)}',${l.icon ? `\n        icon: '${l.icon}',` : ''}\n      }`
      )
      .join(',\n');
    const techs = p.technologies?.length
      ? `\n    technologies: [${p.technologies.map((t) => `'${escapeStr(t)}'`).join(', ')}],`
      : '';

    return `  {
    id: '${escapeStr(p.id)}',
    title: '${escapeStr(p.title)}',
    category: '${p.category}',
    thumbnail: '${escapeStr(p.thumbnail)}',
    shortDescription: '${escapeStr(p.shortDescription)}',${techs}
    content: [
${content},
    ],
    links: [
${links}${links ? ',' : ''}
    ],
  }`;
  });

  return `import type { Project } from '@/types/project';

export const projects: Project[] = [
${projectEntries.join(',\n')},
];
`;
}

interface ProjectStoreContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
  exportAsTypeScript: () => string;
}

const ProjectStoreContext = createContext<ProjectStoreContextType | undefined>(undefined);

export function ProjectStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(projectReducer, { projects: loadProjects() });
  const isInitialMount = useRef(true);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.projects));

    // Skip syncing to projects.ts on initial mount — only sync after actual edits
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (import.meta.env.DEV) {
      const content = generateTypeScript(state.projects);
      fetch('/__api/save-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      }).catch(() => {
        // Silently ignore — dev server may not be ready
      });
    }
  }, [state.projects]);

  const addProject = useCallback((project: Project) => {
    dispatch({ type: 'ADD_PROJECT', project });
  }, []);

  const updateProject = useCallback((project: Project) => {
    dispatch({ type: 'UPDATE_PROJECT', project });
  }, []);

  const deleteProject = useCallback((id: string) => {
    dispatch({ type: 'DELETE_PROJECT', id });
  }, []);

  const getProject = useCallback(
    (id: string) => state.projects.find((p) => p.id === id),
    [state.projects]
  );

  const exportAsTypeScript = useCallback(
    () => generateTypeScript(state.projects),
    [state.projects]
  );

  return (
    <ProjectStoreContext.Provider
      value={{
        projects: state.projects,
        addProject,
        updateProject,
        deleteProject,
        getProject,
        exportAsTypeScript,
      }}
    >
      {children}
    </ProjectStoreContext.Provider>
  );
}

export function useProjectStore() {
  const context = useContext(ProjectStoreContext);
  if (context === undefined) {
    throw new Error('useProjectStore must be used within a ProjectStoreProvider');
  }
  return context;
}
