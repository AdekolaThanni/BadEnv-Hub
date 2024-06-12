// pages/api/bounties/edit.js
//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id, title, description, endDate, reward } = req.body;

    if (!id || !title || !description || !endDate || !reward) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }

    try {
      const updatedBounty = await prisma.bounty.update({
        where: { id },
        data: { title, description, endDate, reward },
      });

      res.status(200).json({ success: true, bounty: updatedBounty });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
