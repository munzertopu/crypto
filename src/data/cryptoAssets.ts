export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  logo: string; // Path to the logo image
  marketValue: number;
  shortTerm: {
    potentialGains: number;
    amountHeldValue: number;
    amountHeldUnit: string;
    longTermTransitionDate?: string; // When this asset will become long-term
    monthsUntilLongTerm?: number; // Months until long-term status
  };
  longTerm: {
    potentialGains: number;
    amountHeldValue: number;
    amountHeldUnit: string;
  };
  shortVsLongPercentage: {
    short: number; // Percentage for short term (purple bar)
    long: number;  // Percentage for long term (green bar)
  };
}

export const cryptoAssets: CryptoAsset[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: 'crypto/bitcoin-btc-logo.png',
    marketValue: 1248779,
    shortTerm: {
      potentialGains: 253384,
      amountHeldValue: 4.6682,
      amountHeldUnit: 'BTC',
      longTermTransitionDate: 'Nov 12, 2025',
      monthsUntilLongTerm: 3,
    },
    longTerm: {
      potentialGains: 443386,
      amountHeldValue: 5.8691,
      amountHeldUnit: 'BTC',
    },
    shortVsLongPercentage: {
      short: 40,
      long: 60,
    },
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'crypto/ethereum-eth-logo.png',
    marketValue: 1248779,
    shortTerm: {
      potentialGains: 253384,
      amountHeldValue: 4.6682,
      amountHeldUnit: 'BTC',
      longTermTransitionDate: 'Dec 15, 2025',
      monthsUntilLongTerm: 4,
    },
    longTerm: {
      potentialGains: 443386,
      amountHeldValue: 5.8691,
      amountHeldUnit: 'BTC',
    },
    shortVsLongPercentage: {
      short: 60,
      long: 40,
    },
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    logo: 'crypto/solana-sol-logo.png',
    marketValue: 1248779,
    shortTerm: {
      potentialGains: 253384,
      amountHeldValue: 4.6682,
      amountHeldUnit: 'BTC',
      longTermTransitionDate: 'Jan 20, 2026',
      monthsUntilLongTerm: 5,
    },
    longTerm: {
      potentialGains: 443386,
      amountHeldValue: 5.8691,
      amountHeldUnit: 'BTC',
    },
    shortVsLongPercentage: {
      short: 30,
      long: 70,
    },
  },
  {
    id: 'tethre',
    name: 'Tethre',
    symbol: 'USDT',
    logo: 'crypto/trezor.png',
    marketValue: 1248779,
    shortTerm: {
      potentialGains: 253384,
      amountHeldValue: 4.6682,
      amountHeldUnit: 'BTC',
      longTermTransitionDate: 'Feb 8, 2026',
      monthsUntilLongTerm: 6,
    },
    longTerm: {
      potentialGains: 443386,
      amountHeldValue: 5.8691,
      amountHeldUnit: 'BTC',
    },
    shortVsLongPercentage: {
      short: 50,
      long: 50,
    },
  },
  {
    id: 'metamask',
    name: 'MetaMask',
    symbol: 'USDT',
    logo: 'crypto/metamask.png',
    marketValue: 1248779,
    shortTerm: {
      potentialGains: 253384,
      amountHeldValue: 4.6682,
      amountHeldUnit: 'BTC',
      longTermTransitionDate: 'Mar 15, 2026',
      monthsUntilLongTerm: 7,
    },
    longTerm: {
      potentialGains: 443386,
      amountHeldValue: 5.8691,
      amountHeldUnit: 'BTC',
    },
    shortVsLongPercentage: {
      short: 60,
      long: 40,
    },
  },
  {
    id: 'phantom',
    name: 'Phantom',
    symbol: 'USDT',
    logo: 'crypto/pahton.png',
    marketValue: 1248779,
    shortTerm: {
      potentialGains: 253384,
      amountHeldValue: 4.6682,
      amountHeldUnit: 'BTC',
      longTermTransitionDate: 'Apr 22, 2026',
      monthsUntilLongTerm: 8,
    },
    longTerm: {
      potentialGains: 443386,
      amountHeldValue: 5.8691,
      amountHeldUnit: 'BTC',
    },
    shortVsLongPercentage: {
      short: 70,
      long: 30,
    },
  },
];

// Helper function to format currency values
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Helper function to format crypto amounts
export const formatCryptoAmount = (value: number, unit: string): string => {
  return `${value.toFixed(4)} ${unit}`;
};

// Helper function to calculate total market value
export const getTotalMarketValue = (assets: CryptoAsset[]): number => {
  return assets.reduce((total, asset) => total + asset.marketValue, 0);
};

// Helper function to calculate total short-term gains
export const getTotalShortTermGains = (assets: CryptoAsset[]): number => {
  return assets.reduce((total, asset) => total + asset.shortTerm.potentialGains, 0);
};

// Helper function to calculate total long-term gains
export const getTotalLongTermGains = (assets: CryptoAsset[]): number => {
  return assets.reduce((total, asset) => total + asset.longTerm.potentialGains, 0);
};

// Interface for modal table data
export interface WalletData {
  id: number;
  wallet: string;
  logo: string;
  balance: string;
  price: string;
  value: string;
}

// Interface for tax loss harvesting data
export interface TaxLossHarvestingAsset {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  amountHeld: string;
  potentialLoss: string;
  costBasis: string;
  marketValue: string;
  gainsLosses: string;
  gainsLossesPercentage: string;
}

// Modal table data based on the image
export const modalTableData: WalletData[] = [
  {
    id: 1,
    wallet: "Coinbase",
    logo: "/crypto/coinbase.png",
    balance: "0.638",
    price: "$120,90",
    value: "$21,390"
  },
  {
    id: 2,
    wallet: "Meta Mask",
    logo: "/crypto/metamask.png",
    balance: "0.0921",
    price: "$280,75",
    value: "$7,953"
  },
  {
    id: 3,
    wallet: "Bitcoin",
    logo: "/crypto/bitcoin-btc-logo.png",
    balance: "0.845",
    price: "$5200",
    value: "$649,500"
  },
  {
    id: 4,
    wallet: "Crypto.com",
    logo: "/crypto/crypto.png",
    balance: "0.0256",
    price: "$544,63",
    value: "$17,308"
  }
];

// Tax Loss Harvesting data
export const taxLossHarvestingAssets: TaxLossHarvestingAsset[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: 'crypto/bitcoin-btc-logo.png',
    amountHeld: '0.5000 BTC',
    potentialLoss: '-$12,450',
    costBasis: '$26,700',
    marketValue: '$14,250',
    gainsLosses: '-$12,450',
    gainsLossesPercentage: '-46%'
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'crypto/ethereum-eth-logo.png',
    amountHeld: '2.0000 ETH',
    potentialLoss: '-$3,210',
    costBasis: '$6,800',
    marketValue: '$10,010',
    gainsLosses: '-$3,210',
    gainsLossesPercentage: '-32%'
  },
  {
    id: '3',
    name: 'Kraken',
    symbol: 'KRK',
    logo: 'crypto/kraken.png',
    amountHeld: '5.0000 KRK',
    potentialLoss: '-$3,050',
    costBasis: '$10,500',
    marketValue: '$7,450',
    gainsLosses: '-$3,050',
    gainsLossesPercentage: '-29%'
  }
];
