//@ts-nocheck
import { useState, Fragment } from "react";
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

import PillsBalance from "./PillsBalance";
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
import MenuRight from "./MenuRight";
import BountyCard from "./BountyCard";
import Link from "next/link";
import AppLayout from "./AppLayout";
import { useUser } from "@/contexts/UserProvider";
import getAllBounties from "@/fetchers/getAllBounties";

interface Bounty {
  title: string;
  description: string;
  endDate: Date;
  reward: number;
  id: string;
}

export default function BountyApp({}) {
  const themes = ["moon"];
  const [appTheme] = useState<any>(
    themes[Math.floor(Math.random() * themes.length)]
  );

  const {user} = useUser();

  const router = useRouter();
  const { publicKey } = useWallet();
  const [balancekey] = useState(Date.now());
  const [userBalance, setUserBalance] = useState<number>(0);
  const [pendingReferrals, setPendingReferrals] = useState(0);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [confirmedReferrals, setConfirmedReferrals] = useState(0);
  const [referralsUntilReward, setReferralsUntilReward] = useState(0);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [userPfp, setUserPfp] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [bluePills, setBluePills] = useState<number>(0);
  const [redPills, setRedPills] = useState<number>(0);
  const [goldPills, setGoldPills] = useState<number>(0);
  const [charachterNum, setCharachterNum] = useState<number>(0);
  const [products, setProducts] = useState<any[]>([]);

  const [bounties, setBounties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"active" | "past">("active");

  const fetchBounties = async () => {
    try {
      setIsLoading(true)
      const bounties = await getAllBounties(activeTab);

      console.log(bounties)

      setBounties(bounties);
    } catch (error) {
      console.error("Failed to fetch bounties", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    fetchBounties();
  }, [activeTab]);

  return (
    <>
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
      <Toaster position="bottom-center"></Toaster>

      <AppLayout>
        <div className="w-full flex items-start mb-5 gap-5 md:flex-col">
          <div className=" flex flex-col md:flex-row md:w-full gap-3 w-[300px]">
            <div className="rounded-[10px] border-2 border-[#FFD600] bg-[#FFD600] p-4 w-full">
              <div className="text-black uppercase text-sm font-semibold">
                Bounties completed
              </div>
              <div className="text-xl text-black akira mt-1">{user.submittedBounties?.length || 0}</div>
            </div>
            <div className="rounded-[10px] border-2 border-[#FFD600] bg-[#FFD600] p-4 w-full">
              <div className="text-black uppercase text-sm font-semibold">
                Bounty points
              </div>
              <div className="text-xl text-black akira mt-1">{user.points}</div>
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="rounded-[10px] border-2 border-[#FFD600] p-5 w-full">
              <div className="text-white uppercase text-3xl akira font-semibold h-[79px]">
                YOUR PRIZES
              </div>
              <div className="opacity-50 text-white text-center my-5 flex  w-full items-center justify-center">
                No available prizes.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center gap-4 my-10 text-3xl md:text-2xl sm:!text-xl">
          <div
            onClick={() => setActiveTab("active")}
            className={`akira cursor-pointer hover:opacity-80 ${
              activeTab === "active" ? "" : "text-black text-stroke-white"
            }`}
            style={
              activeTab !== "active" ? { WebkitTextStroke: "1px white" } : {}
            }
          >
            ACTIVE BOUNTIES {activeTab === "active" ? "*" : ""}
          </div>
          <div className="akira">/</div>
          <div
            onClick={() => setActiveTab("past")}
            className={`akira ${
              activeTab === "past"
                ? ""
                : "text-black text-stroke-white cursor-pointer hover:opacity-80"
            }`}
            style={
              activeTab !== "past" ? { WebkitTextStroke: "1px white" } : {}
            }
          >
            PAST {activeTab === "past" ? "*" : ""}
          </div>
        </div>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-1">
            {isLoading && [1,2].map(cardId => <div key={cardId} className="w-full h-[300px] bg-[#161616] rounded-[12px] animate-[pulse_1.2s_linear_infinite]"></div>)}

            {!isLoading && Boolean(bounties.length) && bounties.map((bounty: any, index) => (
              <BountyCard
                key={index}
                {...bounty}
              />
            ))}

            {!isLoading && !Boolean(bounties.length) && <div className="uppercase text-[30px] font-bold">No {activeTab} bounty found</div>}
          </div>
      </AppLayout>
    </>
  );
}
