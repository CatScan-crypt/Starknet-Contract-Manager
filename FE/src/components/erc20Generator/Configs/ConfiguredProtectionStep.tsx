import React from 'react';
import ProtectionStep from '../Steps/Protection/ProtectionStep';
import { useERC20FormContext } from "../context/ERC20FormContext";

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
  } = useERC20FormContext();

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
