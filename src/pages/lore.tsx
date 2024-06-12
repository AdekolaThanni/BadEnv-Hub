//@ts-nocheck
import "@fortawesome/fontawesome-free/css/all.css";
import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";
import React, { FC } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import BurnApp from "@/components/BurnApp";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Lore: FC = ({}: any) => {
  //@ts-ignore
  const router = useRouter();

  const walletModal = useWalletModal();
  const { publicKey } = useWallet();
  const wallet = useWallet();

  return (
    <AppLayout>
      <div>
        <h1 className="akira text-4xl">Edition Vol 1.0</h1>
        <div className="flex items-center mt-5 gap-4">
          <div>
            <Select>
              <SelectTrigger className="w-[180px] border-[#6C6C6C] text-[#DDDDDD] rounded-[5px]">
                <SelectValue placeholder="Chapter 1" />
              </SelectTrigger>
              <SelectContent className="bg-[#4C4C4C] border-0 rounded-[5px] gap-2 space-y-3 pb-4  ">
                <SelectItem
                  value="light"
                  className="text-[#DDDDDD] hover:text-[#DDDDDD] bg-[#565656] hover:bg-[#565656] text-md  w-full"
                >
                  <div className="flex items-center  gap-2">Chapter 1</div>
                </SelectItem>
                <SelectItem
                  value="dark"
                  className="text-[#DDDDDD] flex items-center gap-1"
                >
                  <div className="flex items-center  gap-2">
                    <svg
                      width="14"
                      height="19"
                      viewBox="0 0 14 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.00041 18.3334C1.54207 18.3334 1.14985 18.1703 0.82374 17.8442C0.497629 17.5181 0.334296 17.1256 0.33374 16.6667V8.33337C0.33374 7.87504 0.497073 7.48282 0.82374 7.15671C1.15041 6.8306 1.54263 6.66726 2.00041 6.66671H2.83374V5.00004C2.83374 3.84726 3.24013 2.86476 4.05291 2.05254C4.86568 1.24032 5.84818 0.83393 7.00041 0.833374C8.15318 0.833374 9.13596 1.23976 9.94874 2.05254C10.7615 2.86532 11.1676 3.84782 11.1671 5.00004V6.66671H12.0004C12.4587 6.66671 12.8512 6.83004 13.1779 7.15671C13.5046 7.48337 13.6676 7.8756 13.6671 8.33337V16.6667C13.6671 17.125 13.504 17.5175 13.1779 17.8442C12.8518 18.1709 12.4593 18.3339 12.0004 18.3334H2.00041ZM2.00041 16.6667H12.0004V8.33337H2.00041V16.6667ZM7.00041 14.1667C7.45874 14.1667 7.85124 14.0037 8.17791 13.6775C8.50457 13.3514 8.66763 12.9589 8.66707 12.5C8.66707 12.0417 8.50402 11.6495 8.17791 11.3234C7.8518 10.9973 7.4593 10.8339 7.00041 10.8334C6.54207 10.8334 6.14985 10.9967 5.82374 11.3234C5.49763 11.65 5.3343 12.0423 5.33374 12.5C5.33374 12.9584 5.49707 13.3509 5.82374 13.6775C6.15041 14.0042 6.54263 14.1673 7.00041 14.1667ZM4.50041 6.66671H9.50041V5.00004C9.50041 4.3056 9.25735 3.71532 8.77124 3.22921C8.28513 2.7431 7.69485 2.50004 7.00041 2.50004C6.30596 2.50004 5.71568 2.7431 5.22957 3.22921C4.74346 3.71532 4.50041 4.3056 4.50041 5.00004V6.66671Z"
                        fill="#A6A6A6"
                      />
                    </svg>
                    Chapter 2
                  </div>
                </SelectItem>
                <SelectItem
                  value="system"
                  className="text-[#DDDDDD] flex items-center gap-1"
                >
                  <div className="flex items-center  gap-2">
                    <svg
                      width="14"
                      height="19"
                      viewBox="0 0 14 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.00041 18.3334C1.54207 18.3334 1.14985 18.1703 0.82374 17.8442C0.497629 17.5181 0.334296 17.1256 0.33374 16.6667V8.33337C0.33374 7.87504 0.497073 7.48282 0.82374 7.15671C1.15041 6.8306 1.54263 6.66726 2.00041 6.66671H2.83374V5.00004C2.83374 3.84726 3.24013 2.86476 4.05291 2.05254C4.86568 1.24032 5.84818 0.83393 7.00041 0.833374C8.15318 0.833374 9.13596 1.23976 9.94874 2.05254C10.7615 2.86532 11.1676 3.84782 11.1671 5.00004V6.66671H12.0004C12.4587 6.66671 12.8512 6.83004 13.1779 7.15671C13.5046 7.48337 13.6676 7.8756 13.6671 8.33337V16.6667C13.6671 17.125 13.504 17.5175 13.1779 17.8442C12.8518 18.1709 12.4593 18.3339 12.0004 18.3334H2.00041ZM2.00041 16.6667H12.0004V8.33337H2.00041V16.6667ZM7.00041 14.1667C7.45874 14.1667 7.85124 14.0037 8.17791 13.6775C8.50457 13.3514 8.66763 12.9589 8.66707 12.5C8.66707 12.0417 8.50402 11.6495 8.17791 11.3234C7.8518 10.9973 7.4593 10.8339 7.00041 10.8334C6.54207 10.8334 6.14985 10.9967 5.82374 11.3234C5.49763 11.65 5.3343 12.0423 5.33374 12.5C5.33374 12.9584 5.49707 13.3509 5.82374 13.6775C6.15041 14.0042 6.54263 14.1673 7.00041 14.1667ZM4.50041 6.66671H9.50041V5.00004C9.50041 4.3056 9.25735 3.71532 8.77124 3.22921C8.28513 2.7431 7.69485 2.50004 7.00041 2.50004C6.30596 2.50004 5.71568 2.7431 5.22957 3.22921C4.74346 3.71532 4.50041 4.3056 4.50041 5.00004V6.66671Z"
                        fill="#A6A6A6"
                      />
                    </svg>
                    Chapter 3
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className=" text-xl font-bold">CHAPTER ONE</div>
        </div>
        <div className="mt-10 flex items-center justify-center">
          <div style={{ position: 'relative', paddingTop: 'max(60%, 324px)', width: '100%', height: '0' }}>
            <iframe
              style={{ position: 'absolute', border: 'none', width: '100%', height: '100%', left: '0', top: '0' }}
              src="https://online.fliphtml5.com/pruus/hhrh/#p=1"
              seamless
              scrolling="no"
              frameBorder="0"
              allowTransparency={true}
              allowFullScreen={true}
            ></iframe>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Lore;
