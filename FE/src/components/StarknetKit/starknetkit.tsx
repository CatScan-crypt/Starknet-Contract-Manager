
import {
  useAccount,
  useConnect,
  type Connector,
} from "@starknet-react/core";
import {
  useStarknetkitConnectModal,
  type StarknetkitConnector,
} from "starknetkit";
import { availableConnectors } from "./starknetkit-connectors";

export function StarknetKitWalletButton() {
  const { connectAsync } = useConnect();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: availableConnectors as StarknetkitConnector[],
  });
  const { address } = useAccount();

  async function connectWalletWithModal() {
    try {
      const result = await starknetkitConnectModal();
      console.log('[StarknetKit] Modal result:', result);
      const connector = result?.connector;
      if (!connector) {
        console.warn('[StarknetKit] No connector returned from modal.');
        return;
      }
      console.log('[StarknetKit] Connecting with connector:', connector);
      await connectAsync({ connector: connector as Connector });
    } catch (err) {
      console.error('[StarknetKit] Error during wallet connection:', err);
      alert('Wallet connection failed: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  // Robust invisible placeholder approach
  const connectedText = `Connected: ${address ? address.slice(0, 6) + '...' + address.slice(-4) : '0x0000...0000'}`;
  const disconnectedText = 'Connect Starknet Wallet';
  // Use the longer text for the placeholder
  const placeholderText = connectedText.length > disconnectedText.length ? connectedText : disconnectedText;

  return (
    <button
      className={`px-4 py-2 rounded relative min-w-[220px] ${address ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
      onClick={!address ? connectWalletWithModal : undefined}
      disabled={!!address}
      type="button"
      style={{ overflow: 'hidden' }}
    >
      {/* Invisible placeholder to reserve space for the longest content */}
      <span className="invisible block">
        {placeholderText}
      </span>
      {/* Actual visible content, absolutely positioned over the placeholder */}
      <span className="absolute left-0 top-0 w-full h-full flex items-center justify-center pointer-events-none">
        {address ? (
          <span>
            Connected: {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        ) : (
          <span>Connect Starknet Wallet</span>
        )}
      </span>
    </button>
  );
}

