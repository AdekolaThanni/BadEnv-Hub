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
  width?: number,
  height?: number,
  activePfp?: string
}

const NFTRoundedCard: React.FC<NFTCardProps> = ({ nft, onCardClick, width, height, activePfp }) => {
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
    onCardClick(imageSrc);
  };

  return (
    <div
      className={`relative  transition-all delay-75 w-auto hover:opacity-80  h-auto group `}
      onClick={toggleSelect}
    >
      <Image
        className={`rounded-full ${activePfp === imageSrc && "border-2 border-[#EB212E]"}`}
        src={imageSrc}
        alt={nft.name}
        width={width || 72}
        height={width || 72}
        blurDataURL={imageSrc}
      />
    </div>
  );
};

export default NFTRoundedCard;
