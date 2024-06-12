// pages/api/wallet/update-username.js
//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { walletAddress } = req.query;

    if (!walletAddress) {
      res.status(400).json({
        success: false,
        message: "Wallet address is required.",
      });
      return;
    }

    try {
      const user = await prisma.wallet.findUnique({
        where: { address: walletAddress },
      });

      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
