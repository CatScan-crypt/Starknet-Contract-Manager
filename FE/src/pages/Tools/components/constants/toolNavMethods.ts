export const navMethods = [
    { key: 'airdrop', label: 'AirDrop' },
    { key: 'modifyAuthorities', label: 'Modify Authorities' },
    { key: 'revokeAuthorities', label: 'Revoke Authorities' },
    { key: 'mintTokens', label: 'Mint Tokens' },
    { key: 'burnTokens', label: 'Burn Tokens' },
    { key: 'freezeUnfreeze', label: 'Freeze/Unfreeze' },
    { key: 'changeTax', label: 'Change Tax Settings' },
    { key: 'withdrawFees', label: 'Withdraw Fees' },
] as const;

export type MethodKey = typeof navMethods[number]['key'];