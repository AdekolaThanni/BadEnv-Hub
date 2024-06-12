import { useUser } from "@/contexts/UserProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Image from "./ui/Image";
import USDBalance from "./ui/USDBalance";
import PointsBalance from "./ui/PointsBalance";
import { signOut } from "next-auth/react";

interface AppLayoutProps {
  children: React.ReactNode;
  hideSidebar?: boolean
}

const HomeIcon = ({ fill = "#6C6C6C" }) => (
  <svg
    width="14"
    height="16"
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.333496 15.5V5.5L7.00016 0.5L13.6668 5.5V15.5H8.66683V9.66667H5.3335V15.5H0.333496Z"
      fill={fill}
    />
  </svg>
);

const BountiesIcon = ({ fill = "#6C6C6C" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.3332 6.80168V6.86251C18.3332 7.57918 18.3332 7.93835 18.1607 8.23168C17.9882 8.52501 17.674 8.69918 17.0473 9.04835L16.3865 9.41501C16.8415 7.87501 16.994 6.22001 17.0498 4.80501L17.0582 4.62085L17.0598 4.57751C17.6023 4.76585 17.9073 4.90668 18.0973 5.17001C18.3332 5.49751 18.3332 5.93251 18.3332 6.80168ZM1.6665 6.80168V6.86251C1.6665 7.57918 1.6665 7.93835 1.839 8.23168C2.0115 8.52501 2.32567 8.69918 2.95234 9.04835L3.614 9.41501C3.15817 7.87501 3.00567 6.22001 2.94984 4.80501L2.9415 4.62085L2.94067 4.57751C2.39734 4.76585 2.09234 4.90668 1.90234 5.17001C1.6665 5.49751 1.6665 5.93335 1.6665 6.80168Z"
      fill={fill}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.6475 1.95587C12.4418 1.75826 11.2217 1.66154 9.99998 1.6667C8.51415 1.6667 7.28915 1.79753 6.35248 1.95587C5.40332 2.11587 4.92915 2.19587 4.53248 2.6842C4.13665 3.17253 4.15748 3.70003 4.19915 4.75503C4.34332 8.37837 5.12498 12.905 9.37498 13.305V16.25H8.18332C7.99074 16.2501 7.80415 16.317 7.65526 16.4391C7.50638 16.5613 7.4044 16.7312 7.36665 16.92L7.20832 17.7084H4.99998C4.83422 17.7084 4.67525 17.7742 4.55804 17.8914C4.44083 18.0086 4.37498 18.1676 4.37498 18.3334C4.37498 18.4991 4.44083 18.6581 4.55804 18.7753C4.67525 18.8925 4.83422 18.9584 4.99998 18.9584H15C15.1657 18.9584 15.3247 18.8925 15.4419 18.7753C15.5591 18.6581 15.625 18.4991 15.625 18.3334C15.625 18.1676 15.5591 18.0086 15.4419 17.8914C15.3247 17.7742 15.1657 17.7084 15 17.7084H12.7917L12.6333 16.92C12.5956 16.7312 12.4936 16.5613 12.3447 16.4391C12.1958 16.317 12.0092 16.2501 11.8167 16.25H10.625V13.305C14.875 12.905 15.6575 8.3792 15.8008 4.75503C15.8425 3.70003 15.8642 3.1717 15.4675 2.6842C15.0708 2.19587 14.5967 2.11587 13.6475 1.95587Z"
      fill={fill}
    />
  </svg>
);

const LoreIcon = ({ fill = "#6C6C6C" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.125 1.875C15.484 1.88633 13.5207 2.25 12.1 2.87852C11.0398 3.34727 10.625 3.70195 10.625 4.90352V17.5C12.2488 16.0352 13.6898 15.625 19.375 15.625V1.875H18.125ZM1.875 1.875C4.51602 1.88633 6.4793 2.25 7.9 2.87852C8.96016 3.34727 9.375 3.70195 9.375 4.90352V17.5C7.75117 16.0352 6.31016 15.625 0.625 15.625V1.875H1.875Z"
      fill={fill}
    />
  </svg>
);

const CommunityIcon = ({fill = "#6C6C6C"}) =>  <svg
width="20"
height="20"
viewBox="0 0 20 20"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M3.75 3.75C3.75 3.08696 4.01339 2.45107 4.48223 1.98223C4.95107 1.51339 5.58696 1.25 6.25 1.25C6.91304 1.25 7.54893 1.51339 8.01777 1.98223C8.48661 2.45107 8.75 3.08696 8.75 3.75C8.75 4.41304 8.48661 5.04893 8.01777 5.51777C7.54893 5.98661 6.91304 6.25 6.25 6.25C5.58696 6.25 4.95107 5.98661 4.48223 5.51777C4.01339 5.04893 3.75 4.41304 3.75 3.75ZM12.2238 5.73L12.2762 5.77C12.8066 6.16313 13.471 6.33052 14.1243 6.23564C14.7776 6.14076 15.3669 5.7913 15.7635 5.26354C16.1601 4.73578 16.3319 4.07257 16.2413 3.41862C16.1508 2.76468 15.8052 2.17311 15.2801 1.77301C14.755 1.37292 14.0929 1.19677 13.4384 1.28302C12.7838 1.36927 12.19 1.71092 11.7864 2.23339C11.3829 2.75587 11.2024 3.41676 11.2843 4.07184C11.3662 4.72692 11.7039 5.323 12.2238 5.73ZM7.835 7.5C7.992 7.2027 8.20736 6.94013 8.46818 6.72799C8.72901 6.51584 9.02994 6.35849 9.35298 6.26534C9.67603 6.17218 10.0145 6.14514 10.3483 6.18584C10.682 6.22654 11.0041 6.33413 11.2953 6.50218C11.5865 6.67024 11.8408 6.8953 12.043 7.1639C12.2452 7.43251 12.3911 7.73914 12.4721 8.06545C12.5531 8.39176 12.5674 8.73105 12.5142 9.06302C12.461 9.39499 12.3414 9.71282 12.1625 9.9975C11.8184 10.5452 11.2754 10.9381 10.6477 11.0939C10.0199 11.2496 9.35623 11.156 8.79603 10.8327C8.23584 10.5094 7.82275 9.98161 7.64354 9.36014C7.46433 8.73867 7.53296 8.07193 7.835 7.5ZM3.125 7.5H6.4625C6.24034 8.13445 6.19204 8.81679 6.3226 9.47621C6.45317 10.1356 6.75784 10.7481 7.205 11.25H6.875C6.23055 11.2499 5.60181 11.449 5.07486 11.82C4.5479 12.191 4.14847 12.7158 3.93125 13.3225C3.51167 13.154 3.11881 12.9253 2.765 12.6437C1.825 11.8875 1.25 10.77 1.25 9.375C1.25 8.87772 1.44754 8.40081 1.79917 8.04917C2.15081 7.69754 2.62772 7.5 3.125 7.5ZM13.125 11.25C14.4812 11.25 15.6362 12.1138 16.0687 13.3225C16.4937 13.1488 16.8863 12.9225 17.235 12.6437C18.175 11.8875 18.75 10.77 18.75 9.375C18.75 8.87772 18.5525 8.40081 18.2008 8.04917C17.8492 7.69754 17.3723 7.5 16.875 7.5H13.5375C13.675 7.89125 13.75 8.3125 13.75 8.75C13.7512 9.67264 13.411 10.5631 12.795 11.25H13.125ZM14.8588 13.66C14.95 13.88 15 14.1225 15 14.375C15 15.77 14.4263 16.8875 13.485 17.6437C12.5588 18.3875 11.3162 18.75 10 18.75C8.68375 18.75 7.44125 18.3875 6.515 17.6437C5.575 16.8875 5 15.77 5 14.375C4.99934 14.1286 5.04739 13.8845 5.14138 13.6567C5.23538 13.4289 5.37346 13.2219 5.5477 13.0477C5.72194 12.8735 5.92891 12.7354 6.15669 12.6414C6.38447 12.5474 6.62859 12.4993 6.875 12.5H13.125C13.4964 12.4999 13.8594 12.6101 14.1681 12.8166C14.4767 13.0232 14.7171 13.3167 14.8588 13.66Z"
  fill={fill}
/>
</svg>

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Bounties",
    href: "/bounties",
    icon: <BountiesIcon />,
  },
  {
    name: "Community",
    href: "/community",
    soon: false,
    icon: <CommunityIcon />,
  },
  {
    name: "Lore",
    href: "/lore",
    new: true,
    icon: <LoreIcon />,
  },
  {
    name: "Custom Assets",
    href: "https://www.figma.com/file/2qoIvzDwfHrci6WobLwtkO/BAD*-Environment-ASSETS?type=design&node-id=0%3A1&mode=design&t=4FCwnYZ7Ss5QVyT7-1",
    externelLink: true,
    icon: (
      <>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.6665 4.99996C1.6665 3.74579 2.3165 2.43329 3.33317 1.66663C3.33317 2.37079 3.90817 3.33329 4.99984 3.33329C5.66288 3.33329 6.29876 3.59668 6.7676 4.06553C7.23644 4.53437 7.49984 5.17025 7.49984 5.83329C7.49984 6.15496 7.434 6.45996 7.32317 6.74246C7.9413 7.23303 8.55002 7.73535 9.149 8.24913L7.41567 9.98246C6.90209 9.38331 6.39978 8.77459 5.909 8.15662C5.61972 8.27206 5.3113 8.332 4.99984 8.33329C3.15817 8.33329 1.6665 6.84163 1.6665 4.99996ZM11.7932 10.7066L12.9107 9.58912C13.4282 9.85554 14.0011 9.99629 14.5832 9.99996C15.5777 9.99996 16.5316 9.60487 17.2348 8.90161C17.9381 8.19835 18.3332 7.24452 18.3332 6.24996C18.3332 5.64579 18.1765 5.08246 17.9223 4.57746L14.9998 7.49996L13.3332 5.83329L16.2557 2.91079C15.7382 2.64438 15.1652 2.50363 14.5832 2.49996C13.5886 2.49996 12.6348 2.89505 11.9315 3.59831C11.2283 4.30157 10.8332 5.2554 10.8332 6.24996C10.8332 6.85413 10.9898 7.41746 11.244 7.92246L2.49984 16.6666L4.1665 18.3333L9.87317 12.6266C11.4426 14.2369 13.1058 15.7532 14.854 17.1675L16.0415 18.125L17.2915 16.875L16.334 15.6875C14.9197 13.9393 13.4035 12.2761 11.7932 10.7066Z"
            fill="#6C6C6C"
          />
        </svg>
      </>
    ),
  },
  {
    name: "spotify playlist",
    href: "https://open.spotify.com/playlist/2Sb6rnOeSQRZGJTaHjDMDP?si=bc2c99b2eaf84bf5",
    externelLink: true,
    icon: (
      <>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.9165 9.08332C12.2498 7.49999 7.7915 7.33332 5.24984 8.12499C4.83317 8.24999 4.4165 7.99999 4.2915 7.62499C4.1665 7.20832 4.4165 6.79166 4.7915 6.66666C7.74984 5.79166 12.6248 5.95832 15.7082 7.79166C16.0832 7.99999 16.2082 8.49999 15.9998 8.87499C15.7915 9.16666 15.2915 9.29166 14.9165 9.08332ZM14.8332 11.4167C14.6248 11.7083 14.2498 11.8333 13.9582 11.625C11.7082 10.25 8.2915 9.83332 5.6665 10.6667C5.33317 10.75 4.95817 10.5833 4.87484 10.25C4.7915 9.91666 4.95817 9.54166 5.2915 9.45832C8.33317 8.54166 12.0832 8.99999 14.6665 10.5833C14.9165 10.7083 15.0415 11.125 14.8332 11.4167ZM13.8332 13.7083C13.6665 13.9583 13.3748 14.0417 13.1248 13.875C11.1665 12.6667 8.70817 12.4167 5.7915 13.0833C5.49984 13.1667 5.24984 12.9583 5.1665 12.7083C5.08317 12.4167 5.2915 12.1667 5.5415 12.0833C8.70817 11.375 11.4582 11.6667 13.6248 13C13.9165 13.125 13.9582 13.4583 13.8332 13.7083ZM9.99984 1.66666C8.90549 1.66666 7.82185 1.8822 6.81081 2.30099C5.79976 2.71978 4.8811 3.33361 4.10728 4.10743C2.54448 5.67024 1.6665 7.78985 1.6665 9.99999C1.6665 12.2101 2.54448 14.3297 4.10728 15.8925C4.8811 16.6664 5.79976 17.2802 6.81081 17.699C7.82185 18.1178 8.90549 18.3333 9.99984 18.3333C12.21 18.3333 14.3296 17.4553 15.8924 15.8925C17.4552 14.3297 18.3332 12.2101 18.3332 9.99999C18.3332 8.90564 18.1176 7.82201 17.6988 6.81096C17.28 5.79991 16.6662 4.88125 15.8924 4.10743C15.1186 3.33361 14.1999 2.71978 13.1889 2.30099C12.1778 1.8822 11.0942 1.66666 9.99984 1.66666Z"
            fill="#6C6C6C"
          />
        </svg>
      </>
    ),
  },
  {
    name: "store",
    href: "https://badenvironment.club/",
    externelLink: true,
    icon: (
      <>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5624 2.52499C12.3489 3.05292 11.9826 3.50506 11.5105 3.82352C11.0383 4.14198 10.4819 4.31224 9.91243 4.31249C9.34295 4.31224 8.78651 4.14198 8.3144 3.82352C7.84228 3.50506 7.47599 3.05292 7.26243 2.52499L0.773682 5.27499L2.59868 9.57749L4.60493 8.72749V17.5H15.2912V8.75937L17.2243 9.57937L19.0493 5.27687L12.5624 2.52499Z"
            fill="#6C6C6C"
          />
        </svg>
      </>
    ),
  },
];

