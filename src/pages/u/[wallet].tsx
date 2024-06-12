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

export default function BountyApp({}) {
  const themes = ["moon"];
  const [appTheme] = useState<any>(
    themes[Math.floor(Math.random() * themes.length)]
  );

  const router = useRouter();
  const { wallet } = router.query;
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
  const [username, setUsername] = useState<string>("");
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [bluePills, setBluePills] = useState<number>(0);
  const [redPills, setRedPills] = useState<number>(0);
  const [goldPills, setGoldPills] = useState<number>(0);
  const [charachterNum, setCharachterNum] = useState<number>(0);
  const [products, setProducts] = useState<any[]>([]);
  const [openEditPfp, setOpenEditPfp] = useState<boolean>(false);
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);

  const [walletNFTs, setWalletNFTs] = useState<any[]>([]); // [ { name: string, image: string, price: number, id: string }
  const [bounties, setBounties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const response = await axios.get("/api/get-bounties");
        console.log(response.data);
        setBounties(response.data.bounties);
      } catch (error) {
        console.error("Failed to fetch bounties", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBounties();
  }, []);

  const getPills = (pubKey: PublicKey) => {
    setLoadingData(true);
    axios
      .get(`/api/getPillsBalance`, {
        params: {
          wallet: pubKey.toBase58(),
        },
      })
      .then((response) => {
        setBluePills(response.data["Blue Pill"]);
        setRedPills(response.data["Red Pill"]);
        setGoldPills(response.data["Gold Pill"]);
        setCharachterNum(response.data["Character"]);
        setLoadingData(false);
      })
      .catch(() => {
        setLoadingData(false);
      });
  };

  const getNfts = (pubKey: PublicKey) => {
    setLoadingData(true);
    axios
      .get(`/api/getNfts`, {
        params: {
          wallet: pubKey.toBase58(),
        },
      })
      .then((response) => {
        setWalletNFTs(response.data.nfts);
        setLoadingData(false);
      })
      .catch(() => {
        setLoadingData(false);
      });
  };

  useEffect(() => {
    if (publicKey) {
      getNfts(publicKey);
    }
  }, [publicKey]);

  const getDiscountPercentage = (pillType: string) => {
    switch (pillType) {
      case "blue":
        return 5;
      case "red":
        return 7.5;
      case "gold":
        return 10;
      case "character":
        return 15;
      default:
        return 0;
    }
  };

  let discountMax = "nothing";

  if (charachterNum > 0) {
    discountMax = "character";
  } else if (goldPills > 0) {
    discountMax = "gold";
  } else if (bluePills > 0 || (bluePills > 0 && redPills > 0)) {
    discountMax = "blue";
  } else if (redPills > 0) {
    discountMax = "red";
  }

  const generateCouponCode = async () => {
    const generatedCode = Math.random().toString(36).substr(2, 9).toUpperCase();

    const response = await fetch("/api/createCoupon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        couponCode: generatedCode,
        discount: 10,
        walletAddress: publicKey?.toBase58(),
      }),
    });

    const data = await response.json();

    if (!data.success) {
      // Handle error
      console.error(data.message);
    }

    setUserPoints(data.user.points);
    setUsername(data.user.username);
    setUserPfp(data.user.pfpUrl);
    setCouponCode(data.code);
    setCountdown(20);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Coupon code copied to clipboard!");
        toast.success("Coupon code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const handleInputChange = (event: any) => {
    setUsername(event.target.value);
  };

  // Function to handle save action
  const saveUsername = async () => {
    try {
      const response = await axios.post("/api/update-username", {
        walletAddress: wallet,
        newUsername: username,
      });
      console.log("Response:", response.data);
      setIsEditingUsername(false); // Turn off editing mode after save
      toast.success("Username saved successfully!");
    } catch (error) {
      console.error("Error saving username:", error);
      // Handle error accordingly
    }
  };

  const savePfp = async (mintAddress: string, newurl: string) => {
    try {
      const response = await axios.post("/api/update-pfp", {
        walletAddress: wallet,
        newPfpUrl: newurl,
      });

      setUserPfp(newurl);
      setOpenEditPfp(false);
      toast.success("Pfp saved successfully!");
    } catch (error) {
      console.error("Error saving username:", error);
      // Handle error accordingly
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetch("/api/getProducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setProducts(data.data.products);
        console.log("Products fetched successfully:", data.data.products);
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      // Handle fetch error
      console.error("There was an error fetching the products:", error);
    }
  };

  const getOrdersByCouponCode = async (couponCode: any) => {
    try {
      const response = await fetch(`/api/getOrders?couponCode=${couponCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setPendingReferrals(data.data.pendingReferrals);
        setConfirmedReferrals(data.data.confirmedReferrals);
        setUserBalance(data.data.totalBalance);
        console.log("Orders fetched successfully:", data.data);
      } else {
        console.error("Failed to fetch orders:", data.message);
      }
    } catch (error) {
      // Handle fetch error
      console.error("There was an error fetching the orders:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerId]);

  const handleClaim = async () => {
    toast.error("Withdrawals are not available yet!");
  };

  useEffect(() => {
    if (publicKey) {
      getPills(publicKey);
      getProducts();
    }
    generateCouponCode();
  }, [publicKey]);

  useEffect(() => {
    if (couponCode) {
      getOrdersByCouponCode(couponCode);
    }
  }, [couponCode]);

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
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-white"
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
                              onCardClick={savePfp}
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

      <AppLayout>
        <div className="px-20">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={
                  userPfp === "pfp.png" ? "/assets/images/pfp.png" : userPfp!
                }
                className="w-20 mb-4  cursor-pointer hover:opacity-80 rounded-xl"
              />
              <div
                onClick={() => setOpenEditPfp(true)}
                className="bg-[#FCDB00] text-black shadow-lg p-2 cursor-pointer hover:opacity-75 absolute bottom-2 right-0 rounded-xl"
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
              </div>
            </div>
            <div className="flex  items-start flex-col gap-2">
              <div className="text-[#fff] text-xl">
                {isEditingUsername ? (
                  <>
                    <div className="flex items-center gap-2">
                      <input
                        className="w-full  text-sm px-2 py-2 rounded-md text-white"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={handleInputChange}
                      />
                      <button
                        onClick={saveUsername}
                        className="bg-[#FCDB00] text-black px-2 py-2 rounded-lg cursor-pointer hover:opacity-80  text-sm"
                      >
                        SAVE
                      </button>
                    </div>
                  </>
                ) : (
                  <>{username ? username : publicKey?.toBase58()}</>
                )}
              </div>
              {couponCode && (
                <div
                  onClick={() => setIsEditingUsername(true)}
                  className="bg-[#FCDB00] text-black uppercase text-sm rounded-lg p-2 cursor-pointer hover:opacity-75"
                >
                  Edit PROFILE
                </div>
              )}
            </div>
          </div>
          <div className="mt-2">ABOUT</div>
          <div className="mt-20 flex items-start gap-5">
            <div className="border border-white rounded-xl p-5">
              <div className="text-sm">BOUNTY POINTS</div>
              <div className="text-[#FFD400] text-4xl">100</div>
            </div>
            <div className="border border-white rounded-xl p-5">
              <div className="text-sm">REFERRAL SALES</div>
              <div className="text-[#FFD400] text-4xl">0</div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
