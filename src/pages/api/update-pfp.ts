// pages/api/wallet/update-pfp.js
//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { walletAddress, newPfpUrl } = req.body;

    if (!walletAddress || !newPfpUrl) {
      res.status(400).json({
        success: false,
        message: "Wallet address and new profile picture URL are required.",
      });
      return;
    }

    try {
      const updatedWallet = await prisma.wallet.update({
        where: { address: walletAddress },
        data: { pfpUrl: newPfpUrl },
      });

      res.status(200).json({ success: true, updatedWallet });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
