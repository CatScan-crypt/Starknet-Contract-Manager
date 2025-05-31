import React from 'react';
import SummaryStep from '../Steps/Summary/SummaryStep';
import { useERC20FormContext } from "../context/ERC20FormContext";
import axios from 'axios';

const ConfiguredSummaryStep: React.FC = () => {
  const {
    tokenName,
    symbol,
    decimals,
    totalSupply,
    isMintable,
    isBurnable,
    generatedCode,
    setGeneratedCode, 
    // Protection props
    defaultExchangeEnabled,
    antiBotCooldownEnabled,
    swappableEnabled,
    maxAmountPerWalletEnabled,
    maxTxLimitEnabled,
    pausableEnabled,
    blacklistEnabled,
    transferableOwnerEnabled,
    permitEnabled, 
    // Rates props
    enableDividendDEX,
    selectedDividendDEXs,
    dividendDistributionMode,
    dexPercentages,
  } = useERC20FormContext();

  const handleGenerateCode = async () => {
    const requestId = Date.now().toString();
    const userAddress = "01234561789"; // Replace with actual source if available
  
    const json = {
      requestId,
      userAddress,
      properties: {
        tokenName,
        symbol,
        totalSupply,
        decimals,
      },
      methods: {
        isMintable,
        isBurnable,
      },
    };
  
    setGeneratedCode(JSON.stringify(json, null, 2));
  
    // --- TEST: Send contract as file ---
    const contractContent = `
#[starknet::contract]
   mod erc20 {
    use openzeppelin_token::erc20::{ERC20Component, ERC20HooksEmptyImpl};
    use starknet::ContractAddress;
    component!(path: ERC20Component, storage: erc20, event: ERC20Event);
    
    

#[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        name: ByteArray,
        symbol: ByteArray,
        decimals: u8,
    }
    
    #[constructor]
    fn constructor(
        ref self: ContractState,
        account: ContractAddress,
        name: ByteArray,
        symbol: ByteArray,
        fixed_supply: u256,
        decimals: u8,
    ) {
        self.name.write(name);
        let name = self.name.read();
        self.symbol.write(symbol);
        let symbol = self.symbol.read();
        self.decimals.write(decimals);
        self.erc20.mint(account, fixed_supply);
        self.erc20.initializer(name, symbol);
    }
    
    #[event]   
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event
    }
   
    #[abi(embed_v0)]
    impl ERC20MixinImpl = ERC20Component::ERC20MixinImpl<ContractState>;
    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;
}
  `;
  
    const contractBlob = new Blob([contractContent], { type: "text/plain" });
  
    const formData = new FormData();
    formData.append("document", contractBlob, "lib.cairo");
    formData.append("caption", JSON.stringify(json, null, 2));
  
    try {
      const response = await axios.post("http://localhost:3000/sendDoc", formData, {
        headers: {
        },
        maxBodyLength: Infinity,
      });
      console.log(response.data);
      alert("Upload successful!");
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    }
  };

  return (
    <SummaryStep
      tokenName={tokenName}
      symbol={symbol}
      decimals={decimals}
      totalSupply={totalSupply}
      isMintable={isMintable}
      isBurnable={isBurnable}
      generatedCode={generatedCode}
      handleGenerateCode={handleGenerateCode}
      defaultExchangeEnabled={defaultExchangeEnabled}      
      antiBotCooldownEnabled={antiBotCooldownEnabled}
      swappableEnabled={swappableEnabled}
      maxAmountPerWalletEnabled={maxAmountPerWalletEnabled}
      maxTxLimitEnabled={maxTxLimitEnabled}
      pausableEnabled={pausableEnabled}
      blacklistEnabled={blacklistEnabled}
      transferableOwnerEnabled={transferableOwnerEnabled}
      permitEnabled={permitEnabled} 
      enableDividendDEX={enableDividendDEX}
      selectedDividendDEXs={selectedDividendDEXs}
      dividendDistributionMode={dividendDistributionMode}
      dexPercentages={dexPercentages}
      deflationaryEnabled={false} 
      reflectionEnabled={false}   
      feeEnabled={false}          
      customTaxEnabled={false}    
    />
  );
};

export default ConfiguredSummaryStep;
