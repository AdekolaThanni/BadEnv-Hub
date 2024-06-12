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

    const filteredNfts = nfts.filter(
      (nft) =>
        nft.name.startsWith("Bad: Pills") ||
        nft.name.startsWith("Bad* Environment Club #")
    );

    let nftsByTier: Record<string, any[]> = {
      "Blue Pill": [],
      "Red Pill": [],
      "Gold Pill": [],
      Character: [],
    };

    // Array to hold promises
    const promises = filteredNfts.map(async (nft) => {
      // Fetch additional data from the URI
      let response = await axios.get(nft.uri);
      let additionalData = response.data;

      // Handle new category of NFTs
      if (nft.name.startsWith("Bad* Environment Club #")) {
        // Add logic here to categorize the NFT appropriately
        nftsByTier["Character"].push({ ...nft, additionalData });
      } else {
        // Existing logic for categorizing pills
        const tier = additionalData.attributes.find(
          (attr: any) => attr.trait_type === "Tier"
        ).value;
        nftsByTier[tier].push({ ...nft, additionalData });
      }
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    const nftsFound = Object.values(nftsByTier).some((arr) => arr.length > 0);

    if (!nftsFound) {
      res.status(404).json({
        error: false,
        message: "This wallet doesn't hold any pills or characters",
      });
    } else {
      res.status(200).json({
        "Blue Pill": nftsByTier["Blue Pill"].length,
        "Red Pill": nftsByTier["Red Pill"].length,
        "Gold Pill": nftsByTier["Gold Pill"].length,
        Character: nftsByTier["Character"].length, // Report the count of 'Character' NFTs
      });
    }
  } catch (error) {
    console.error(`Error getting owned nfts: ${error}`);
    res.status(500).json({ error: true, message: `Error: ${error}` });
  }
}
