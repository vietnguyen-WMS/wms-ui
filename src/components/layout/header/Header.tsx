import { Link } from "react-router-dom";
import { Dropdown } from "@/components/ui";
import { useAuth } from "@/stores";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <div className="px-3 h-12 flex items-center justify-end bg-gray-500">
        <div className="flex items-center space-x-3">
          <Dropdown>
            <Dropdown.Trigger>
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user?.avatar}
                  alt={user?.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <div className="p-2">
                <Dropdown.TriggerClose>
                  <Link
                    to="/profile"
                    className="block hover:bg-stone-600 rounded p-2"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
                        <img
                          src={user?.avatar}
                          alt={user?.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p>{user?.username}</p>
                    </div>
                  </Link>
                </Dropdown.TriggerClose>
              </div>
              <Dropdown.Item>
                <Link to="/settings" className="block">
                  Settings
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button className="block cursor-pointer" onClick={logout}>
                  Logout
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Header;
