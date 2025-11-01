import { Outlet } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  withHeader?: boolean;
}

const Layout = ({ withHeader = true }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <main className="mx-auto min-h-screen w-full max-w-md border bg-white">
        {withHeader && <Header />}

        <section className="p-4">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
