//@ts-nocheck

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface NFTCardProps {
  onCardClick: (mintAddress: string, imageSrc: string) => void;
  index: number;
  nft: {
    name: any;
    title: string;
    mintAddress: string;
    stakedAt: string;
    image: string;
    description: string;
    uri: string;
  };
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onCardClick }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(nft.uri);
        setImageSrc(response.data.image);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [nft.uri]);

  const formatDate = (dateString: any) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    //@ts-ignore
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleSelect = () => {
    onCardClick(nft.mintAddress, imageSrc);
  };

  return (
    <div
      className={`relative  transition-all delay-75 w-auto   h-auto group hover:opacity-70 duration-200`}
      onClick={toggleSelect}
    >
      <Image
        className={`w-full h-full   ${
          isSelected ? "border-[#C7433A] border-4" : "border-black border-2"
        } h-auto group `}
        src={imageSrc}
        alt={nft.name}
        width={300}
        height={300}
        blurDataURL={imageSrc}
      />
      <button className="absolute bg-white text-[10px] akira border rounded-md bottom-0 w-full left-0 text-black t font-bold cursor-pointer hover:opacity-80">
        SET AS PFP
      </button>
    </div>
  );
};

export default NFTCard;
