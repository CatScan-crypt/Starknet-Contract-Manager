import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Tools', path: '/tools', iconSrc: '/tools.svg' },
  { label: 'Deployments', path: '/deployments', iconSrc: '/deployments.svg' },
  { label: 'Guides', path: '/guides', iconSrc: '/tools.svg' }, // Using a generic icon for Guides
];

const wizardsNav = [
  { label: 'Wizards', path: '/wizards', iconSrc: '/wiz.svg' },
  { label: 'ERC20', path: '/wizards/erc20', isSub: true, iconSrc: '/ERC20.svg' },
  { label: 'NFT', path: '/wizards/nft', isSub: true, iconSrc: '/NFT.svg' },
];

const SideNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 text-black w-56 h-screen flex flex-col py-8 px-4 shadow-lg z-20">
      <nav className="flex flex-col mt-32">
        {/* Home at top */}
        <button
          className={`text-lg text-left px-4 py-2 rounded transition-colors duration-150 focus:outline-none flex items-center ${
            location.pathname === '/' ? 'font-semibold' : 'hover:bg-sky-600'
          }`}
          onClick={() => navigate('/')}
          type="button"
          aria-current={location.pathname === '/' ? 'page' : undefined}
        >
          <img src="/home.svg" alt="" className="w-5 h-5 mr-3" />
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
                  className={`text-lg text-left px-4 py-2 rounded transition-colors duration-150 focus:outline-none flex items-center ${
                    isActive ? 'font-semibold' : 'hover:bg-sky-600'
                  }`}
                  onClick={() => navigate(item.path)}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.iconSrc && <img src={item.iconSrc} alt="" className="w-5 h-5 mr-3" />}
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
                    className={`text-lg text-left px-4 py-2 rounded transition-colors duration-150 focus:outline-none ml-6 text-base flex items-center ${
                      isActive ? 'font-semibold' : 'hover:bg-sky-600'
                    }`}
                    onClick={() => navigate(item.path)}
                    type="button"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.iconSrc && <img src={item.iconSrc} alt="" className="w-5 h-5 mr-3" />}
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
                className={`text-lg text-left px-4 py-2 rounded transition-colors duration-150 focus:outline-none flex items-center ${
                  isActive ? 'font-semibold' : 'hover:bg-sky-600'
                }`}
                onClick={() => navigate(item.path)}
                type="button"
                aria-current={isActive ? 'page' : undefined}
              >
                {item.iconSrc && <img src={item.iconSrc} alt="" className="w-5 h-5 mr-3" />}
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
      <div className="mt-auto mb-6">
        <button
          className={`text-lg text-left px-4 py-2 rounded transition-colors duration-150 focus:outline-none mb-14 flex items-center ${
            location.pathname === '/settings' ? 'font-semibold' : 'hover:bg-sky-600'
          }`}
          onClick={() => navigate('/settings')}
          type="button"
          aria-current={location.pathname === '/settings' ? 'page' : undefined}
        >
          <img src="/settings.svg" alt="" className="w-5 h-5 mr-3" />
          Settings
        </button>
      </div>
    </aside>
  );
};

export default SideNavBar;