// pages/api/wallet/update-username.js
//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      res.status(400).json({
        success: false,
        message: "Wallet address is required.",
      });
      return;
    }

    try {
      const updatedWallet = await prisma.wallet.update({
        where: { address: walletAddress },
        data: req.body,
      });

      res.status(200).json({ success: true, updatedWallet });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
