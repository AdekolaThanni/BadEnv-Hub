//@ts-nocheck
import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";
import { TbWorldWww } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io5";
import { FaBlog } from "react-icons/fa";

import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import axios from "axios";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import { PublicKey } from "@solana/web3.js";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import ProductCard from "./ProductCard";
import { set } from "lodash";
import MenuRight from "@/components/MenuRight";
import BountyCard from "@/components/BountyCard";
import Link from "next/link";
import NFTCard from "@/components/NFTCard";
import AppLayout from "@/components/AppLayout";
import PillsBalance from "@/components/PillsBalance";
import NFTRoundedCard from "@/components/NFTRoundedCard";
import getUser from "@/fetchers/getUser";
import { useUser } from "@/contexts/UserProvider";
import Image from "@/components/ui/Image";
import categories from "@/utils/categories";
import updateUserProfile from "@/fetchers/updateUserProfile";

interface Bounty {
  title: string;
  description: string;
  endDate: Date;
  reward: number;
  id: string;
}

function formatWalletAddress(walletAddress: any) {
  if (walletAddress.length <= 12) return walletAddress;
  return `${walletAddress.substring(0, 6)}...${walletAddress.substring(
    walletAddress.length - 6
  )}`;
}

export default function Page({}) {
  const themes = ["moon"];
  const [appTheme] = useState<any>(
    themes[Math.floor(Math.random() * themes.length)]
  );

  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openEditPfp, setOpenEditPfp] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);

  const {user, walletNFTs} = useUser();

  const decideUserRole = (nftCount: number) => {
    if (nftCount <= 1 ) return "bad";
    else if (nftCount <= 5) return "beta";
    else if (nftCount <= 10) return "alpha";
    else return "whale";
  }

  const changePFP = async (newPfpUrl) => {
    console.log(newPfpUrl, user.profile?.pfpUrl); 
    if (newPfpUrl === user.profile?.pfpUrl) return;

    try{
      await updateUserProfile(user.id, {pfpUrl: newPfpUrl}, false);
      toast.success("PFP updated successfully")
    } catch(error: any) {
      toast.error(error.message)
    } finally {
      await getUser(user.id)
    }
  }


  return (
    <>
      <Transition.Root show={openEditPfp} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenEditPfp}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#161616] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className=" text-center ">
                      <Dialog.Title
                        as="h3"
                        className="text-base akira font-semibold leading-6 text-white"
                      >
                        Edit your profile picture
                      </Dialog.Title>
                      <div className="text-white mt-3">
                        <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-scroll">
                          {walletNFTs?.map((nft: any, i: any) => (
                            <NFTCard
                              nft={nft}
                              key={nft.mintAddress}
                              index={i}
                              onCardClick={async (_, imgUrl) => {
                                await changePFP(imgUrl);
                                setOpenEditPfp(false);
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={openMenu} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenMenu}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 left-0 flex max-w-full pr-10 pointer-events-none">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                    <div className="flex flex-col h-full py-6 overflow-y-scroll bg-red-600 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900"></Dialog.Title>
                          <div className="flex items-center ml-3 h-7">
                            <button
                              type="button"
                              className="relative text-red-500 bg-white rounded-md hover:text-gray-500 focus:outline-none "
                              onClick={() => setOpenMenu(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex flex-col flex-1 gap-5 px-4 mt-6 sm:px-6">
                        <a
                          href="https://badenvironment.club/"
                          target="_blank"
                          className="flex items-center w-full gap-2 p-3 text-lg rounded-md shadow-md cursor-pointer hover:opacity-70 hover:shadow-xs"
                        >
                          <TbWorldWww />
                          OUR WEBSITE
                        </a>
                        <a
                          href="https://discord.gg/badenvclub"
                          target="_blank"
                          className="flex items-center w-full gap-2 p-3 text-lg rounded-md shadow-md cursor-pointer hover:opacity-70 hover:shadow-xs"
                        >
                          <FaDiscord />
                          DISCORD
                        </a>
                        <a
                          href="https://twitter.com/BadEnvClub"
                          target="_blank"
                          className="flex items-center w-full gap-2 p-3 text-lg rounded-md shadow-md cursor-pointer hover:opacity-70 hover:shadow-xs"
                        >
                          <FaXTwitter />
                          Twitter
                        </a>{" "}
                        <a
                          href="https://www.instagram.com/badenvironmentclub"
                          target="_blank"
                          className="flex items-center w-full gap-2 p-3 text-lg rounded-md shadow-md cursor-pointer hover:opacity-70 hover:shadow-xs"
                        >
                          <IoLogoInstagram />
                          Instagram
                        </a>
                        <a
                          href="https://magiceden.io/marketplace/bad_environment_club"
                          target="_blank"
                          className="flex items-center w-full gap-2 p-3 text-lg rounded-md shadow-md cursor-pointer hover:opacity-70 hover:shadow-xs"
                        >
                          <img
                            className="w-5 h-5"
                            src="https://ord.cdn.magiceden.dev/static_resources/ME+logo.png"
                          />
                          Magic Eden
                        </a>
                        <a
                          href="https://badenvironmentclub.substack.com/"
                          target="_blank"
                          className="flex items-center w-full gap-2 p-3 text-lg rounded-md shadow-md cursor-pointer hover:opacity-70 hover:shadow-xs"
                        >
                          <FaBlog />
                          BLOG
                        </a>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <AppLayout>
            {/* profile */}
            <div className="bg-[#161616] flex items-start rounded-[10px] md:flex-col md:items-center">
              <div className="relative shrink-0">
                <Image width="320px" height="320px" className="rounded-[10px] shrink-0" imageSrc={
                    user.profile?.pfpUrl ||  "/assets/images/pfp.png" 
                  } imageAlt="" />
                
                <div
                  onClick={() => setOpenEditPfp(true)}
                  className="bg-red-500 flex text-xs gap-2 text-white shadow-lg p-2 cursor-pointer hover:opacity-75 absolute bottom-4 right-2 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                  EDIT PFP
                </div>
              </div>

              <div className="p-7 sm:px-4 md: w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-5">
                    {/* Username */}
                      <div className="akira text-[32px] text-[#FFD600]">
                        {user.profile?.username ||
                           (publicKey && publicKey.toBase58().slice(0, 3) +
                            "..." +
                            publicKey.toBase58().slice(-3))}
                      </div>

                      {/* socials */}
                      <div className="flex items-center gap-3">
                        {/* twitter */}
                        {user.profile?.xLink && <a href={user.profile?.xLink} target="_blank" className="">
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M34.7488 10.8357C33.6631 11.3292 32.4928 11.6535 31.2802 11.8086C32.521 11.0613 33.4798 9.87687 33.931 8.45273C32.7607 9.15775 31.4635 9.65126 30.0957 9.93327C28.9818 8.72064 27.4167 8.01562 25.64 8.01562C22.3265 8.01562 19.6192 10.7229 19.6192 14.0647C19.6192 14.5441 19.6756 15.0094 19.7743 15.4465C14.7546 15.1927 10.2848 12.7815 7.30962 9.12955C6.78791 10.0179 6.49181 11.0613 6.49181 12.1611C6.49181 14.2621 7.54933 16.1233 9.18497 17.1808C8.18384 17.1808 7.25322 16.8988 6.4354 16.4758V16.5181C6.4354 19.451 8.52225 21.9044 11.2859 22.4544C10.3986 22.6972 9.46711 22.731 8.56455 22.5531C8.94753 23.7551 9.69757 24.8069 10.7092 25.5606C11.7209 26.3142 12.9433 26.732 14.2047 26.755C12.0666 28.4476 9.41621 29.3625 6.68921 29.3494C6.2098 29.3494 5.73039 29.3212 5.25098 29.2648C7.93004 30.985 11.1167 31.9862 14.529 31.9862C25.64 31.9862 31.7455 22.7646 31.7455 14.7697C31.7455 14.5018 31.7455 14.248 31.7314 13.9801C32.9158 13.134 33.931 12.0624 34.7488 10.8357Z" fill="#DDDDDD"/>
                            <path d="M22.3385 18.0374C22.0415 17.7828 20.6397 19.4862 20.0466 20.2016C19.4162 19.4721 17.7332 18.0835 17.5435 18.3556C17.3537 18.6278 18.7098 20.5622 19.0923 21.2836C18.8796 21.9838 17.9746 23.8487 18.2012 23.9782C18.4278 24.1077 19.7496 22.7405 20.3649 22.1535C21.0862 22.5071 22.347 23.138 22.4658 22.9174C22.5847 22.6967 21.4616 21.5948 20.8958 20.9018C21.5535 19.8763 22.5535 18.2216 22.3385 18.0374Z" fill="black" stroke="black" stroke-width="0.833333"/>
                          </svg>
                        </a>}

                        {/* instagram */}
                        {user.profile?.instagramLink && <a href={user.profile?.instagramLink} target="_blank" className="">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.2336 8C22.5835 8.0036 23.2687 8.0108 23.8603 8.0276L24.0931 8.036C24.3619 8.0456 24.627 8.0576 24.9474 8.072C26.2242 8.132 27.0953 8.33359 27.8597 8.62999C28.6516 8.93478 29.3188 9.34757 29.986 10.0136C30.5961 10.6134 31.0683 11.339 31.3695 12.1399C31.6659 12.9043 31.8675 13.7755 31.9275 15.0534C31.9419 15.3726 31.9539 15.6378 31.9635 15.9078L31.9707 16.1406C31.9887 16.731 31.9959 17.4162 31.9983 18.7661L31.9995 19.6613V21.2333C32.0024 22.1086 31.9932 22.9838 31.9719 23.8588L31.9647 24.0916C31.9551 24.3616 31.9431 24.6268 31.9287 24.946C31.8687 26.224 31.6647 27.094 31.3695 27.8595C31.0691 28.6609 30.5969 29.3866 29.986 29.9859C29.386 30.5959 28.6604 31.068 27.8597 31.3695C27.0953 31.6658 26.2242 31.8674 24.9474 31.9274C24.6627 31.9409 24.3779 31.9528 24.0931 31.9634L23.8603 31.9706C23.2687 31.9874 22.5835 31.9958 21.2336 31.9982L20.3385 31.9994H18.7677C17.8921 32.0025 17.0165 31.9933 16.1411 31.9718L15.9083 31.9646C15.6234 31.9539 15.3386 31.9415 15.0539 31.9274C13.7772 31.8674 12.906 31.6658 12.1405 31.3695C11.3397 31.0687 10.6144 30.5965 10.0154 29.9859C9.40467 29.3862 8.93211 28.6606 8.63066 27.8595C8.33428 27.0952 8.13269 26.224 8.07269 24.946C8.05932 24.6613 8.04732 24.3765 8.03669 24.0916L8.03069 23.8588C8.00858 22.9838 7.99858 22.1086 8.00069 21.2333V18.7661C7.99734 17.8909 8.00614 17.0156 8.02709 16.1406L8.03549 15.9078C8.04509 15.6378 8.05709 15.3726 8.07149 15.0534C8.13149 13.7755 8.33308 12.9055 8.62946 12.1399C8.93078 11.3382 9.40428 10.6124 10.0166 10.0136C10.6155 9.40334 11.3403 8.93116 12.1405 8.62999C12.906 8.33359 13.776 8.132 15.0539 8.072C15.3731 8.0576 15.6395 8.0456 15.9083 8.036L16.1411 8.0288C17.0161 8.00748 17.8913 7.99828 18.7665 8.0012L21.2336 8ZM20.0001 13.9999C18.4089 13.9999 16.8828 14.632 15.7577 15.7572C14.6325 16.8824 14.0004 18.4085 14.0004 19.9997C14.0004 21.591 14.6325 23.1171 15.7577 24.2423C16.8828 25.3675 18.4089 25.9996 20.0001 25.9996C21.5913 25.9996 23.1173 25.3675 24.2425 24.2423C25.3677 23.1171 25.9998 21.591 25.9998 19.9997C25.9998 18.4085 25.3677 16.8824 24.2425 15.7572C23.1173 14.632 21.5913 13.9999 20.0001 13.9999ZM20.0001 16.3998C20.4728 16.3997 20.9409 16.4928 21.3777 16.6736C21.8145 16.8544 22.2114 17.1195 22.5457 17.4538C22.88 17.788 23.1453 18.1848 23.3262 18.6215C23.5072 19.0583 23.6004 19.5264 23.6005 19.9991C23.6006 20.4719 23.5075 20.94 23.3267 21.3768C23.1459 21.8136 22.8808 22.2105 22.5466 22.5448C22.2123 22.8792 21.8155 23.1444 21.3788 23.3254C20.9421 23.5064 20.474 23.5996 20.0013 23.5996C19.0465 23.5996 18.1309 23.2204 17.4558 22.5452C16.7807 21.8701 16.4015 20.9545 16.4015 19.9997C16.4015 19.045 16.7807 18.1293 17.4558 17.4542C18.1309 16.7791 19.0465 16.3998 20.0013 16.3998" fill="#DDDDDD"/>
                          <path d="M28.8302 10.4141C28.5812 10.2008 27.4066 11.6282 26.9096 12.2276C26.3813 11.6163 24.971 10.4527 24.812 10.6808C24.653 10.9089 25.7894 12.5298 26.1099 13.1343C25.9316 13.7211 25.1733 15.2838 25.3632 15.3923C25.5531 15.5008 26.6607 14.3552 27.1763 13.8633C27.7808 14.1596 28.8373 14.6883 28.9368 14.5034C29.0364 14.3185 28.0953 13.3951 27.6212 12.8143C28.1723 11.955 29.0103 10.5685 28.8302 10.4141Z" fill="black" stroke="black" stroke-width="0.833333"/>
                        </svg>
                        </a>}


                        {/* website */}
                        {user.profile?.personalLink && <a href={user.profile?.personalLink} target="_blank" className="">
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.6318 28.5318C20.7828 28.6822 20.9026 28.861 20.9843 29.0579C21.0661 29.2547 21.1082 29.4658 21.1082 29.6789C21.1082 29.892 21.0661 30.1031 20.9843 30.2999C20.9026 30.4968 20.7828 30.6756 20.6318 30.826L19.83 31.6276C18.3107 33.1466 16.25 34 14.1014 34C11.9528 34 9.89216 33.1466 8.37285 31.6276C6.85354 30.1086 6 28.0484 6 25.9002C6 23.752 6.85354 21.6918 8.37285 20.1728L11.6286 16.9191C13.0884 15.456 15.0525 14.6063 17.1185 14.544C19.1846 14.4818 21.1963 15.2118 22.7415 16.5844C22.901 16.7262 23.0311 16.898 23.1242 17.09C23.2173 17.282 23.2717 17.4905 23.2842 17.7035C23.2968 17.9166 23.2672 18.13 23.1973 18.3316C23.1273 18.5332 23.0183 18.7191 22.8765 18.8786C22.7347 19.0381 22.5628 19.1681 22.3708 19.2612C22.1787 19.3543 21.9702 19.4087 21.7571 19.4212C21.544 19.4337 21.3306 19.4042 21.1289 19.3342C20.9273 19.2643 20.7414 19.1553 20.5818 19.0135C19.6552 18.1908 18.4492 17.753 17.2104 17.7899C15.9717 17.8268 14.7939 18.3355 13.9178 19.2119L10.6648 22.4616C9.75337 23.3729 9.24133 24.6088 9.24133 25.8975C9.24133 27.1862 9.75337 28.4222 10.6648 29.3334C11.5763 30.2447 12.8124 30.7566 14.1014 30.7566C15.3904 30.7566 16.6266 30.2447 17.538 29.3334L18.3398 28.5318C18.4902 28.3812 18.6689 28.2618 18.8655 28.1803C19.0621 28.0988 19.2729 28.0568 19.4858 28.0568C19.6986 28.0568 19.9094 28.0988 20.1061 28.1803C20.3027 28.2618 20.4813 28.3812 20.6318 28.5318ZM30.6311 9.36843C29.1106 7.85176 27.0504 7 24.9025 7C22.7547 7 20.6945 7.85176 19.174 9.36843L18.3722 10.17C18.0679 10.4743 17.897 10.8869 17.897 11.3172C17.897 11.7474 18.0679 12.16 18.3722 12.4643C18.6765 12.7685 19.0892 12.9394 19.5195 12.9394C19.9499 12.9394 20.3626 12.7685 20.6669 12.4643L21.4686 11.6626C22.3801 10.7514 23.6163 10.2394 24.9052 10.2394C26.1942 10.2394 27.4304 10.7514 28.3418 11.6626C29.2533 12.5739 29.7653 13.8098 29.7653 15.0985C29.7653 16.3873 29.2533 17.6232 28.3418 18.5345L25.0875 21.7895C24.2107 22.6656 23.0322 23.1735 21.7931 23.2094C20.5541 23.2453 19.3482 22.8064 18.4221 21.9825C18.2626 21.8407 18.0767 21.7318 17.875 21.6618C17.6734 21.5919 17.4599 21.5623 17.2468 21.5748C17.0338 21.5874 16.8252 21.6417 16.6332 21.7348C16.4411 21.828 16.2693 21.958 16.1275 22.1175C15.9857 22.277 15.8767 22.4628 15.8067 22.6644C15.7367 22.8661 15.7072 23.0795 15.7197 23.2925C15.7323 23.5056 15.7866 23.714 15.8798 23.9061C15.9729 24.0981 16.1029 24.2699 16.2624 24.4117C17.8066 25.784 19.8169 26.5144 21.882 26.4534C23.9471 26.3925 25.9109 25.5447 27.3713 24.0837L30.6271 20.83C32.1458 19.3101 32.9992 17.2498 33 15.1014C33.0008 12.953 32.1488 10.8921 30.6311 9.37113V9.36843Z" fill="#DDDDDD"/>
                          </svg>
                        </a>}
                      </div>
                  </div>

                    <Link
                      href={`/user/edit-profile`}
                      className="bg-transparent border border-white flex items-center gap-2 text-white rounded-lg p-2 cursor-pointer hover:opacity-75"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                      EDIT
                    </Link>
                </div>

                {/* tags */}
                <div className="flex items-center gap-3 mt-2 mb-8 flex-wrap">
                  {/* category */}
                  {Boolean(user.profile?.category?.length) && <div className="flex items-center gap-3">{user.profile?.category?.map(catTitle => {
                      const catData = categories.find(c => c.title === catTitle);

                      return <p style={{backgroundColor: catData?.colorCode}} className={`px-3 py-1 rounded-full`}>{catData?.title}</p> 
                  })}</div>}


                  {/* pfp count */} 
                  {Boolean(walletNFTs.length) && <div className="bg-[rgba(255,255,255,0.2)] px-3 py-1 rounded-full font-semibold">{decideUserRole(walletNFTs.length).toUpperCase()} ({walletNFTs.length} PFPs)</div>}

                  {/* Location */}
                  {user.profile?.location.country && <div className="bg-[rgba(255,255,255,0.2)] px-3 py-1 rounded-full font-semibold flex items-center gap-2">
                      {/* country flag */}
                      <span className="">{user.profile?.location?.flag}</span>

                      {/* country name */}
                      <span className="capitalize">{user.profile?.location?.country}</span>
                    </div> }
                </div>

                {/* bio */}
                <p className="max-w-[650px] font-semibold">{user.profile?.bio}</p>
                

                {/* PFP collection */}
                <div className="mt-5 flex items-center gap-4 my-6">
                  <div className="flex flex-wrap items-center gap-4 w-full overflow-y-scroll">
                    {walletNFTs?.map((nft: any, i: any) => (
                      <NFTRoundedCard
                        nft={nft}
                        key={nft.mintAddress}
                        index={i}
                        onCardClick={() => {}}
                      />
                    ))}
                    {/* <div>
                      <img
                        className="w-16 h-16 cursor-pointer hover:opacity-80"
                        src="/assets/images/add-pfp.png"
                      />
                    </div> */}
                  </div>
                </div>

                {/* user achievements */}
                <div className="flex items-center gap-3 mt-3 lg:flex-col lg:items-stretch">
                  {/* total Earned */}
                  <div className="px-4 py-2 border border-[#FFD600] flex items-center justify-between gap-2 rounded-[6px]">
                    <span className="opacity-60 uppercase">Total earned</span>

                    <span className="font-bold text-[22px]">${user.totalEarned || 0}</span>
                  </div>

                  {/* bounties points */}
                  <div className="px-4 py-2 border border-[#FFD600] flex items-center justify-between gap-2 rounded-[6px]">
                    <span className="opacity-60 uppercase">Bounty points</span>

                    <span className="font-bold text-[22px]">{user.points}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submitted bounties */}
            <div className="mt-12">
                <h3 className="uppercase font-bold text-[26px]">Submitted bounties</h3>

                {/* bounties */}
                {Boolean(user.submittedBounties?.length) && <div className="bg-[#161616] rounded-[12px] mt-6"
                >
                  {user.submittedBounties?.map((submission, index, arr) => {

                    return <div className={`p-5 flex items-center gap-5 md:flex-col md:items-start ${index !== arr.length -1 && "border-b border-b-[rgba(76,76,76,1)]" }`}>
                        <p className="mr-auto font-semibold shrink-0">{submission.bounty.title}</p>

                        {submission.bounty.badCharactersReward && <div className={`shrink-0 flex items-center gap-1`}>
                              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9985 2.28546C13.6664 2.28546 11.7387 2.49086 10.255 2.7409L10.0841 2.77024C8.79559 2.98584 7.72397 3.16572 6.8858 4.19651C6.34999 4.85862 6.17521 5.5743 6.13566 6.37164L5.50799 6.58086C4.91732 6.77732 4.39809 6.95082 3.98858 7.14218C3.54462 7.34885 3.13765 7.6142 2.82637 8.04667C2.51509 8.47787 2.39134 8.94862 2.33521 9.43467C2.28418 9.885 2.28418 10.4297 2.28418 11.0536V11.2386C2.28418 11.7514 2.28418 12.2043 2.32245 12.5832C2.36328 12.9927 2.45385 13.392 2.67966 13.7773C2.90802 14.1638 3.21165 14.4368 3.551 14.6716C3.86355 14.8884 4.25904 15.1091 4.7081 15.3579L8.07607 17.2294C8.76497 18.583 9.7103 19.7898 11.0103 20.6611C12.1419 21.4215 13.5005 21.8986 15.1093 22.0249C15.0645 22.1373 15.0416 22.2572 15.0417 22.3783V24.6108H13.2173C12.7012 24.6108 12.201 24.7897 11.8019 25.1169C11.4027 25.4442 11.1293 25.8996 11.0282 26.4057L10.7488 27.8001H8.34398C8.09022 27.8001 7.84685 27.9009 7.66741 28.0804C7.48797 28.2598 7.38717 28.5032 7.38717 28.7569C7.38717 29.0107 7.48797 29.254 7.66741 29.4335C7.84685 29.6129 8.09022 29.7137 8.34398 29.7137H23.6529C23.9067 29.7137 24.1501 29.6129 24.3295 29.4335C24.5089 29.254 24.6098 29.0107 24.6098 28.7569C24.6098 28.5032 24.5089 28.2598 24.3295 28.0804C24.1501 27.9009 23.9067 27.8001 23.6529 27.8001H21.2482L20.9688 26.4057C20.8676 25.8996 20.5942 25.4442 20.1951 25.1169C19.7959 24.7897 19.2957 24.6108 18.7796 24.6108H16.9553V22.3783C16.9553 22.2572 16.9324 22.1373 16.8877 22.0249C18.4964 21.8973 19.855 21.4215 20.9866 20.6624C22.2879 19.7898 23.2319 18.583 23.9208 17.2294L27.2888 15.3579C27.7379 15.1091 28.1334 14.8884 28.4459 14.6716C28.784 14.4368 29.0889 14.1638 29.316 13.7785C29.5431 13.392 29.6349 12.9927 29.6745 12.5832C29.7127 12.2043 29.7127 11.7514 29.7127 11.2386V11.0536C29.7127 10.431 29.7127 9.885 29.6617 9.43467C29.6056 8.94862 29.4831 8.47787 29.1705 8.04667C28.8593 7.6142 28.4523 7.34885 28.0096 7.1409C27.5976 6.94954 27.0796 6.77732 26.4889 6.58086L25.8613 6.37164C25.823 5.57303 25.6482 4.85862 25.1111 4.19651C24.2742 3.16444 23.2026 2.98457 21.9141 2.77024L21.7419 2.7409C19.8434 2.42969 17.9223 2.27735 15.9985 2.28546ZM19.2963 27.8001L19.0921 26.7808C19.0777 26.7085 19.0387 26.6435 18.9817 26.5968C18.9247 26.55 18.8533 26.5244 18.7796 26.5244H13.2173C13.1436 26.5244 13.0722 26.55 13.0152 26.5968C12.9583 26.6435 12.9192 26.7085 12.9048 26.7808L12.7007 27.8001H19.2963ZM6.1599 8.38092L6.17776 8.37454C6.26961 10.3137 6.48777 12.4569 7.03379 14.4598L5.67384 13.7058C5.17757 13.429 4.86629 13.2555 4.64176 13.0999C4.43509 12.9557 4.36747 12.8702 4.33048 12.8064C4.29221 12.7426 4.25138 12.6431 4.22587 12.3931C4.19882 11.9948 4.18946 11.5956 4.1978 11.1965V11.1033C4.1978 10.4157 4.19908 9.98068 4.23607 9.65155C4.27179 9.34792 4.32793 9.23438 4.37896 9.16549C4.42871 9.09533 4.51801 9.00602 4.79485 8.87717C5.09593 8.73684 5.50927 8.59907 6.1599 8.38092ZM25.8192 8.37326C25.7286 10.3124 25.5092 12.4556 24.9644 14.4585L26.3231 13.7045C26.8193 13.4277 27.1306 13.2542 27.3552 13.0986C27.5618 12.9544 27.6294 12.8689 27.6664 12.8052C27.7047 12.7414 27.7455 12.6419 27.7711 12.3918C27.7978 12.1188 27.7991 11.7629 27.7991 11.1952V11.1021C27.7991 10.4144 27.7978 9.97941 27.7608 9.65027C27.7251 9.34664 27.669 9.2331 27.618 9.16422C27.5682 9.09405 27.4789 9.00475 27.2021 8.8759C26.901 8.73557 26.4877 8.59651 25.837 8.37836L25.8192 8.37326ZM10.574 4.62771C12.3671 4.33434 14.1815 4.19096 15.9985 4.19906C18.2183 4.19906 20.0388 4.39425 21.4229 4.62771C22.9628 4.88796 23.2855 4.98491 23.6262 5.40336C23.9604 5.81414 23.9923 6.20452 23.9234 7.93313C23.8086 10.8137 23.4284 13.924 22.2522 16.2892C21.6704 17.4552 20.9101 18.4095 19.9214 19.0728C18.9378 19.7324 17.6684 20.1457 15.9985 20.1457C14.3285 20.1457 13.0604 19.7324 12.0768 19.0728C11.0868 18.4095 10.3265 17.4552 9.74602 16.2879C8.56851 13.924 8.18961 10.815 8.0748 7.93186C8.00591 6.20452 8.03652 5.81414 8.37204 5.40336C8.71139 4.98491 9.03416 4.88796 10.574 4.62771Z" fill="#FFD600" stroke="#FFD600" stroke-width="0.592592"/>
                              </svg>

                              <span className="">{submission.bounty.badCharactersReward} Bad Character</span>
                          </div>} 

                        {submission.bounty.bountyPointsReward && <div className={`shrink-0 flex items-center gap-1`}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6.17578L15.9583 11.9991L20.9062 8.11689L18.9271 17.8224H5.07292L3.09375 8.11689L8.04167 11.9991L12 6.17578Z" fill="#FFD600" stroke="#FFD600" stroke-width="1.82692" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.034 11.6818C17.7461 11.4483 16.3878 13.0107 15.8131 13.6669C15.2023 12.9977 13.5715 11.7241 13.3877 11.9737C13.2038 12.2233 14.5178 13.9977 14.8884 14.6594C14.6823 15.3017 13.8054 17.0123 14.025 17.1311C14.2446 17.2499 15.5253 15.9958 16.1215 15.4574C16.8205 15.7817 18.0422 16.3604 18.1573 16.158C18.2725 15.9556 17.1842 14.9449 16.636 14.3091C17.2733 13.3685 18.2422 11.8507 18.034 11.6818Z" fill="black" stroke="black" stroke-width="1.04866"/>
                              </svg>

                              <span className="">+ {submission.bounty.bountyPointsReward}</span>
                          </div>}
                          
                        {/* view submission */}
                        <Link href={submission.submission.contentLink} target="_blank" className="shrink-0 md:ml-auto flex items-center gap-1 hover:opacity-70 duration-200">
                          <span className="uppercase border-b border-b-[rgba(221,221,221,1)] text-[rgba(221,221,221,1)]">View submission</span>

                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_259_1183)">
                            <path d="M3.80848 14.7688L12.0467 6.53058L5.64726 6.53058L5.64726 4.51973L15.4797 4.51973V14.3522L13.4688 14.3522L13.4688 7.95269L5.23059 16.1909L3.80848 14.7688Z" fill="#DDDDDD"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_259_1183">
                            <rect width="20" height="20" fill="white"/>
                            </clipPath>
                            </defs>
                          </svg>
                        </Link>
                    </div>
                  })}

                </div>}

                {!Boolean(user.submittedBounties?.length) && <p className="text-[22px]">NO BOUNTIES SUBMITTED YET.</p>}

              </div>
            </AppLayout>
    </>
  );
}
