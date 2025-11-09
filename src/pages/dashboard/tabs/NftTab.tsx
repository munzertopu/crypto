import React, { useState } from "react";
import { NFTFinancialMetrics } from "../components";
import NFTGrid from "../components/nft/NFTGrid";
import Filters from "../components/nft/Filters";

interface NFTData {
  id: string;
  name: string;
  image: string;
  estimatedValue: string;
  gainLoss: string;
  gainLossPercentage: string;
  purchasePrice: string;
  purchaseDate: string;
}

interface NFTTabProps {}

const NFTTab: React.FC<NFTTabProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("estimatedValue");

  const nftData: NFTData[] = [
    {
      id: "1",
      name: "Neo Tokyo Citizen #4821",
      image: "https://img.phemex.com/wp-content/uploads/2022/10/27035520/Neo-Tokyo-Citizen-1436.jpg",
      estimatedValue: "$3,120",
      gainLoss: "+27.3%",
      gainLossPercentage: "+27.3%",
      purchasePrice: "$2,450",
      purchaseDate: "05/12/2024",
    },
    {
      id: "2",
      name: "Impostors Alien #1107",
      image:
        "https://assets.gam3s.gg/impostors_cover_916fad8de2/impostors_cover_916fad8de2.png",
      estimatedValue: "$450",
      gainLoss: "-49.4%",
      gainLossPercentage: "-49.4%",
      purchasePrice: "$890",
      purchaseDate: "11/02/2024",
    },
    {
      id: "3",
      name: "CyberPunk Street Cat #209",
      image:
        "https://img.freepik.com/premium-photo/cyberpunk-cat-futuristic-modern-city_879541-126.jpg",
      estimatedValue: "$2,040",
      gainLoss: "+77.4%",
      gainLossPercentage: "+77.4%",
      purchasePrice: "$1,150",
      purchaseDate: "07/15/2023",
    },
    {
      id: "4",
      name: "Bored Ape Yacht Club #778",
      image:
        "https://cdn.decrypt.co/wp-content/uploads/2023/07/bored-ape-sad-gID_7.png",
      estimatedValue: "$3,970",
      gainLoss: "-18.1%",
      gainLossPercentage: "-18.1%",
      purchasePrice: "$2,450",
      purchaseDate: "03/08/2024",
    },
    {
      id: "5",
      name: "CryptoPunk #3100",
      image: "https://forklog.com/wp-content/uploads/Cryptopunk_5577-min.webp",
      estimatedValue: "$8,500",
      gainLoss: "+125.3%",
      gainLossPercentage: "+125.3%",
      purchasePrice: "$3,770",
      purchaseDate: "02/20/2023",
    },
    {
      id: "6",
      name: "Doodle #1234",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=center",
      estimatedValue: "$1,890",
      gainLoss: "+45.2%",
      gainLossPercentage: "+45.2%",
      purchasePrice: "$1,300",
      purchaseDate: "09/15/2023",
    },
    {
      id: "7",
      name: "Azuki #5678",
      image:
        "https://pcccbinhan.com.vn/wp-content/uploads/2024/03/azuki-super-ultra-4.jpg",
      estimatedValue: "$5,200",
      gainLoss: "-12.8%",
      gainLossPercentage: "-12.8%",
      purchasePrice: "$5,960",
      purchaseDate: "01/10/2024",
    },
    {
      id: "8",
      name: "Moonbird #9999",
      image:
        "https://playtoearn.com/img/dapp/flappy-clash-flappy-moonbird/thumbnail/flappy-clash-flappy-moonbird-TavGKgfLWmdB.png",
      estimatedValue: "$2,750",
      gainLoss: "+67.9%",
      gainLossPercentage: "+67.9%",
      purchasePrice: "$1,640",
      purchaseDate: "06/22/2023",
    },
  ];

  const filteredNFTs = nftData.filter((nft) =>
    nft.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Financial Metrics */}
      <div className="sm:mx-4 md:mx-3">
        <NFTFinancialMetrics
          totalNFTs="13"
          totalPurchaseValue="$21,200"
          totalEstimatedValue="$35,800"
          estimatedGainLoss="+$17,150"
          gainLossPercentage="+5.15%"
        />
      </div>

      {/* Search and Filters */}
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* NFT Grid */}
      <NFTGrid filteredNFTs={filteredNFTs} />
    </div>
  );
};

export default NFTTab;
