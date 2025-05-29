import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Wizards', path: '/wizards' },
  { label: 'Tools', path: '/tools' },
  { label: 'Deployments', path: '/deployments' },
  { label: 'Guides', path: '/guides' },
];

const SideNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 text-black w-56 h-screen flex flex-col py-8 px-4 shadow-lg z-20">
      <nav className="flex flex-col space-y-3 mt-32">
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
      </nav>
      <div className="mt-auto">
        <button
          className={`text-lg text-left px-4 py-2 rounded transition-colors duration-150 focus:outline-none pb-18 ${
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