export const navMethods = [
    { key: 'airdrop', label: 'AirDrop', icon: '/airdrop.svg' },
    { key: 'modifyAuthorities', label: 'Modify Authorities', icon: '/modify.svg' },
    { key: 'revokeAuthorities', label: 'Revoke Authorities', icon: '/Revoke.svg' },
    { key: 'mintTokens', label: 'Mint Tokens', icon: '/mint.svg' },
    { key: 'burnTokens', label: 'Burn Tokens', icon: '/burn.svg' },
    { key: 'freezeUnfreeze', label: 'Freeze/Unfreeze', icon: '/freeze.svg' },
    { key: 'changeTax', label: 'Change Tax Settings', icon: '/tax.svg' },
    { key: 'withdrawFees', label: 'Withdraw Fees', icon: '/withdraw.svg' },
] as const;

export type MethodKey = typeof navMethods[number]['key'];