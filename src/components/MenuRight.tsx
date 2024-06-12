import Link from "next/link";
import React from "react";

const MenuRight: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-5 text-white bg-black rounded-3xl">
      <a href="/">
        <img src="/assets/images/hub-logo.png" className="w-20" />
      </a>
      <div className="flex flex-col w-full gap-2 mt-5 text-xs">
        <Link href="/bounty" className="">
          <button className="bg-[#F7FF00] text-black p-3 relative cursor-pointer hover:opacity-80 font-bold w-full rounded-lg">
            BOUNTIES (BotM)
            <div className="absolute -right-4 border border-white rounded-full px-1 py-1  w-[80px] flex items-center justify-center text-[8px] font-bold text-white  -top-3 bg-green-400 ring-1 ring-inset ring-red-600/10">
              NEW
            </div>
          </button>
        </Link>
        <a href="https://creative.badenvironment.club/" target="_blank">
          <button className="bg-[#2A9AFC] p-3 relative cursor-pointer hover:opacity-80 font-bold w-full rounded-lg">
            Generate QR Banner
            <div className="absolute -right-4 border border-white rounded-full px-1 py-1  w-[80px] flex items-center justify-center text-[8px] font-bold text-white  -top-3 bg-green-400 ring-1 ring-inset ring-red-600/10">
              NEW
            </div>
          </button>
        </a>

        <a href="https://www.badpilldiscount.com/" target="_blank">
          <button className="bg-[#2A9AFC] p-3 cursor-pointer hover:opacity-80 font-bold w-full rounded-lg">
            Holder (Store) Discounts
          </button>
        </a>

        <button className="bg-[#2A9AFC] relative p-3 cursor-pointer hover:opacity-80 font-bold w-full rounded-lg">
          LORE
          <div className="absolute -right-4 border border-white rounded-full px-1 py-1  w-[80px] flex items-center justify-center text-[8px] font-bold text-white  -top-3 bg-[#FF234A] ring-1 ring-inset ring-red-600/10">
            COMING SOON
          </div>
        </button>
        <a href="https://open.spotify.com/playlist/2Sb6rnOeSQRZGJTaHjDMDP?si=cxBiRF5sSBqG3wCA_FPHGg">
          <button className="bg-[#2A9AFC] p-3 cursor-pointer hover:opacity-80 font-bold w-full rounded-lg">
            Official Spotify Playlist
          </button>
        </a>

        <div className="flex items-center justify-center w-full gap-5 mt-5">
          <a href="https://twitter.com/badenvclub" target="_blank">
            <img
              src="/assets/images/tw.png"
              className="w-12 cursor-pointer hover:opacity-80"
            />
          </a>
          <a href="https://discord.com/invite/badenvclub" target="_blank">
            <img
              src="/assets/images/discord.png"
              className="w-9 hover:opacity-80"
            />
          </a>
          <a
            href="https://www.instagram.com/badenvironmentclub"
            target="_blank"
          >
            <img
              src="/assets/images/insta.png"
              className="w-12 hover:opacity-80"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MenuRight;
