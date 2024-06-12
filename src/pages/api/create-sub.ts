//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      description,
      contentLink,
      socialLink,
      files,
      bountyId,
      walletAddress,
    } = req.body;

    // Add your own validation or business logic here if needed

    try {
      // Find the wallet by address
      const wallet = await prisma.wallet.findUnique({
        where: {
          address: walletAddress,
        },
      });

      if (!wallet) {
        return res
          .status(404)
          .json({ success: false, message: "Wallet not found" });
      }

      // Create the new submission with the wallet's ID
      const newSubmission = await prisma.submission.create({
        data: {
          description,
          contentLink,
          socialLink,
          files,
          bountyId,
          walletAddress: wallet.address,
        },
      });

      res.status(200).json({ success: true, submission: newSubmission });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
