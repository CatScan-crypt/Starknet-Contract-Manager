function minify(code) {
  function lineRemover(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== '\n') {
        result += str[i];
      }
    }
    return result;
  }

  function spaceReducer(str) {
    let result = '';
    let lastCharWasSpace = false;
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === ' ') {
        if (!lastCharWasSpace) {
          result += ch;
          lastCharWasSpace = true;
        }
        // else skip extra spaces
      } else {
        result += ch;
        lastCharWasSpace = false;
      }
    }
    return result;
  }

  // Remove newlines first, then collapse spaces
  const noNewlines = lineRemover(code);
  return spaceReducer(noNewlines);
}

// Example:
const rustCode = `
#[starknet::contract]

 pub mod erc20_contract {
    use openzeppelin_token::erc20::{ERC20Component, ERC20HooksEmptyImpl};
    use starknet::ContractAddress;
    use starknet::storage::{ StoragePointerReadAccess, StoragePointerWriteAccess };
    component!(path: ERC20Component, storage: erc20, event: ERC20Event);
    
    
#[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        name: ByteArray,
        symbol: ByteArray,
        decimals: u8
    }
    
    #[constructor]
    fn constructor(
        ref self: ContractState,
        account: ContractAddress,
        name: ByteArray,
        symbol: ByteArray,
        fixed_supply: u256,
        decimals: u8
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

console.log(minify(rustCode));

