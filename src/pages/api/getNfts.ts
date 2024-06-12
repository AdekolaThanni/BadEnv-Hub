//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import {
  Metadata,
  Metaplex,
  keypairIdentity,
  token,
} from "@metaplex-foundation/js";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import bs58 from "bs58";
import _ from "lodash";
import {
  resolveToWalletAddress,
  getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";
import axios from "axios";
import * as anchor from "@project-serum/anchor";

const connection = new anchor.web3.Connection(
  process.env.RPC_URL
);

const metaplex = new Metaplex(connection);

export default async function getPillsBalance(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Validate input
    const wallet = req.query.wallet;

    if (!wallet) {
      return res.status(400).json({ error: true, message: `Invalid wallet` });
    }

    const user = new PublicKey(wallet);

    let nfts: Metadata[] = (await metaplex
      .nfts()
      .findAllByOwner({ owner: user })) as any;

    const filteredNfts = nfts.filter((nft) =>
      nft.name.startsWith("Bad* Environment Club #")
    );

    res.status(200).json({
      filteredNfts,
    });
  } catch (error) {
    console.error(`Error getting owned nfts: ${error}`);
    res.status(500).json({ error: true, message: `Error: ${error}` });
  }
}