const AppLayout: React.FC<AppLayoutProps> = ({ children, hideSidebar }) => {
  const {user, session} = useUser()
  const { publicKey } = useWallet();
  const wallet = useWallet();
  const router = useRouter();

  const [sidebarVisiblity, setSidebarVisibility] = React.useState(false)

  useEffect(() => {
    if (!session.data && session.status !== "loading") {
      router.push("/login")
    }
  }, [session])

  return session.data && session.status !== "loading" && ( <div className="w-full flex h-screen overflow-hidden flex-col items-stretch">
            {/* Header */}
            <header className="bg-[#161616] py-4 px-10 w-full flex items-center justify-between shadow-[0px_10px_40px_#00000070]">
              {/* Logo */}
              <div className="w-64">
                <img
                  src="/assets/images/bad-hub-logo.png"
                  className="w-[160px]"
                />
              </div>

              {/* nav links */}
              <div className="text-white flex items-center gap-4 lg:hidden">
                <div className="flex items-center gap-4 mr-4 akira">
                  {" "}
                  {/* USD balance */}
                  <USDBalance />

                  {/* Points balance */}
                  <PointsBalance />
                </div>

                {/* User */}
                <Link href={"/user"}>
                  <Image showAnimation={true} imageSrc={
                      user.profile?.pfpUrl || "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Fbafybeielr6axrkbmcn6ozd5li3tp5f6ax2r6ryvfrszvh2wfz3jwcjao7y.ipfs.nftstorage.link%2F1599.png%3Fext%3Dpng"
                        
                    } imageAlt="user pfp" width="56px" height="56px" className="rounded-full cursor-pointer hover:opacity-80"/>
                </Link>


                  {/* wallet disconnect button */}
                <button
                  onClick={() => {
                    if (publicKey) {
                      wallet.disconnect()
                    } else {
                      (document.querySelector(".wallet-adapter-button") as HTMLButtonElement)?.click();
                    }
                  }}
                  className="bg-transparent py-2 px-6 flex items-center border cursor-pointer hover:opacity-80 border-white rounded-full font-semibold gap-2"
                >
                  <img src="/assets/images/wallet-icon.png" />
                  {publicKey && `${publicKey?.toBase58().slice(0, 4)}...${publicKey?.toBase58().slice(-4)}` }
                  {!publicKey && "Select Wallet"}
                </button>
                  
                  <div className="hidden">
                    <WalletMultiButton
                        style={{}}
                    ></WalletMultiButton>
                  </div>
              </div>

              {/* hamburger menu */}
              <svg onClick={() => {setSidebarVisibility(true)}} className="hidden lg:block hover:oapcity-70 duration-200" width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 24V20H36V24H0ZM0 14V10H36V14H0ZM0 4V0H36V4H0Z" fill="white"/>
              </svg>
            </header>

            <div className="flex-grow flex overflow-hidden w-full">
              {/* Sidebar */}
              {!hideSidebar && <div className={`h-full relative shrink-0 lg:absolute lg:left-0 lg:top-0 lg:w-full duration-200  ${sidebarVisiblity ? "lg:bg-[#00000050] lg:backdrop-blur-md lg:z-[10000]" : "lg:z-[-10000]"}`}
               >
                <div className={`lg:w-[500px] md:!w-full lg:absolute lg:right-0 lg:top-0 h-full flex flex-col lg:bg-black text-white duration-200 ${sidebarVisiblity ? "lg:translate-x-0" : "lg:translate-x-full"}`}>
                  {/* sidebar head, only visible on smaller screen sizes*/}
                  <div className="bg-[#161616] py-3 px-5 gap-3 hidden lg:flex w-full">
                      {/* Usd balance */}
                      <USDBalance />

                      {/* points balance */}
                      <PointsBalance />

                      {/* close icon */}
                      <svg onClick={() => setSidebarVisibility(false)} className="ml-auto hover:opacity-70 duration-200" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36.7199 39.56L23.9999 26.82L11.2799 39.56L8.43994 36.72L21.1799 24L8.43994 11.28L11.2799 8.44L23.9999 21.18L36.7199 8.46L39.5399 11.28L26.8199 24L39.5399 36.72L36.7199 39.56Z" fill="white"/>
                      </svg>
                  </div>

                  <div className="p-4 flex-grow">
                    {/* user details, only visible on smaller screen sizes */}
                    <div className="hidden lg:flex gap-4 mt-8 mb-4">
                      <Link href={"/user/"}>
                        <Image showAnimation={true} imageSrc={
                            user.pfpUrl || "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Fbafybeielr6axrkbmcn6ozd5li3tp5f6ax2r6ryvfrszvh2wfz3jwcjao7y.ipfs.nftstorage.link%2F1599.png%3Fext%3Dpng"
                              
                          } imageAlt="user pfp" width="56px" height="56px" className="rounded-full cursor-pointer hover:opacity-80"/>
                      </Link>


                        {/* wallet disconnect button */}
                      <button
                        onClick={() => {
                          if (publicKey) {
                            wallet.disconnect()
                          } else {
                            (document.querySelector(".wallet-adapter-button") as HTMLButtonElement)?.click();
                          }
                        }}
                        className="bg-transparent py-2 px-6 flex items-center border cursor-pointer hover:opacity-80 border-white rounded-full font-semibold gap-2"
                      >
                        <img src="/assets/images/wallet-icon.png" />
                        {publicKey && `${publicKey?.toBase58().slice(0, 4)}...${publicKey?.toBase58().slice(-4)}` }
                        {!publicKey && "Select Wallet"}
                      </button>
                    </div>

                    <nav className="flex flex-col gap-1">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          target={item.externelLink ? "_blank" : "_self"}
                        >
                          <div
                            className={`group w-full relative flex font-bold items-center gap-2 px-3 py-2 rounded-md text-lg uppercase ${
                              router.pathname === item.href
                                ? " text-[#FFD600]"
                                : " text-[#DDDDDD] hover:text-white"
                            }`}
                          >
                            {React.cloneElement(item.icon, {
                              fill:
                                router.pathname === item.href
                                  ? "#FFD600"
                                  : "#DDDDDD",
                              className: "group-hover:fill-yellow-500",
                            })}
                            <div className="mt-1 relative flex gap-2 group-hover:text-[#FFEFB1]">
                              <div className="w-full">{item.name}</div>
                              {item.externelLink ? (
                                <>
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clip-path="url(#clip0_236_2919)">
                                      <path
                                        d="M3.80873 14.769L12.047 6.5308L5.64751 6.5308L5.64751 4.51994L15.4799 4.51994V14.3524L13.4691 14.3524L13.4691 7.9529L5.23083 16.1912L3.80873 14.769Z"
                                        fill="#DDDDDD"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_236_2919">
                                        <rect width="20" height="20" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </>
                              ) : null}
                            </div>
                            {router.pathname === item.href ? "*" : null}
                            {item.new ? (
                              <svg
                                width="40"
                                height="18"
                                viewBox="0 0 40 18"
                                fill="none"
                                className="-mt-4  right-0"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="39"
                                  height="17"
                                  rx="8.5"
                                  stroke="#DDDDDD"
                                />
                                <path
                                  d="M14.0028 4.77273V13.5H12.7926L8.35653 7.09943H8.27557V13.5H6.95881V4.77273H8.17756L12.6179 11.1818H12.6989V4.77273H14.0028ZM15.9237 13.5V4.77273H21.3952V5.90625H17.2404V8.56534H21.1097V9.6946H17.2404V12.3665H21.4464V13.5H15.9237ZM24.8629 13.5L22.4425 4.77273H23.8274L25.5277 11.5312H25.6087L27.3771 4.77273H28.7493L30.5178 11.5355H30.5987L32.2947 4.77273H33.6839L31.2592 13.5H29.9339L28.0973 6.96307H28.0291L26.1925 13.5H24.8629Z"
                                  fill="#DDDDDD"
                                />
                              </svg>
                            ) : null}
                            {item.soon ? (
                              <div className="text-xs rounded-full px-2 py-[1px] border">
                                SOON
                              </div>
                            ) : null}
                          </div>
                        </Link>
                      ))}
                    </nav>

                    

                    {/* links */}
                    <div className="absolute bottom-4 left-6 text-white">
                    {/* log out */}
                      <button onClick={async () => {
                        await signOut();
                        // router.push("/login")
                      }} className="font-semibold hover:opacity-80 flex items-center gap-2 mb-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#6C6C6C" d="m21.207 11.793l-5.914 5.914l-1.414-1.414l3.5-3.5H7.793v-2h9.586l-3.5-3.5l1.414-1.414zm-11.414-7.5h-5v15h5v2h-7v-19h7z"/></svg>
                        <span className="">Log out</span>
                      </button>

                      <a href="https://magiceden.io/marketplace/bad_environment_club" target="_blank">
                        <svg
                          width="201"
                          height="40"
                          viewBox="0 0 201 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.2523 16.4962L20.6027 18.0962C20.7573 18.2759 20.8944 18.4237 20.9498 18.5078C21.3536 18.9125 21.5801 19.4595 21.5798 20.0295C21.5419 20.702 21.1073 21.16 20.7048 21.6498L19.7598 22.7687L19.2669 23.3484C19.2492 23.3683 19.2378 23.393 19.234 23.4194C19.2303 23.4458 19.2345 23.4726 19.246 23.4967C19.2574 23.5208 19.2757 23.5409 19.2986 23.5548C19.3215 23.5685 19.348 23.5754 19.3748 23.5745H24.301C25.0535 23.5745 26.0014 24.2121 25.946 25.1803C25.9445 25.6203 25.7679 26.0418 25.4548 26.353C25.1417 26.6641 24.7176 26.8396 24.2748 26.8411H16.5602C16.0527 26.8411 14.6877 26.8962 14.3056 25.7223C14.2243 25.477 14.2132 25.2141 14.2735 24.9628C14.3846 24.5914 14.5603 24.2421 14.7927 23.931C15.1806 23.3513 15.6006 22.7715 16.0148 22.2092C16.5485 21.473 17.0969 20.76 17.6364 20.0092C17.6556 19.9848 17.666 19.9547 17.666 19.9237C17.666 19.8927 17.6556 19.8627 17.6364 19.8382L15.6764 17.5194C15.6637 17.5026 15.6471 17.4889 15.6281 17.4795C15.6092 17.4702 15.5883 17.4653 15.5671 17.4653C15.5459 17.4653 15.5249 17.4702 15.506 17.4795C15.487 17.4889 15.4705 17.5026 15.4577 17.5194C14.9327 18.2237 12.6344 21.3426 12.1444 21.9745C11.6544 22.6063 10.4468 22.6411 9.77893 21.9745L6.71352 18.9165C6.69395 18.897 6.66895 18.8836 6.64177 18.8782C6.61455 18.8728 6.58635 18.8756 6.56074 18.8862C6.5351 18.8967 6.5132 18.9146 6.49783 18.9375C6.48246 18.9605 6.47429 18.9875 6.47435 19.015V24.8962C6.48155 25.3135 6.35722 25.7227 6.11869 26.0663C5.8802 26.4098 5.5395 26.6706 5.14435 26.8121C4.89185 26.8995 4.62203 26.9255 4.35732 26.8882C4.09263 26.8508 3.84077 26.7511 3.62272 26.5974C3.40467 26.4437 3.22676 26.2404 3.10382 26.0045C2.98091 25.7685 2.91651 25.5068 2.91602 25.2411V14.6672C2.9336 14.2861 3.07156 13.9203 3.31032 13.6216C3.54908 13.3229 3.87647 13.1066 4.24602 13.0034C4.563 12.9195 4.89667 12.9203 5.21321 13.0059C5.52976 13.0914 5.81792 13.2585 6.04852 13.4904L10.7619 18.1802C10.776 18.1945 10.793 18.2055 10.8119 18.2124C10.8307 18.2194 10.8509 18.2221 10.871 18.2205C10.891 18.2188 10.9104 18.2128 10.9279 18.2028C10.9453 18.1929 10.9603 18.1792 10.9719 18.1628L14.3202 13.557C14.4749 13.3701 14.6689 13.219 14.8886 13.1143C15.1082 13.0097 15.3483 12.954 15.5919 12.9512H24.301C24.5394 12.9517 24.7749 13.0026 24.9918 13.1007C25.2087 13.1989 25.4021 13.3419 25.5589 13.5202C25.7157 13.6986 25.8324 13.9082 25.9012 14.135C25.97 14.3618 25.9892 14.6005 25.9577 14.8353C25.8963 15.2426 25.6884 15.6139 25.3725 15.8804C25.0566 16.1469 24.6541 16.2905 24.2398 16.2846H19.3631C19.3386 16.2852 19.3147 16.2923 19.2939 16.3052C19.2731 16.3181 19.2561 16.3363 19.2448 16.3579C19.2335 16.3795 19.2282 16.4037 19.2295 16.428C19.2309 16.4524 19.2387 16.4759 19.2523 16.4962Z"
                            fill="#E93A88"
                          />
                          <path
                            d="M37.2784 13.8636H39.4091L43.1136 22.9091H43.25L46.9545 13.8636H49.0852V25.5H47.4148V17.0795H47.3068L43.875 25.483H42.4886L39.0568 17.0739H38.9489V25.5H37.2784V13.8636ZM52.6207 25.5H50.7571L54.9446 13.8636H56.973L61.1605 25.5H59.2969L56.0071 15.9773H55.9162L52.6207 25.5ZM52.9332 20.9432H58.9787V22.4205H52.9332V20.9432ZM70.169 17.5398C70.0592 17.1951 69.9115 16.8864 69.7259 16.6136C69.544 16.3371 69.3262 16.1023 69.0724 15.9091C68.8187 15.7121 68.5289 15.5625 68.2031 15.4602C67.8812 15.358 67.527 15.3068 67.1406 15.3068C66.4853 15.3068 65.8944 15.4754 65.3679 15.8125C64.8414 16.1496 64.4247 16.6439 64.1179 17.2955C63.8149 17.9432 63.6634 18.7367 63.6634 19.6761C63.6634 20.6193 63.8168 21.4167 64.1236 22.0682C64.4304 22.7197 64.8509 23.214 65.3849 23.5511C65.919 23.8883 66.527 24.0568 67.2088 24.0568C67.8414 24.0568 68.3925 23.928 68.8622 23.6705C69.3357 23.4129 69.7012 23.0492 69.9588 22.5795C70.2202 22.1061 70.3509 21.5492 70.3509 20.9091L70.8054 20.9943H67.4759V19.5455H72.0497V20.8693C72.0497 21.8466 71.8414 22.6951 71.4247 23.4148C71.0118 24.1307 70.4399 24.6837 69.7088 25.0739C68.9815 25.464 68.1482 25.6591 67.2088 25.6591C66.1558 25.6591 65.2315 25.4167 64.4361 24.9318C63.6444 24.447 63.027 23.7595 62.5838 22.8693C62.1406 21.9754 61.919 20.9148 61.919 19.6875C61.919 18.7595 62.0478 17.9261 62.3054 17.1875C62.563 16.4489 62.9247 15.822 63.3906 15.3068C63.8603 14.7879 64.4115 14.392 65.044 14.1193C65.6804 13.8428 66.3755 13.7045 67.1293 13.7045C67.758 13.7045 68.3433 13.7973 68.8849 13.983C69.4304 14.1686 69.9152 14.4318 70.3395 14.7727C70.7675 15.1136 71.1217 15.5189 71.402 15.9886C71.6823 16.4545 71.8717 16.9716 71.9702 17.5398H70.169ZM76.0341 13.8636V25.5H74.2784V13.8636H76.0341ZM88.2557 17.6477H86.483C86.4148 17.2689 86.2879 16.9356 86.1023 16.6477C85.9167 16.3598 85.6894 16.1155 85.4205 15.9148C85.1515 15.714 84.8504 15.5625 84.517 15.4602C84.1875 15.358 83.8371 15.3068 83.4659 15.3068C82.7955 15.3068 82.1951 15.4754 81.6648 15.8125C81.1383 16.1496 80.7216 16.6439 80.4148 17.2955C80.1117 17.947 79.9602 18.7424 79.9602 19.6818C79.9602 20.6288 80.1117 21.428 80.4148 22.0795C80.7216 22.7311 81.1402 23.2235 81.6705 23.5568C82.2008 23.8902 82.7973 24.0568 83.4602 24.0568C83.8277 24.0568 84.1761 24.0076 84.5057 23.9091C84.839 23.8068 85.1402 23.6572 85.4091 23.4602C85.678 23.2633 85.9053 23.0227 86.0909 22.7386C86.2803 22.4508 86.411 22.1212 86.483 21.75L88.2557 21.7557C88.161 22.3277 87.9773 22.8542 87.7045 23.3352C87.4356 23.8125 87.089 24.2254 86.6648 24.5739C86.2443 24.9186 85.7633 25.1856 85.2216 25.375C84.6799 25.5644 84.089 25.6591 83.4489 25.6591C82.4413 25.6591 81.5436 25.4205 80.7557 24.9432C79.9678 24.4621 79.3466 23.7746 78.892 22.8807C78.4413 21.9867 78.2159 20.9205 78.2159 19.6818C78.2159 18.4394 78.4432 17.3731 78.8977 16.483C79.3523 15.589 79.9735 14.9034 80.7614 14.4261C81.5492 13.9451 82.4451 13.7045 83.4489 13.7045C84.0663 13.7045 84.642 13.7936 85.1761 13.9716C85.714 14.1458 86.197 14.4034 86.625 14.7443C87.053 15.0814 87.4072 15.4943 87.6875 15.983C87.9678 16.4678 88.1572 17.0227 88.2557 17.6477ZM94.5909 25.5V13.8636H101.886V15.375H96.3466V18.9205H101.506V20.4261H96.3466V23.9886H101.955V25.5H94.5909ZM107.999 25.5H104.232V13.8636H108.118C109.258 13.8636 110.237 14.0966 111.055 14.5625C111.874 15.0246 112.5 15.6894 112.936 16.5568C113.375 17.4205 113.595 18.4564 113.595 19.6648C113.595 20.8769 113.374 21.9186 112.93 22.7898C112.491 23.661 111.855 24.3314 111.021 24.8011C110.188 25.267 109.18 25.5 107.999 25.5ZM105.987 23.9659H107.902C108.788 23.9659 109.525 23.7992 110.112 23.4659C110.699 23.1288 111.139 22.642 111.43 22.0057C111.722 21.3655 111.868 20.5852 111.868 19.6648C111.868 18.7519 111.722 17.9773 111.43 17.3409C111.143 16.7045 110.713 16.2216 110.141 15.892C109.569 15.5625 108.858 15.3977 108.01 15.3977H105.987V23.9659ZM115.778 25.5V13.8636H123.074V15.375H117.534V18.9205H122.693V20.4261H117.534V23.9886H123.142V25.5H115.778ZM134.811 13.8636V25.5H133.197L127.283 16.9659H127.175V25.5H125.419V13.8636H127.044L132.964 22.4091H133.072V13.8636H134.811Z"
                            fill="#DDDDDD"
                          />
                          <g clip-path="url(#clip0_236_2935)">
                            <path
                              d="M142.809 24.769L151.047 16.5308L144.648 16.5308L144.648 14.5199L154.48 14.5199V24.3523L152.469 24.3523L152.469 17.9529L144.231 26.1911L142.809 24.769Z"
                              fill="#DDDDDD"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_236_2935">
                              <rect
                                width="20"
                                height="20"
                                fill="white"
                                transform="translate(139 10)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <div className="flex items-center gap-2">
                        <a href="https://x.com/badenvclub" target="_blank">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M34.7488 10.8348C33.6631 11.3283 32.4928 11.6526 31.2802 11.8077C32.521 11.0604 33.4798 9.87595 33.931 8.45182C32.7607 9.15684 31.4635 9.65035 30.0957 9.93235C28.9818 8.71973 27.4167 8.01471 25.64 8.01471C22.3265 8.01471 19.6192 10.722 19.6192 14.0637C19.6192 14.5432 19.6756 15.0085 19.7743 15.4456C14.7546 15.1918 10.2848 12.7806 7.30962 9.12863C6.78791 10.017 6.49181 11.0604 6.49181 12.1602C6.49181 14.2612 7.54933 16.1224 9.18497 17.1799C8.18384 17.1799 7.25322 16.8979 6.4354 16.4749V16.5172C6.4354 19.4501 8.52225 21.9035 11.2859 22.4534C10.3986 22.6963 9.46711 22.73 8.56455 22.5521C8.94753 23.7542 9.69757 24.8059 10.7092 25.5596C11.7209 26.3133 12.9433 26.731 14.2047 26.754C12.0666 28.4467 9.41621 29.3616 6.68921 29.3485C6.2098 29.3485 5.73039 29.3203 5.25098 29.2639C7.93004 30.9841 11.1167 31.9853 14.529 31.9853C25.64 31.9853 31.7455 22.7636 31.7455 14.7688C31.7455 14.5009 31.7455 14.2471 31.7314 13.9791C32.9158 13.1331 33.931 12.0615 34.7488 10.8348Z"
                              fill="#A6A6A6"
                            />
                            <path
                              d="M22.3385 18.0382C22.0415 17.7836 20.6397 19.4869 20.0466 20.2023C19.4162 19.4728 17.7332 18.0843 17.5435 18.3564C17.3537 18.6286 18.7098 20.563 19.0923 21.2844C18.8796 21.9845 17.9746 23.8494 18.2012 23.9789C18.4278 24.1084 19.7496 22.7413 20.3649 22.1542C21.0862 22.5079 22.347 23.1388 22.4658 22.9181C22.5847 22.6975 21.4616 21.5956 20.8958 20.9025C21.5535 19.877 22.5535 18.2224 22.3385 18.0382Z"
                              fill="black"
                              stroke="black"
                              stroke-width="0.833333"
                            />
                          </svg>
                        </a>

                        <a href="https://www.instagram.com/badenvironmentclub/" target="_blank">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.2336 8C22.5835 8.0036 23.2687 8.0108 23.8603 8.0276L24.0931 8.036C24.3619 8.0456 24.627 8.0576 24.9474 8.072C26.2242 8.132 27.0953 8.33359 27.8597 8.62999C28.6516 8.93478 29.3188 9.34757 29.986 10.0136C30.5961 10.6134 31.0683 11.339 31.3695 12.1399C31.6659 12.9043 31.8675 13.7755 31.9275 15.0534C31.9419 15.3726 31.9539 15.6378 31.9635 15.9078L31.9707 16.1406C31.9887 16.731 31.9959 17.4162 31.9983 18.7661L31.9995 19.6613V21.2333C32.0024 22.1086 31.9932 22.9838 31.9719 23.8588L31.9647 24.0916C31.9551 24.3616 31.9431 24.6268 31.9287 24.946C31.8687 26.224 31.6647 27.094 31.3695 27.8595C31.0691 28.6609 30.5969 29.3866 29.986 29.9859C29.386 30.5959 28.6604 31.068 27.8597 31.3695C27.0953 31.6658 26.2242 31.8674 24.9474 31.9274C24.6627 31.9409 24.3779 31.9528 24.0931 31.9634L23.8603 31.9706C23.2687 31.9874 22.5835 31.9958 21.2336 31.9982L20.3385 31.9994H18.7677C17.8921 32.0025 17.0165 31.9933 16.1411 31.9718L15.9083 31.9646C15.6234 31.9539 15.3386 31.9415 15.0539 31.9274C13.7772 31.8674 12.906 31.6658 12.1405 31.3695C11.3397 31.0687 10.6144 30.5965 10.0154 29.9859C9.40467 29.3862 8.93211 28.6606 8.63066 27.8595C8.33428 27.0952 8.13269 26.224 8.07269 24.946C8.05932 24.6613 8.04732 24.3765 8.03669 24.0916L8.03069 23.8588C8.00858 22.9838 7.99858 22.1086 8.00069 21.2333V18.7661C7.99734 17.8909 8.00614 17.0156 8.02709 16.1406L8.03549 15.9078C8.04509 15.6378 8.05709 15.3726 8.07149 15.0534C8.13149 13.7755 8.33308 12.9055 8.62946 12.1399C8.93078 11.3382 9.40428 10.6124 10.0166 10.0136C10.6155 9.40334 11.3403 8.93116 12.1405 8.62999C12.906 8.33359 13.776 8.132 15.0539 8.072C15.3731 8.0576 15.6395 8.0456 15.9083 8.036L16.1411 8.0288C17.0161 8.00748 17.8913 7.99828 18.7665 8.0012L21.2336 8ZM20.0001 13.9999C18.4089 13.9999 16.8828 14.632 15.7577 15.7572C14.6325 16.8824 14.0004 18.4085 14.0004 19.9997C14.0004 21.591 14.6325 23.1171 15.7577 24.2423C16.8828 25.3675 18.4089 25.9996 20.0001 25.9996C21.5913 25.9996 23.1173 25.3675 24.2425 24.2423C25.3677 23.1171 25.9998 21.591 25.9998 19.9997C25.9998 18.4085 25.3677 16.8824 24.2425 15.7572C23.1173 14.632 21.5913 13.9999 20.0001 13.9999ZM20.0001 16.3998C20.4728 16.3997 20.9409 16.4928 21.3777 16.6736C21.8145 16.8544 22.2114 17.1195 22.5457 17.4538C22.88 17.788 23.1453 18.1848 23.3262 18.6215C23.5072 19.0583 23.6004 19.5264 23.6005 19.9991C23.6006 20.4719 23.5075 20.94 23.3267 21.3768C23.1459 21.8136 22.8808 22.2105 22.5466 22.5448C22.2123 22.8792 21.8155 23.1444 21.3788 23.3254C20.9421 23.5064 20.474 23.5996 20.0013 23.5996C19.0465 23.5996 18.1309 23.2204 17.4558 22.5452C16.7807 21.8701 16.4015 20.9545 16.4015 19.9997C16.4015 19.045 16.7807 18.1293 17.4558 17.4542C18.1309 16.7791 19.0465 16.3998 20.0013 16.3998"
                              fill="#A6A6A6"
                            />
                            <path
                              d="M28.8302 10.414C28.5812 10.2007 27.4066 11.628 26.9096 12.2275C26.3813 11.6162 24.971 10.4526 24.812 10.6806C24.653 10.9087 25.7894 12.5297 26.1099 13.1342C25.9316 13.7209 25.1733 15.2837 25.3632 15.3922C25.5531 15.5007 26.6607 14.3551 27.1763 13.8632C27.7808 14.1595 28.8373 14.6882 28.9368 14.5033C29.0364 14.3184 28.0953 13.395 27.6212 12.8142C28.1723 11.9549 29.0103 10.5683 28.8302 10.414Z"
                              fill="black"
                              stroke="black"
                              stroke-width="0.833333"
                            />
                          </svg>
                        </a>
                        <a href="https://badenvironmentclub.substack.com/" target="_blank">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M30.3943 13.4723H9.60547V16.2803H30.3943V13.4723ZM9.60547 18.8239V31.8793L19.9999 26.0496L30.3943 31.8793V18.8239H9.60547ZM30.3943 8.12067H9.60547V10.9272H30.3943V8.12067Z"
                              fill="#A6A6A6"
                            />
                            <path
                              d="M28.0333 21.0215C27.7843 20.8082 26.6097 22.2356 26.1127 22.835C25.5845 22.2237 24.1741 21.0602 24.0152 21.2882C23.8561 21.5163 24.9925 23.1373 25.313 23.7418C25.1348 24.3285 24.3764 25.8912 24.5663 25.9997C24.7562 26.1082 25.8638 24.9626 26.3794 24.4707C26.9839 24.767 28.0404 25.2957 28.14 25.1108C28.2395 24.9259 27.2984 24.0026 26.8243 23.4218C27.3754 22.5624 28.2134 21.1759 28.0333 21.0215Z"
                              fill="black"
                              stroke="black"
                              stroke-width="0.833333"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>


                </div>
              </div>}

              <div className="h-full flex-grow flex flex-col">
                <main className="flex-grow overflow-y-scroll p-4 mt-3 text-white overflow-x-hidden">
                  {children}
                </main>
              </div>
            </div>
          </div>
  );
};

export default AppLayout;