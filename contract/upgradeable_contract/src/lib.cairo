#[starknet::contract]

 pub mod erc20_contract {
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin_token::erc20::{ERC20Component, ERC20HooksEmptyImpl};
    use openzeppelin::upgrades::interface::IUpgradeable;
    use openzeppelin::upgrades::UpgradeableComponent;
    use starknet::storage::{ StoragePointerReadAccess, StoragePointerWriteAccess };
    use starknet::{ClassHash, ContractAddress};

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);
    
#[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        name: ByteArray,
        symbol: ByteArray,
        decimals: u8,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        upgradeable: UpgradeableComponent::Storage,
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
        #[flat]
        UpgradeableEvent: UpgradeableComponent::Event,
    }
   
     // External
     #[abi(embed_v0)]
     impl ERC20MixinImpl = ERC20Component::ERC20MixinImpl<ContractState>;
     #[abi(embed_v0)]
     impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
 
     // Internal
     impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;
     impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;
     impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;

     #[abi(embed_v0)]
     impl UpgradeableImpl of IUpgradeable<ContractState> {
         fn upgrade(ref self: ContractState, new_class_hash: ClassHash) {
             self.ownable.assert_only_owner();
             self.upgradeable.upgrade(new_class_hash);
         }
     }
}

