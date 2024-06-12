//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      // Fetch all bounties from the database and count their submissions
      const bounties = await prisma.bounty.findMany({
        include: {
          _count: {
            select: { submissions: true }, // Count submissions for each bounty
          },
        },
      });

      // Add submission count to each bounty object
      const bountiesWithSubmissionCount = bounties.map((bounty) => ({
        ...bounty,
        submissionCount: bounty._count.submissions,
      }));

      res
        .status(200)
        .json({ success: true, bounties: bountiesWithSubmissionCount });
    } catch (error) {
      // Handle any errors during the fetch process
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    // Handle incorrect request method
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};
