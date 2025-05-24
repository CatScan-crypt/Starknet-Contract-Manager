export const navSteps = [
  { key: 'basic', label: 'Basic Properties' },
  { key: 'protection', label: 'Protection' },
  { key: 'rates', label: 'Rates' },
  { key: 'summary', label: 'Summary' },
];

export interface StarkNetExchange {
  id: string;
  name: string;
  url: string;
}

export const starknetExchanges: StarkNetExchange[] = [
  { id: 'myswap', name: 'mySwap', url: 'app.myswap.xyz' },
  { id: 'ekubo', name: 'Ekubo', url: 'app.ekubo.org' },
  // Add more exchanges here if needed
];