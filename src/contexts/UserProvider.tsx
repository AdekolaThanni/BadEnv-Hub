import getUser from '@/fetchers/getUser';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext } from 'react';

interface UserContextType {
  user?: any;
  setUser?:any;
  walletNFTs?: any;
  isLoading?: boolean;
  loadingPills?: boolean;
  session?: any;
  pills?: any;
  isError?: any;
}

const UserContext = createContext<UserContextType>({});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
    const session = useSession()
    const [user, setUser] = React.useState({});
    const [walletNFTs, setWalletNFTs] = React.useState([]);
    const [pills, setPills] = React.useState({})
    const [loadingPills, setLoadingPills] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError] = React.useState("");

    const { publicKey } = useWallet();

    const router = useRouter();

    const getNfts = (pubKey: PublicKey) => {
        axios
          .get(`/api/getNfts`, {
            params: {
              wallet: pubKey.toBase58(),
            },
          })
          .then((response) => {
            setWalletNFTs(response.data.filteredNfts);
          })
          .catch(() => {
          });
      };
    
      const handleGetUser = async (userId: string) => {
        try {
            setIsLoading(true)
            const user = await getUser(userId);

            if (user) {
              setUser(user);

              if (!user.profile) {
                return router.push(`/user/create-profile`)
              }
            }
        } catch (error: any) {
            console.error(error.message)
        }

        setIsLoading(false)
      }

      const getPills = (pubKey: PublicKey) => {
        setLoadingPills(true);
        axios
          .get(`/api/getPillsBalance`, {
            params: {
              wallet: pubKey.toBase58(),
            },
          })
          .then((response) => {
            setPills({
                bluePills: response.data["Blue Pill"],
                redPills: response.data["Red Pill"],
                goldPills: response.data["Gold Pill"],
                charachterNum: response.data["Character"]
            })
            setLoadingPills(false);
          })
          .catch(() => {
            setLoadingPills(false);
          });
      };
    
  React.useEffect(() => {
    if (session.data && session.status === "authenticated") {
      handleGetUser(session.data.user.email || session.data.user.id)
    }
  }, [session]);

  React.useEffect(() => {
    if (publicKey) {
      getNfts(publicKey);
      getPills(publicKey);
    }
  }, [publicKey])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        walletNFTs,
        loadingPills,
        pills,
        isLoading,
        isError,
        session
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
