import React from 'react';
import { useERC20Form } from '../hooks/useERC20Form';
import ProtectionStep from '../Steps/Protection/ProtectionStep';

const ConfiguredProtectionStep: React.FC = () => {
  const {
    defaultExchangeEnabled, setDefaultExchangeEnabled,
    antiBotCooldownEnabled, setAntiBotCooldownEnabled,
    swappableEnabled, setSwappableEnabled,
    maxAmountPerWalletEnabled, setMaxAmountPerWalletEnabled,
    maxTxLimitEnabled, setMaxTxLimitEnabled,
    pausableEnabled, setPausableEnabled,
    blacklistEnabled, setBlacklistEnabled,
    transferableOwnerEnabled, setTransferableOwnerEnabled,
    permitEnabled, setPermitEnabled,
  } = useERC20Form();

  return (
    <ProtectionStep
      defaultExchangeEnabled={defaultExchangeEnabled}
      setDefaultExchangeEnabled={setDefaultExchangeEnabled}
      antiBotCooldownEnabled={antiBotCooldownEnabled}
      setAntiBotCooldownEnabled={setAntiBotCooldownEnabled}
      swappableEnabled={swappableEnabled}
      setSwappableEnabled={setSwappableEnabled}
      maxAmountPerWalletEnabled={maxAmountPerWalletEnabled}
      setMaxAmountPerWalletEnabled={setMaxAmountPerWalletEnabled}
      maxTxLimitEnabled={maxTxLimitEnabled}
      setMaxTxLimitEnabled={setMaxTxLimitEnabled}
      pausableEnabled={pausableEnabled}
      setPausableEnabled={setPausableEnabled}
      blacklistEnabled={blacklistEnabled}
      setBlacklistEnabled={setBlacklistEnabled}
      transferableOwnerEnabled={transferableOwnerEnabled}
      setTransferableOwnerEnabled={setTransferableOwnerEnabled}
      permitEnabled={permitEnabled}
      setPermitEnabled={setPermitEnabled}
    />
  );
};

export default ConfiguredProtectionStep;
