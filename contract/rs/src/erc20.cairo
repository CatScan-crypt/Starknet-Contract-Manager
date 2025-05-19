#[starknet::contract]
  mod erc20 {
    use openzeppelin_token::erc20::{ERC20Component, ERC20HooksEmptyImpl};
    use starknet::ContractAddress;
    component!(path: ERC20Component, storage: erc20, event: ERC20Event);
    
    

#[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        nameee: ByteArray,
        symbol: ByteArray,
        decimals: u8,
    }
    
    #[constructor]
    fn constructor(
        ref self: ContractState,
        account: ContractAddress,
        nameee: ByteArray,
        symbol: ByteArray,
        fixed_supply: u256,
        decimals: u8,
    ) {
        self.nameee.write(nameee);
        let nameee = self.nameee.read();
        self.symbol.write(symbol);
        let symbol = self.symbol.read();
        self.decimals.write(decimals);
        self.erc20.mint(account, fixed_supply);
        self.erc20.initializer(nameee, symbol);
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