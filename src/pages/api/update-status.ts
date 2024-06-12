//@ts-nocheck
// pages/api/submissions/update-status.js
//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { submissionId, status } = req.body;

    if (!submissionId || !status) {
      res.status(400).json({
        success: false,
        message: "Submission ID and statues are required.",
      });
      return;
    }

    console.log("submissionId", status);

    try {
      const updatedSubmission = await prisma.submission.update({
        where: { id: submissionId },
        data: { status },
        include: { wallet: true },
      });

      if (status === "approved") {
        console.log("updatedSubmission", updatedSubmission);
        const walletAddress = updatedSubmission.walletAddress;
        await prisma.wallet.update({
          where: { address: walletAddress },
          data: { points: { increment: 5 } },
        });
      }

      res.status(200).json({ success: true, updatedSubmission });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
