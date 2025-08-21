import viteLogo from '/vite.svg';

const Sidebar = () => {
  return (
    <>
      <div className="w-50 bg-slate-600 text-white">
        <div className="p-3">
          <div className="flex space-x-2 items-center">
            <img src={viteLogo} className="logo" alt="Vite logo" />
            <h1 className="text-xl">WMS</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
