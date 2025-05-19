import { Outlet } from "react-router-dom";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

const AppLayout = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto px-3">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
