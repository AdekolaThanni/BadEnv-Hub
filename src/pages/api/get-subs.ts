//@ts-nocheck
// pages/api/submissions/all.js

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const submissions = await prisma.submission.findMany({
        include: {
          wallet: true, // Include related wallet
          bounty: true, // Include related bounty
        },
      });

      res.status(200).json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
