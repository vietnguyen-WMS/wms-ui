import { Link } from 'react-router-dom';
import { Dropdown } from '@/components/ui';
import { useAuth } from '@/stores';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div className="px-3 h-12 flex items-center justify-end bg-gray-500">
        <div className="flex items-center space-x-3">
          <Dropdown>
            <Dropdown.Trigger>
              <button className="px-2 py-1 border rounded">
                {i18n.language.toUpperCase()}
              </button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item>
                <button onClick={() => changeLanguage('en')}>
                  {t('english')}
                </button>
              </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={() => changeLanguage('vi')}>
                  {t('vietnamese')}
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
                    className="block hover:bg-stone-200 rounded p-2"
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
                  {t('settings')}
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button className="block cursor-pointer" onClick={logout}>
                  {t('logout')}
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
