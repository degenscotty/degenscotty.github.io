import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="relative flex-1">
        <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none" />
        <div className="relative">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
