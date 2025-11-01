import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  withHeader?: boolean;
  withBottomNavigation?: boolean;
}

const Layout = ({ withHeader = true, withBottomNavigation = true }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <main className="mx-auto min-h-screen w-full max-w-md border bg-white">
        {withHeader && <Header />}

        <section className="p-4">
          <Outlet />
        </section>
      </main>

      {withBottomNavigation && <BottomNavigation />}
    </div>
  );
};

export default Layout;
