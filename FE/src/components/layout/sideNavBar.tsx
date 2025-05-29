import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Tools', path: '/tools' },
  { label: 'Deployments', path: '/deployments' },
  { label: 'Guides', path: '/guides' },
];

const wizardsNav = [
  { label: 'Wizards', path: '/wizards' },
  { label: 'ERC20', path: '/wizards/erc20', isSub: true },
  { label: 'NFT', path: '/wizards/nft', isSub: true },
];

const SideNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 text-black w-56 h-screen flex flex-col py-8 px-4 shadow-lg z-20">
      <nav className="flex flex-col mt-32">
        {/* Home at top */}
        <button
          className={`text-lg text-left px-4 py-2 rounded transition-colors duration-150 focus:outline-none ${
            location.pathname === '/' ? 'font-semibold' : 'hover:bg-sky-600'
          }`}
          onClick={() => navigate('/')}
          type="button"
          aria-current={location.pathname === '/' ? 'page' : undefined}
        >
          Home
        </button>
        {/* Wizards Group */}
        <div className="mt-2">
          {/* Render the main Wizards button */}
          {wizardsNav
            .filter((item) => !item.isSub)
            .map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <button
                  key={item.label}
                  className={`text-lg text-left px-4 py-2 rounded transition-colors duration-150 focus:outline-none ${
                    isActive ? 'font-semibold' : 'hover:bg-sky-600'
                  }`}
                  onClick={() => navigate(item.path)}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}

          {/* Conditionally render sub-items if on /wizards or its sub-routes */}
          {location.pathname.startsWith('/wizards') &&
            wizardsNav
              .filter((item) => item.isSub)
              .map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.label}
                    className={`text-lg text-left px-4 py-2 rounded transition-colors duration-150 focus:outline-none ml-6 text-base ${
                      isActive ? 'font-semibold' : 'hover:bg-sky-600'
                    }`}
                    onClick={() => navigate(item.path)}
                    type="button"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                );
              })}
        </div>
        {/* Other nav items */}
        <div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.label}
                className={`text-lg text-left px-4 py-2 rounded transition-colors duration-150 focus:outline-none ${
                  isActive ? 'font-semibold' : 'hover:bg-sky-600'
                }`}
                onClick={() => navigate(item.path)}
                type="button"
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
      <div className="mt-auto mb-6">
        <button
          className={`text-lg text-left px-4 py-2 rounded transition-colors duration-150 focus:outline-none mb-14 ${
            location.pathname === '/settings' ? 'font-semibold' : 'hover:bg-sky-600'
          }`}
          onClick={() => navigate('/settings')}
          type="button"
          aria-current={location.pathname === '/settings' ? 'page' : undefined}
        >
          Settings
        </button>
      </div>
    </aside>
  );
};

export default SideNavBar;