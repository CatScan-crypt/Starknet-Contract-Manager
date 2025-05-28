import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StarknetKitWalletButton } from "../StarknetKit/starknetkit";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-transparent text-black py-4 ">
      <div className="px-4 flex items-center relative min-h-[56px]">
        {/* Left: Title */}
        <button
            className="text-2xl font-bold flex-shrink-0 pl-2 z-10 bg-transparent border-none cursor-pointer focus:outline-none hover:text-sky-200 transition-colors duration-150"
            onClick={() => navigate('/')}
            type="button"
            aria-label="Go to Home"
          >
            SNCM
          </button>

        {/* Right: Wallet Button */}
        <div className="flex-shrink-0 z-10 ml-auto w-[180px] flex justify-end">
          <StarknetKitWalletButton />
        </div>
      </div>
    </header>
  );
};

export default Header;