
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

  return (
    <div>
      {address ? (
        <button className="px-4 py-2 bg-green-500 text-white rounded" disabled>
          Connected: {address.slice(0, 6)}...{address.slice(-4)}
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={connectWalletWithModal}
        >
          Connect Starknet Wallet
        </button>
      )}
    </div>
  );
}

