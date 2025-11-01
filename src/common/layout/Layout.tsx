import { Outlet } from 'react-router-dom';

interface LayoutProps {
  withHeader?: boolean;
}

const Layout = ({ withHeader = true }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <main className="mx-auto min-h-screen w-full max-w-md border bg-white">
        {withHeader && (
          <header className="border-b p-4">
            <h1 className="text-s1 text-neutral-13 text-center">임시 헤더</h1>
          </header>
        )}

        <section className="p-4">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
