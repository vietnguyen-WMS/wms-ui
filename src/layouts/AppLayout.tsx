import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';

const AppLayout = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <Header />
          <main className="px-3">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
