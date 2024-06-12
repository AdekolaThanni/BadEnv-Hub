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
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BurnApp({}) {
  const themes = ["moon"];
  const [appTheme] = useState<any>(
    themes[Math.floor(Math.random() * themes.length)]
  );
  const router = useRouter();
  const { publicKey } = useWallet();
  const [balancekey] = useState(Date.now());
  const [userBalance, setUserBalance] = useState<number>(0);
  const [pendingReferrals, setPendingReferrals] = useState(0);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [confirmedReferrals, setConfirmedReferrals] = useState(0);
  const [referralsUntilReward, setReferralsUntilReward] = useState(0);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [userPfp, setUserPfp] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [bluePills, setBluePills] = useState<number>(0);
  const [redPills, setRedPills] = useState<number>(0);
  const [goldPills, setGoldPills] = useState<number>(0);
  const [charachterNum, setCharachterNum] = useState<number>(0);
  const [products, setProducts] = useState<any[]>([]);
  const [userPoints, setUserPoints] = useState<number>(0);

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

    setCouponCode(data.code);
    setUserPfp(data.user.pfpUrl);
    setUserPoints(data.user.points);
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
                          href="/"
                          target="_blank"
                          className="flex items-center w-full gap-2 p-3 text-lg rounded-md shadow-md cursor-pointer hover:opacity-70 hover:shadow-xs"
                        >
                          <HomeIcon className="w-5 h-5" />
                          Home Page
                        </a>
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

      <div
        className="relative block w-full min-h-screen overflow-y-scroll bg-top bg-cover"
        style={{}}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 z-0 object-cover w-full h-full"
        >
          <source src="/black.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative flex flex-col w-full h-screen p-2 py-2 mx-auto lg:p-0">
          <div className="container flex flex-col items-center justify-between py-10 pb-0 mx-auto lg:flex-row">
            <div className="flex-1">
              {publicKey && (
                <IoMdMenu
                  className="cursor-pointer hover:opacity-70"
                  color="white"
                  onClick={() => setOpenMenu(true)}
                  size={40}
                />
              )}
            </div>
            <div className="flex flex-col-reverse items-center gap-2 lg:flex-row">
              {publicKey && (
                <>
                  <div className="home-b">
                    <WalletMultiButton
                      className={` ${appTheme === "sky" ? "wallet-sky" : ""} ${
                        appTheme === "white" ? "wallet-white" : ""
                      }`}
                    ></WalletMultiButton>
                  </div>

d
                  <button
                    onClick={handleClaim}
                    className="px-6 py-3 bg-[#00FF57] text-black rounded-full font-bold cursor-pointer hover:opacity-80"
                  >
                    CLAIM ({Number(userBalance).toFixed(2)}$)
                  </button>
                  <div>
                    <button
                      onClick={handleClaim}
                      className="px-6 py-3 bg-[#ff7300] text-black rounded-full font-bold cursor-pointer hover:opacity-80"
                    >
                      {Number(userPoints).toFixed(2)} POINTS
                    </button>
                  </div>
                  <Link href={"/user/" + publicKey}>
                    <img
                      src={
                        userPfp === "pfp.png"
                          ? "/assets/images/pfp.png"
                          : userPfp!
                      }
                      className="w-14 border-2 cursor-pointer hover:opacity-80 border-red-500 rounded-full"
                    />
                  </Link>
                </>
              )}
            </div>
          </div>

          {publicKey ? (
            <>
              <div className="container flex flex-col items-center justify-end w-full mx-auto text-white">
                <a href="/">
                  <img
                    src="/assets/images/gif-logo.gif"
                    className="w-20 mb-2"
                  />
                </a>
                <div className="bg-[#D9D9D9] flex-col w-full lg:w-[500px] font-bold text-black text-xl text-center rounded-2xl py-2 p-5 mb-5">
                  <div>Your Affiliate Code:</div>
                  <div className="text-[#FF3A98] text-3xl">
                    {loadingData ? (
                      <div className="flex items-center justify-center w-full">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {bluePills > 0 ||
                        redPills > 0 ||
                        goldPills > 0 ||
                        charachterNum > 0 ? (
                          <>
                            <div className="flex items-center justify-center gap-2">
                              {couponCode}
                              {couponCode && (
                                <div
                                  onClick={() => copyToClipboard(couponCode)}
                                  className="bg-[#57B0FF] text-white rounded-lg p-2 cursor-pointer hover:opacity-75"
                                >
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
                                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="p-4 mt-2 rounded-md bg-red-50">
                            <div className="flex">
                              <div className="flex-shrink-0"></div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">
                                  You are not eligible for a discount.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-stretch justify-between w-full gap-5 px-5 mx-auto text-white lg:flex-row lg:px-10 ">
                <div className="hidden xl:block xl:w-[300px]">
                  <div className="flex flex-col items-center justify-center w-full ">
                    <img
                      src="/assets/images/pfpleft.png"
                      className="w-full px-5"
                    />
                    <div className="bg-[#FF1313] w-full mt-10 p-10 rounded-3xl">
                      <img src="/assets/images/text.png" className="w-full" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-full mx-auto mt-5">
                  <div className="relative w-full p-5 text-white rounded-3xl bg-white/20">
                    <div className="max-w-full xl:max-w-[800px] items-center justify-center pb-5 overflow-hidden">
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        pagination={{
                          clickable: true,
                        }}
                        loop={true}
                        modules={[Pagination]}
                        className="mySwiper"
                        breakpoints={{
                          640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                          },
                          768: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                          },
                          1024: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                          },
                        }}
                      >
                        {products?.map((product) => (
                          <SwiperSlide>
                            <ProductCard
                              key={product.id}
                              title={product.title}
                              imageSrc={product.image.src}
                              description={product.body_html}
                              handle={product.handle}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <div className="w-[300px] mx-auto my-10 absolute left-10 -bottom-14 ">
                      <PillsBalance
                        key={balancekey}
                        bluePills={bluePills}
                        redPills={redPills}
                        goldPills={goldPills}
                        loadingData={loadingData}
                        charachterNum={charachterNum}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between w-full gap-2 mt-10 lg:gap-10 lg:flex-row">
                    <div className="bg-[#D9D9D9] w-full flex-1 flex items-center justify-start flex-col text-black p-5 rounded-3xl">
                      <b className="text-2xl">{confirmedReferrals}</b>
                      <p className="text-xl font-bold">Confirmed Referral(s)</p>
                    </div>
                    <div className="bg-[#D9D9D9]  w-full flex-1 flex items-center justify-start flex-col text-black p-5 rounded-3xl">
                      <b className="text-2xl">{pendingReferrals}</b>
                      <p className="text-xl font-bold">Pending Referral (s)</p>
                    </div>
                    <div className="bg-[#00FF57]  w-full flex-1 flex items-center justify-start flex-col text-black p-5 rounded-3xl">
                      <b className="text-2xl">{Number(500 - userBalance)}$</b>
                      <p className="text-xl font-bold">
                        Remaining Until Reward
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full hidden xl:w-[300px]  xl:block flex-shrink h-fit">
                  <div className="w-full bg-[#D9D9D9] p-5 text-black mt-5 rounded-3xl">
                    <MenuRight />
                  </div>
                </div>

                <div className="w-full  xl:w-[300px] block  lg:hidden flex-shrink h-fit">
                  <div className="w-full bg-[#D9D9D9]  p-2 lg:p-5 text-black mt-5 rounded-3xl">
                    <MenuRight />
                  </div>
                </div>
                <div className="block lg:hidden">
                  <div className=" xl:w-[300px]">
                    <div className="flex flex-col items-center justify-center w-full ">
                      <img
                        src="/assets/images/pfpleft.png"
                        className="w-full px-5"
                      />
                      <div className="bg-[#FF1313] w-full mt-10 p-10 rounded-3xl">
                        <img src="/assets/images/text.png" className="w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="relative flex flex-col items-center justify-center flex-1">
                <img src="/assets/images/gif-logo.gif" className="w-40 mb-2" />
                <div className="home-b">
                  <WalletMultiButton
                    className={` ${appTheme === "sky" ? "wallet-sky" : ""} ${
                      appTheme === "white" ? "wallet-white" : "mt-10"
                    }`}
                  ></WalletMultiButton>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
