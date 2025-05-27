import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StarknetKitWalletButton } from "../StarknetKit/starknetkit";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const navItems = [
    { label: 'Wizards', path: '/wizards' },
    { label: 'Tools', path: '/tools' },
    { label: 'Deployments', path: '/deployments' },
    { label: 'Guides', path: '/guides' },
  ];

  return (
    <header className="bg-sky-600 text-white py-4 mb-5">
      <div className="px-4 flex items-center relative min-h-[56px]">
        {/* Left: Title */}
        <div className="text-2xl font-bold flex-shrink-0 pl-2 z-10">
          StarkNet Contract Manager
        </div>
        {/* Center: Nav (absolutely centered) */}
        <nav
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-6 text-lg pointer-events-auto bg-transparent"
          style={{ minWidth: '270px' }}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              className="hover:text-sky-200 transition-colors duration-150 focus:outline-none"
              onClick={() => navigate(item.path)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
        {/* Right: Wallet Button */}
        <div className="flex-shrink-0 z-10 ml-auto w-[180px] flex justify-end">
          <StarknetKitWalletButton />
        </div>
      </div>
    </header>
  );
};

export default Header;