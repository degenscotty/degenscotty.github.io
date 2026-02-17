import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ProjectStoreProvider } from '@/providers/ProjectStoreProvider';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { ProjectPage } from '@/pages/ProjectPage';
import { BuilderPage } from '@/pages/BuilderPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <ProjectStoreProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/project/:id" element={<ProjectPage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/builder/:id" element={<BuilderPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </Router>
      </ProjectStoreProvider>
    </ThemeProvider>
  );
}

export default App;
