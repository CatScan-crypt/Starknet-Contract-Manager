import { useState } from "react";
import { connect } from "starknetkit";

type WalletWithAddress = {
  selectedAddress: string;
};

export function StarknetKitWalletButton() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const res = await connect({}); // always pass an options object
      if (res && res.wallet) {
        const walletWithAddress = res.wallet as unknown as WalletWithAddress;
        if (walletWithAddress.selectedAddress) {
          setAccount(walletWithAddress.selectedAddress);
        }
      }
    } finally {
      setIsConnecting(false);
    }
  };

  if (account) {
    return (
      <button className="px-4 py-2 bg-green-500 text-white rounded" disabled>
        Connected: {account.slice(0, 6)}...{account.slice(-4)}
      </button>
    );
  }

  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={handleConnect}
      disabled={isConnecting}
    >
      {isConnecting ? "Connecting..." : "Connect Starknet Wallet"}
    </button>
  );
}
