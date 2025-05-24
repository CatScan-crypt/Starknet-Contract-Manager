#[starknet::contract]

 pub mod erc20_contract {
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin_token::erc20::{ERC20Component, ERC20HooksEmptyImpl};
    use starknet::storage::{ StoragePointerReadAccess, StoragePointerWriteAccess };
    use starknet::ContractAddress;

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    
#[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        name: ByteArray,
        symbol: ByteArray,
        decimals: u8,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
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
        self.ownable.initializer(account);
    }
    
    #[event]   
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
    }
   
     // External
     #[abi(embed_v0)]
     impl ERC20MixinImpl = ERC20Component::ERC20MixinImpl<ContractState>;
     #[abi(embed_v0)]
     impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
 
     // Internal
     impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;
     impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

     #[generate_trait]
    #[abi(per_item)]
    impl ExternalImpl of ExternalTrait {
        #[external(v0)]
        fn mint(ref self: ContractState, recipient: ContractAddress, amount: u256) {
            self.ownable.assert_only_owner();
            self.erc20.mint(recipient, amount);
        }
    }
}

