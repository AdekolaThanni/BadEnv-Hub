//@ts-nocheck
import "@fortawesome/fontawesome-free/css/all.css";
import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";
import React, { FC, useEffect, useState } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import AppLayout from "@/components/AppLayout";
import { useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";
import axios from "axios";
import { PublicKey } from "@solana/web3.js";
import PillsBalance from "@/components/PillsBalance";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "@/components/ProductCard";
import NFTRoundedCard from "@/components/NFTRoundedCard";
import { useUser } from "@/contexts/UserProvider";
import Image from "@/components/ui/Image";

const Dashboard: FC = ({}: any) => {
  //@ts-ignore

  const {user, walletNFTs, isLoading, loadingPills, pills} = useUser();

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
  const [loadingData, setLoadingData] = React.useState()
  const [bluePills, setBluePills] = useState<number>(0);
  const [redPills, setRedPills] = useState<number>(0);
  const [goldPills, setGoldPills] = useState<number>(0);
  const [charachterNum, setCharachterNum] = useState<number>(0);
  const [products, setProducts] = useState<any[]>([]);

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
      getProducts();
    
    generateCouponCode();
  }, [publicKey]);

  useEffect(() => {
    if (couponCode) {
      getOrdersByCouponCode(couponCode);
    }
  }, [couponCode]);

  const [coupCode, setCoupCode] = useState("");

  const generateRandomCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setCoupCode(result);
  };

  useEffect(() => {
    if (publicKey) {
      generateCouponCode();
    }
  }, [publicKey]);

  const sliderContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [sliderWidth, setSliderWidth] = React.useState(0)

    React.useEffect(() => {
      const handleResize = () => {
        if (sliderContainerRef.current) {
          const newWidth = sliderContainerRef.current.getBoundingClientRect().width;

          // Do something with the new width
          setSliderWidth(newWidth);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

  return (
    <Main
      key="home"
      meta={<Meta title="BAD* Environment Hub" description="" />}
    >
      <AppLayout>
        {/* user profile summary */}
        <div className="bg-[#161616] flex items-start md:flex-col rounded-[10px] w-full">

          {/* user pfp */}
          <div className="self-center">
            <Image showAnimation={true} imageSrc={user.profile?.pfpUrl === "pfp.png" ? "/assets/images/pfp.png" : user.profile?.pfpUrl!} imageAlt="user pfp" width="320px" height="320px" className="rounded-[10px]"/>
          </div>

          {/* user detaiils */}
          <div className="p-10">
            <div className="text-[#A6A6A6] font-medium">WELCOME BACK</div>
            <div className="akira text-6xl">
              {
                isLoading ? <div className="bg-[#ffffff20] w-[300px] h-[30px] mt-2 rounded-full  animate-[pulse_1.2s_linear_infinite]"></div> : 
                  <>
                    {user.profile?.username || (publicKey && publicKey.toBase58().slice(0, 3) +
                        "..." +
                        publicKey.toBase58().slice(-3))}
                  </>
              }
            </div>
            <div>
              {
                loadingPills ? <div className="bg-[#ffffff20] w-[400px] h-[30px] mt-4 rounded-full  animate-[pulse_1.2s_linear_infinite]"></div> :  
                <PillsBalance
                  key={balancekey}
                  {...pills}
                  loadingData={loadingData}
                />
              }
            </div>
            <div className="flex items-center gap-4 w-full mt-10 flex-wrap overflow-y-scroll">
              {walletNFTs?.map((nft: any, i: any) => (
                <NFTRoundedCard
                  nft={nft}
                  key={nft.mintAddress}
                  index={i}
                  onCardClick={() => null}
                />
              ))}
              <div>
                <img
                  className="w-16 h-16 cursor-pointer hover:opacity-80"
                  src="/assets/images/add-pfp.png"
                />
              </div>
            </div>
          </div>
        </div>


        {/* reveal code */}
        <div className="mt-10 w-full flex md:flex-col justify-between border-4 border-[#FD7126] rounded-[10px]">
          <div className=" p-8 w-[400px]">
            <div className="akira text-3xl">
              <b className="text-[#FFD600] "> 15%</b> discount for a lifetime
            </div>
            <div className="flex items-center gap-2 mt-10">
              {coupCode ? (
                <>
                  {coupCode.split("").map((letter, index) => (
                    <div
                      key={index}
                      className="border-b-2  uppercase font-bold akira pb-2 w-[30px] flex items-center justify-center"
                    >
                      {letter}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div
                      key={index}
                      className="border-b-2 uppercase font-bold akira pb-2 w-[30px] flex items-center justify-center"
                    >
                      <svg
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.04883 17.5625L1.91602 13.8535L6.32812 9.75781L0.351562 9.05469L2.30273 3.02539L7.55859 5.97852L6.38086 0.0722656H12.7266L11.5312 5.97852L16.7871 3.02539L18.7559 9.03711L12.7617 9.75781L17.209 13.8359L12.0762 17.5625L9.54492 12.0957L7.04883 17.5625Z"
                          fill="#4C4C4C"
                        />
                      </svg>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div>
              <button
                onClick={() => generateRandomCode()}
                className="bg-[#FFD600] cursor-pointer hover:opacity-80 py-3 px-6 akira text-black rounded-[4px] mt-10"
              >
                REVEAL CODE
              </button>
            </div>
            <div className="mt-10 cursor-pointer hover:opacity-80">
              <svg
                width="137"
                height="20"
                viewBox="0 0 137 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9432 7.64773H9.17045C9.10227 7.26894 8.97538 6.93561 8.78977 6.64773C8.60417 6.35985 8.37689 6.11553 8.10795 5.91477C7.83902 5.71401 7.53788 5.5625 7.20455 5.46023C6.875 5.35795 6.52462 5.30682 6.15341 5.30682C5.48295 5.30682 4.88258 5.47538 4.35227 5.8125C3.82576 6.14962 3.40909 6.64394 3.10227 7.29545C2.79924 7.94697 2.64773 8.74242 2.64773 9.68182C2.64773 10.6288 2.79924 11.428 3.10227 12.0795C3.40909 12.7311 3.82765 13.2235 4.35795 13.5568C4.88826 13.8902 5.48485 14.0568 6.14773 14.0568C6.51515 14.0568 6.86364 14.0076 7.19318 13.9091C7.52652 13.8068 7.82765 13.6572 8.09659 13.4602C8.36553 13.2633 8.5928 13.0227 8.77841 12.7386C8.9678 12.4508 9.09848 12.1212 9.17045 11.75L10.9432 11.7557C10.8485 12.3277 10.6648 12.8542 10.392 13.3352C10.1231 13.8125 9.77652 14.2254 9.35227 14.5739C8.93182 14.9186 8.45076 15.1856 7.90909 15.375C7.36742 15.5644 6.77652 15.6591 6.13636 15.6591C5.12879 15.6591 4.23106 15.4205 3.44318 14.9432C2.6553 14.4621 2.03409 13.7746 1.57955 12.8807C1.12879 11.9867 0.903409 10.9205 0.903409 9.68182C0.903409 8.43939 1.13068 7.37311 1.58523 6.48295C2.03977 5.58901 2.66098 4.90341 3.44886 4.42614C4.23674 3.94508 5.13258 3.70455 6.13636 3.70455C6.75379 3.70455 7.32955 3.79356 7.86364 3.97159C8.40152 4.14583 8.88447 4.40341 9.3125 4.74432C9.74053 5.08144 10.0947 5.49432 10.375 5.98295C10.6553 6.4678 10.8447 7.02273 10.9432 7.64773ZM13.044 15.5V3.86364H14.7997V8.92045H20.6009V3.86364H22.3622V15.5H20.6009V10.4261H14.7997V15.5H13.044ZM24.919 15.5V3.86364H32.2145V5.375H26.6747V8.92045H31.8338V10.4261H26.6747V13.9886H32.2827V15.5H24.919ZM44.2244 7.64773H42.4517C42.3835 7.26894 42.2566 6.93561 42.071 6.64773C41.8854 6.35985 41.6581 6.11553 41.3892 5.91477C41.1203 5.71401 40.8191 5.5625 40.4858 5.46023C40.1563 5.35795 39.8059 5.30682 39.4347 5.30682C38.7642 5.30682 38.1638 5.47538 37.6335 5.8125C37.107 6.14962 36.6903 6.64394 36.3835 7.29545C36.0805 7.94697 35.929 8.74242 35.929 9.68182C35.929 10.6288 36.0805 11.428 36.3835 12.0795C36.6903 12.7311 37.1089 13.2235 37.6392 13.5568C38.1695 13.8902 38.7661 14.0568 39.429 14.0568C39.7964 14.0568 40.1449 14.0076 40.4744 13.9091C40.8078 13.8068 41.1089 13.6572 41.3778 13.4602C41.6468 13.2633 41.8741 13.0227 42.0597 12.7386C42.2491 12.4508 42.3797 12.1212 42.4517 11.75L44.2244 11.7557C44.1297 12.3277 43.946 12.8542 43.6733 13.3352C43.4044 13.8125 43.0578 14.2254 42.6335 14.5739C42.2131 14.9186 41.732 15.1856 41.1903 15.375C40.6487 15.5644 40.0578 15.6591 39.4176 15.6591C38.41 15.6591 37.5123 15.4205 36.7244 14.9432C35.9366 14.4621 35.3153 13.7746 34.8608 12.8807C34.41 11.9867 34.1847 10.9205 34.1847 9.68182C34.1847 8.43939 34.4119 7.37311 34.8665 6.48295C35.321 5.58901 35.9422 4.90341 36.7301 4.42614C37.518 3.94508 38.4138 3.70455 39.4176 3.70455C40.035 3.70455 40.6108 3.79356 41.1449 3.97159C41.6828 4.14583 42.1657 4.40341 42.5938 4.74432C43.0218 5.08144 43.3759 5.49432 43.6562 5.98295C43.9366 6.4678 44.1259 7.02273 44.2244 7.64773ZM46.3253 15.5V3.86364H48.081V9.42045H48.223L53.1037 3.86364H55.3139L50.6207 9.10227L55.331 15.5H53.2173L49.456 10.3011L48.081 11.8807V15.5H46.3253ZM64.9517 15.5H61.1847V3.86364H65.071C66.2112 3.86364 67.1903 4.09659 68.0085 4.5625C68.8267 5.02462 69.4536 5.68939 69.8892 6.55682C70.3286 7.42045 70.5483 8.45644 70.5483 9.66477C70.5483 10.8769 70.3267 11.9186 69.8835 12.7898C69.4441 13.661 68.8078 14.3314 67.9744 14.8011C67.1411 15.267 66.1335 15.5 64.9517 15.5ZM62.9403 13.9659H64.8551C65.7415 13.9659 66.4782 13.7992 67.0653 13.4659C67.6525 13.1288 68.0919 12.642 68.3835 12.0057C68.6752 11.3655 68.821 10.5852 68.821 9.66477C68.821 8.75189 68.6752 7.97727 68.3835 7.34091C68.0956 6.70455 67.6657 6.22159 67.0938 5.89205C66.5218 5.5625 65.8116 5.39773 64.9631 5.39773H62.9403V13.9659ZM72.7315 15.5V3.86364H76.8793C77.7808 3.86364 78.5289 4.01894 79.1236 4.32955C79.7221 4.64015 80.169 5.07008 80.4645 5.61932C80.7599 6.16477 80.9077 6.79545 80.9077 7.51136C80.9077 8.22348 80.758 8.85038 80.4588 9.39205C80.1634 9.92992 79.7164 10.3485 79.1179 10.6477C78.5232 10.947 77.7751 11.0966 76.8736 11.0966H73.7315V9.58523H76.7145C77.2827 9.58523 77.7448 9.50379 78.1009 9.34091C78.4607 9.17803 78.724 8.94129 78.8906 8.63068C79.0573 8.32008 79.1406 7.94697 79.1406 7.51136C79.1406 7.07197 79.0554 6.69129 78.8849 6.36932C78.7183 6.04735 78.455 5.80114 78.0952 5.63068C77.7391 5.45644 77.2713 5.36932 76.6918 5.36932H74.4872V15.5H72.7315ZM78.4759 10.25L81.3509 15.5H79.3509L76.5327 10.25H78.4759ZM93.152 9.68182C93.152 10.9242 92.9247 11.9924 92.4702 12.8864C92.0156 13.7765 91.3925 14.4621 90.6009 14.9432C89.813 15.4205 88.9171 15.6591 87.9134 15.6591C86.9058 15.6591 86.0062 15.4205 85.2145 14.9432C84.4266 14.4621 83.8054 13.7746 83.3509 12.8807C82.8963 11.9867 82.669 10.9205 82.669 9.68182C82.669 8.43939 82.8963 7.37311 83.3509 6.48295C83.8054 5.58901 84.4266 4.90341 85.2145 4.42614C86.0062 3.94508 86.9058 3.70455 87.9134 3.70455C88.9171 3.70455 89.813 3.94508 90.6009 4.42614C91.3925 4.90341 92.0156 5.58901 92.4702 6.48295C92.9247 7.37311 93.152 8.43939 93.152 9.68182ZM91.4134 9.68182C91.4134 8.73485 91.2599 7.9375 90.9531 7.28977C90.6501 6.63826 90.2334 6.14583 89.7031 5.8125C89.1766 5.47538 88.58 5.30682 87.9134 5.30682C87.2429 5.30682 86.6444 5.47538 86.1179 5.8125C85.5914 6.14583 85.1747 6.63826 84.8679 7.28977C84.5649 7.9375 84.4134 8.73485 84.4134 9.68182C84.4134 10.6288 84.5649 11.428 84.8679 12.0795C85.1747 12.7273 85.5914 13.2197 86.1179 13.5568C86.6444 13.8902 87.2429 14.0568 87.9134 14.0568C88.58 14.0568 89.1766 13.8902 89.7031 13.5568C90.2334 13.2197 90.6501 12.7273 90.9531 12.0795C91.2599 11.428 91.4134 10.6288 91.4134 9.68182ZM95.3409 15.5V3.86364H99.4886C100.394 3.86364 101.144 4.02841 101.739 4.35795C102.333 4.6875 102.778 5.13826 103.074 5.71023C103.369 6.27841 103.517 6.91856 103.517 7.63068C103.517 8.34659 103.367 8.99053 103.068 9.5625C102.773 10.1307 102.326 10.5814 101.727 10.9148C101.133 11.2443 100.384 11.4091 99.483 11.4091H96.6307V9.92045H99.3239C99.8958 9.92045 100.36 9.82197 100.716 9.625C101.072 9.42424 101.333 9.15152 101.5 8.80682C101.667 8.46212 101.75 8.07008 101.75 7.63068C101.75 7.19129 101.667 6.80114 101.5 6.46023C101.333 6.11932 101.07 5.85227 100.71 5.65909C100.354 5.46591 99.8845 5.36932 99.3011 5.36932H97.0966V15.5H95.3409ZM111.922 6.92045C111.861 6.38258 111.611 5.96591 111.172 5.67045C110.732 5.37121 110.179 5.22159 109.513 5.22159C109.036 5.22159 108.623 5.29735 108.274 5.44886C107.926 5.59659 107.655 5.80114 107.462 6.0625C107.272 6.32008 107.178 6.61364 107.178 6.94318C107.178 7.2197 107.242 7.45833 107.371 7.65909C107.503 7.85985 107.676 8.02841 107.888 8.16477C108.104 8.29735 108.335 8.40909 108.581 8.5C108.827 8.58712 109.064 8.65909 109.291 8.71591L110.428 9.01136C110.799 9.10227 111.179 9.22538 111.57 9.38068C111.96 9.53598 112.321 9.74053 112.655 9.99432C112.988 10.2481 113.257 10.5625 113.462 10.9375C113.67 11.3125 113.774 11.7614 113.774 12.2841C113.774 12.9432 113.604 13.5284 113.263 14.0398C112.926 14.5511 112.435 14.9545 111.791 15.25C111.151 15.5455 110.376 15.6932 109.467 15.6932C108.596 15.6932 107.842 15.5549 107.206 15.2784C106.57 15.0019 106.071 14.6098 105.712 14.1023C105.352 13.5909 105.153 12.9848 105.115 12.2841H106.876C106.911 12.7045 107.047 13.0549 107.286 13.3352C107.528 13.6117 107.837 13.8182 108.212 13.9545C108.59 14.0871 109.005 14.1534 109.456 14.1534C109.952 14.1534 110.393 14.0758 110.78 13.9205C111.17 13.7614 111.477 13.5417 111.7 13.2614C111.924 12.9773 112.036 12.6458 112.036 12.267C112.036 11.9223 111.937 11.6402 111.74 11.4205C111.547 11.2008 111.284 11.0189 110.95 10.875C110.621 10.7311 110.248 10.6042 109.831 10.4943L108.456 10.1193C107.524 9.86553 106.786 9.49242 106.24 9C105.698 8.50758 105.428 7.85606 105.428 7.04545C105.428 6.375 105.609 5.78977 105.973 5.28977C106.337 4.78977 106.829 4.40151 107.45 4.125C108.071 3.8447 108.772 3.70455 109.553 3.70455C110.34 3.70455 111.036 3.8428 111.638 4.11932C112.244 4.39583 112.721 4.77652 113.07 5.26136C113.418 5.74242 113.6 6.29545 113.615 6.92045H111.922Z"
                  fill="#DDDDDD"
                />
                <path
                  d="M0 18.6818H114.592V19.7727H0V18.6818Z"
                  fill="#DDDDDD"
                />
                <g clip-path="url(#clip0_232_2634)">
                  <path
                    d="M120.809 14.769L129.047 6.53077L122.648 6.53077L122.648 4.51991L132.48 4.51991V14.3523L130.469 14.3523L130.469 7.95287L122.231 16.1911L120.809 14.769Z"
                    fill="#DDDDDD"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_232_2634">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(117)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-center flex-grow h-[352px]">
            <img src="/assets/images/merch.png" className="h-full w-full object-cover"/>
          </div>
        </div>

        {/* referral program */}
        <div className="w-full mt-10">
          <h1 className="akira text-4xl">referral program</h1>
          <p className="mt-2 font-medium max-w-[350px]">
            Refer friends to and get 10% cashback on their purchases. Your
            referrals get a 10% discount on their orders.
          </p>
          <div className="mt-5 flex items-start xl:flex-col w-full gap-4 justify-between">
      
            <div className="flex items-stretch sm:flex-col gap-4 w-full flex-1">
              <div className="bg-[#FFD600] h-[200px] p-4 w-full rounded-[10px]">
                <div className="uppercase text-black font-medium">
                  Your Affiliate Code
                </div>
                <div className="">
                  {loadingData ? (
                    <div className="flex items-start justify-center w-full">
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
                          <div className="flex flex-col  gap-2">
                            <div className="akira text-3xl text-[#161616] mt-3">
                              {" "}
                              {couponCode}
                            </div>
                            <div className="mt-5">
                              {couponCode && (
                                <div
                                  onClick={() => copyToClipboard(couponCode)}
                                  className="bg-[#161616]  akira flex items-center justify-center text-lg gap-2 rounded-[10px] text-white w-[250px] p-2 cursor-pointer hover:opacity-75"
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M21 8.94073C20.9896 8.84887 20.9695 8.75836 20.94 8.67073V8.58073C20.8919 8.47791 20.8278 8.3834 20.75 8.30073L14.75 2.30073C14.6673 2.22295 14.5728 2.15881 14.47 2.11073C14.4402 2.10649 14.4099 2.10649 14.38 2.11073C14.2784 2.05247 14.1662 2.01508 14.05 2.00073H10C9.20435 2.00073 8.44129 2.3168 7.87868 2.87941C7.31607 3.44202 7 4.20508 7 5.00073V6.00073H6C5.20435 6.00073 4.44129 6.3168 3.87868 6.87941C3.31607 7.44202 3 8.20508 3 9.00073V19.0007C3 19.7964 3.31607 20.5594 3.87868 21.1221C4.44129 21.6847 5.20435 22.0007 6 22.0007H14C14.7956 22.0007 15.5587 21.6847 16.1213 21.1221C16.6839 20.5594 17 19.7964 17 19.0007V18.0007H18C18.7956 18.0007 19.5587 17.6847 20.1213 17.1221C20.6839 16.5594 21 15.7964 21 15.0007V9.00073V8.94073ZM15 5.41073L17.59 8.00073H16C15.7348 8.00073 15.4804 7.89538 15.2929 7.70784C15.1054 7.5203 15 7.26595 15 7.00073V5.41073ZM15 19.0007C15 19.2659 14.8946 19.5203 14.7071 19.7078C14.5196 19.8954 14.2652 20.0007 14 20.0007H6C5.73478 20.0007 5.48043 19.8954 5.29289 19.7078C5.10536 19.5203 5 19.2659 5 19.0007V9.00073C5 8.73552 5.10536 8.48116 5.29289 8.29363C5.48043 8.10609 5.73478 8.00073 6 8.00073H7V15.0007C7 15.7964 7.31607 16.5594 7.87868 17.1221C8.44129 17.6847 9.20435 18.0007 10 18.0007H15V19.0007ZM19 15.0007C19 15.2659 18.8946 15.5203 18.7071 15.7078C18.5196 15.8954 18.2652 16.0007 18 16.0007H10C9.73478 16.0007 9.48043 15.8954 9.29289 15.7078C9.10536 15.5203 9 15.2659 9 15.0007V5.00073C9 4.73552 9.10536 4.48116 9.29289 4.29363C9.48043 4.10609 9.73478 4.00073 10 4.00073H13V7.00073C13 7.79638 13.3161 8.55944 13.8787 9.12205C14.4413 9.68466 15.2044 10.0007 16 10.0007H19V15.0007Z"
                                      fill="white"
                                    />
                                  </svg>
                                  COPY CODE
                                </div>
                              )}
                            </div>
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

              <div className="w-full flex flex-col sm:flex-row gap-3">
                <div className="rounded-[10px] border-2 border-[#FFD600] p-4 w-full">
                  <div className="text-[#DDDDDD] uppercase text-lg font-semibold">
                    total earned
                  </div>
                  <div className="text-xl text-white akira mt-1">0$ </div>
                </div>
                <div className="rounded-[10px] border-2 border-[#FFD600] p-4 w-full">
                  <div className="text-[#DDDDDD] uppercase text-lg font-semibold">
                    Referrals
                  </div>
                  <div className="text-xl text-white akira mt-1">
                    {confirmedReferrals}
                  </div>
                </div>
              </div>
            </div>

            {/* current balance */}
            <div className="w-full flex-1 items-start justify-start">
              <div className="rounded-[10px] border-2 border-[#FFD600] p-5 w-full">
                <div className="w-full flex items-center justify-between">
                  <div>
                    <div className="text-[#DDDDDD] uppercase text-lg font-semibold">
                      Current balance
                    </div>
                    <div className="text-2xl text-white akira mt-2">20$</div>
                  </div>
                  <div className="flex flex-col">
                    <button className="border-2 float-right mb-2 block border-white px-6 py-2 rounded-[10px] opacity-50 cursor-not-allowed font-bold">
                      WITHDRAW
                    </button>
                    <div className=" w-full">200$ until withdrawal</div>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="text-right font-bold">10/500</div>
                  <div className=" bg-[#272727]  w-full h-6 relative">
                    <div className="bg-[#3CFB69] h-6 absolute w-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* share affiliate links */}
        <div ref={sliderContainerRef} className="mt-10 flex flex-col pb-32 relative">
          <h1 className="akira text-4xl">
            Share* affiliate links with <b className="text-[#FFD600]">10%</b>{" "}
            discount
          </h1>
          <div  className="absolute top-[100px] sm:top-[180px] left-0 flex items-center pb-5 overflow-hidden" style={{width: (sliderWidth || sliderContainerRef.current?.getBoundingClientRect().width) + "px"}}>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              loop={true}
              modules={[Pagination, Navigation]}
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
                1400: {
                  slidesPerView: 3,
                  spaceBetween: 20
                }
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
        </div>
      </AppLayout>
    </Main>
  );
};

export default Dashboard;
