export interface AssetAllocation {
  name: string;
  percentage: number;
  color: string;
  logo: string;
  logoUrl?: string;
}

export const defaultAllocations: AssetAllocation[] = [
  {
    name: "Bitcoin",
    percentage: 17,
    color: "#f7931a",
    logo: "crypto/bitcoin-btc-logo.png",
    logoUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    name: "USDT",
    percentage: 11,
    color: "#26a17b",
    logo: "crypto/tether-usdt-logo.png",
    logoUrl: "https://cryptologos.cc/logos/tether-usdt-logo.png",
  },
  {
    name: "Synthetix",
    percentage: 16,
    color: "#00d1ff",
    logo: "crypto/synthetix-network-token-snx-logo.png",
    logoUrl:
      "https://cryptologos.cc/logos/synthetix-network-token-snx-logo.png",
  },
  {
    name: "Ethereum",
    percentage: 15,
    color: "#627eea",
    logo: "crypto/ethereum-eth-logo.png",
    logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    name: "Solana",
    percentage: 13,
    color: "#9945ff",
    logo: "crypto/solana-sol-logo.png",
    logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    name: "Shibainu",
    percentage: 11,
    color: "#ff6b35",
    logo: "crypto/ShibaInu.png",
    logoUrl: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
  },
  {
    name: "ThetaFuel",
    percentage: 10,
    color: "#ff6b35",
    logo: "crypto/theta-fuel-tfuel-logo.png",
    logoUrl: "https://cryptologos.cc/logos/theta-fuel-tfuel-logo.png",
  },
  {
    name: "Others",
    percentage: 6,
    color: "#10b981",
    logo: "crypto/others.png",
    logoUrl: "https://cryptologos.cc/logos/chainlink-link-logo.png",
  },
];
