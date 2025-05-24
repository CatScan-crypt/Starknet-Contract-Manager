import React from 'react';

interface ProtectionStepProps {
  defaultExchangeEnabled: boolean;
  setDefaultExchangeEnabled: (enabled: boolean) => void;
  antiBotCooldownEnabled: boolean;
  setAntiBotCooldownEnabled: (enabled: boolean) => void;
  swappableEnabled: boolean;
  setSwappableEnabled: (enabled: boolean) => void;
  maxAmountPerWalletEnabled: boolean;
  setMaxAmountPerWalletEnabled: (enabled: boolean) => void;
  maxTxLimitEnabled: boolean;
  setMaxTxLimitEnabled: (enabled: boolean) => void;
  pausableEnabled: boolean;
  setPausableEnabled: (enabled: boolean) => void;
  blacklistEnabled: boolean;
  setBlacklistEnabled: (enabled: boolean) => void;
  transferableOwnerEnabled: boolean;
  setTransferableOwnerEnabled: (enabled: boolean) => void;
  permitEnabled: boolean;
  setPermitEnabled: (enabled: boolean) => void;
}

interface ToggleCardProps {
  id: string;
  title: string;
  description: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  comingSoon?: boolean;
}

const ToggleCard: React.FC<ToggleCardProps> = ({ id, title, description, isChecked, onChange, comingSoon }) => {
  return (
    <div>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={comingSoon}
        className="sr-only peer"
      />
      <label
        htmlFor={id}
        className={`
          flex items-start p-4 border rounded-lg cursor-pointer
          transition-colors duration-200 ease-in-out
          hover:border-gray-400 hover:shadow-sm
          peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:ring-1 peer-checked:ring-indigo-500
          ${comingSoon ? 'bg-gray-100 opacity-70 cursor-not-allowed' : 'bg-white border-gray-300'}
        `}
      >
        <span className={`
          h-5 w-5 border rounded-full flex-shrink-0
          flex items-center justify-center mr-4 mt-1
          transition-colors duration-200 ease-in-out
          ${isChecked && !comingSoon ? 'bg-indigo-600 border-indigo-600' : 'border-gray-400 bg-white'}
          ${comingSoon && isChecked ? 'bg-gray-400 border-gray-400' : ''}
        `}>
          {isChecked && !comingSoon && <span className="h-2.5 w-2.5 bg-white rounded-full"></span>}
        </span>
        <div className="text-sm flex-grow">
          <span className="font-medium text-gray-800">{title}</span>
          {comingSoon && <span className="ml-2 text-xs font-semibold text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full">Coming Soon</span>}
          <p className="text-xs text-gray-500 mt-1">
            {description}
          </p>
        </div>
      </label>
    </div>
  );
};

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