import { Link } from 'react-router-dom';
import viteLogo from '/vite.svg';

const Sidebar = () => {
  const sidebarMenu = [
    { name: 'Home', path: '/' },
    { name: 'Users', path: '/users' },
    { name: 'Guest', path: '/guest' },
  ];

  return (
    <>
      <div className="shrink-0 w-50 bg-slate-600 text-white">
        <div className="p-3">
          <div className="flex space-x-2 items-center">
            <img src={viteLogo} className="logo" alt="Vite logo" />
            <h1 className="text-xl">WMS</h1>
          </div>
          <nav className="mt-6">
            <ul className="space-y-1">
              {sidebarMenu.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="block p-2 rounded hover:bg-slate-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
