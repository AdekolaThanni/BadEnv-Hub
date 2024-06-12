// pages/api/submissions/check-submission.js
//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { bountyId, walletAddress } = req.query;

    // Basic validation
    if (!bountyId || !walletAddress) {
      res
        .status(400)
        .json({
          success: false,
          message: "Bounty ID and wallet address are required.",
        });
      return;
    }

    try {
      // Check if submission exists for the given bountyId and walletAddress
      const submission = await prisma.submission.findFirst({
        where: {
          bountyId,
          walletAddress,
        },
      });

      if (submission) {
        res
          .status(200)
          .json({
            success: true,
            hasSubmitted: true,
            status: submission.status,
          });
      } else {
        res.status(200).json({ success: true, hasSubmitted: false });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
