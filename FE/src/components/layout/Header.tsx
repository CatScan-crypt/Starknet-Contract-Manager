import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarknetKitWalletButton } from "../StarknetKit/starknetkit";
import { useAccount, useDisconnect, useNetwork } from "@starknet-react/core";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const { account } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  // Determine explorer URLs based on network
  const isSepolia = chain?.name === 'Starknet Sepolia Testnet';
  const network = isSepolia ? 'sepolia.' : '';
  const voyagerUrl = `https://${network}voyager.online/contract/${account?.address}`;
  const starkscanUrl = `https://${network}starkscan.co/contract/${account?.address}`;

  return (
    <>
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

          {/* Right: Wallet Button and Gear */}

          <div className="flex-shrink-0 z-10 ml-auto w-[260px] flex justify-end items-center space-x-4">
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            onClick={() => setShowSettings(true)}
            aria-label="Open Settings"
            type="button"
          >
            <img src="/gear.svg"alt="Settings" className="h-6 w-6 scale-250" />
            </button>
            <StarknetKitWalletButton />
            {/* Gear Button */}

          </div>
        </div>
      </header>

      {/* Modal */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-8 min-w-[300px] relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowSettings(false)}
              aria-label="Close Settings"
              type="button"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            {/* Settings content goes here */}
            <div className="flex flex-col gap-4 items-center">
              <p className="text-gray-600">Settings window content...</p>
              {account && (
                <>
                  <button
                    onClick={() => window.open(voyagerUrl, '_blank')}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    View on Voyager
                  </button>
                  <button
                    onClick={() => window.open(starkscanUrl, '_blank')}
                    className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                  >
                    View on Starkscan
                  </button>
                  <button
                    onClick={() => { disconnect(); setShowSettings(false); }}
                    className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Disconnect
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;