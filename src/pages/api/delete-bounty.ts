// pages/api/delete-bounty.js
//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id: bountyId } = req.body;

    if (!bountyId) {
      res
        .status(400)
        .json({ success: false, message: "Bounty ID is required" });
      return;
    }

    try {
      // Delete the bounty from the database
      await prisma.bounty.delete({
        where: {
          id: bountyId,
        },
      });

      res
        .status(200)
        .json({ success: true, message: "Bounty deleted successfully" });
    } catch (error) {
      // Handle any errors during the delete process
      if (error.code === "P2025") {
        // Handle specific case where the bounty doesn't exist
        res.status(404).json({ success: false, message: "Bounty not found" });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  } else {
    // Handle incorrect request method
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};
