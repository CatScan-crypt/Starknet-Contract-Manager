import React from 'react';
import type { ProtectionStepProps } from 'ProtectionStepProps';
import ToggleCard from 'ToggleCard';

const ProtectionStep: React.FC<ProtectionStepProps> = ({
  defaultExchangeEnabled,
  setDefaultExchangeEnabled,
  antiBotCooldownEnabled,
  setAntiBotCooldownEnabled,
  swappableEnabled,
  setSwappableEnabled,
  maxAmountPerWalletEnabled,
  setMaxAmountPerWalletEnabled,
  maxTxLimitEnabled,
  setMaxTxLimitEnabled,
  pausableEnabled,
  setPausableEnabled,
  blacklistEnabled,
  setBlacklistEnabled,
  transferableOwnerEnabled,
  setTransferableOwnerEnabled,
  permitEnabled,
  setPermitEnabled,
}) => {
  return (
    <div className="space-y-6">
      <ToggleCard
        id="defaultExchangeProtection"
        title="Default exchange"
        description="Choose a default exchange (V2 only) where you want to add liquidity. This will allow for more precise configuration and more available features."
        isChecked={defaultExchangeEnabled}
        onChange={setDefaultExchangeEnabled}
        comingSoon
      />
      <ToggleCard
        id="antiBotCooldownProtection"
        title="Anti-bot cooldown"
        description="After buying or selling address will be temporarily frozen, during which time it can't do any transfers from it and to it. However token scanners may show your token as honeypot if they can't detect this feature correctly."
        isChecked={antiBotCooldownEnabled}
        onChange={setAntiBotCooldownEnabled}
      />
      <ToggleCard
        id="swappableProtection"
        title="Swappable"
        description="This feature prevents trading for all addresses (except excluded) after adding liquidity until the enableTrading() function is called by the owner."
        isChecked={swappableEnabled}
        onChange={setSwappableEnabled}
      />

      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-3 pt-2 border-t border-gray-200">Limits</h3>
        <div className="space-y-4">
          <ToggleCard
            id="maxAmountPerWalletProtection"
            title="Max amount per wallet"
            description="Limits amount of tokens each address (except excluded) can hold."
            isChecked={maxAmountPerWalletEnabled}
            onChange={setMaxAmountPerWalletEnabled}
            comingSoon
          />
          <ToggleCard
            id="maxTxLimitProtection"
            title="Max transaction limits"
            description="Limits amount of tokens each address (except excluded) can transfer in one transaction."
            isChecked={maxTxLimitEnabled}
            onChange={setMaxTxLimitEnabled}
            comingSoon
          />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-3 pt-2 border-t border-gray-200">Other</h3>
        <div className="space-y-4">
          <ToggleCard
            id="pausableProtection"
            title="Pausable"
            description="Pausable allows owner to globally freeze the entire token contract - no one will be able to move their tokens, including owner."
            isChecked={pausableEnabled}
            onChange={setPausableEnabled}
          />
          <ToggleCard
            id="blacklistProtection"
            title="Blacklist"
            description="Adds a blacklist that owner can use to freeze specific addresses, disallowing any transactions to and from them until they are unblacklisted."
            isChecked={blacklistEnabled}
            onChange={setBlacklistEnabled}
          />
          <ToggleCard
            id="transferableOwnerProtection"
            title="Transferable (Owner Recovery)"
            description="Utility functions to recover any ERC-20 tokens that were sent to token contract by the owner."
            isChecked={transferableOwnerEnabled}
            onChange={setTransferableOwnerEnabled}
          />
          <ToggleCard
            id="permitProtection"
            title="Permit (Gasless Approvals)"
            description="Utility function for signing gasless approvals through third-party smart contracts."
            isChecked={permitEnabled}
            onChange={setPermitEnabled}
          />
        </div>
      </div>
    </div>
  );
};

export default ProtectionStep;