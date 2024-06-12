//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { title, description, endDate, reward } = req.body;

    // Basic validation for the input data
    if (!title || !description || !endDate || !reward) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }

    try {
      // Create a new bounty in the database
      const newBounty = await prisma.bounty.create({
        data: {
          title,
          description,
          endDate: new Date(endDate), // Ensure endDate is converted to a Date object
          reward,
        },
      });

      // Respond with the created bounty
      res.status(200).json({ success: true, bounty: newBounty });
    } catch (error) {
      // Handle any errors during the creation process
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    // Handle incorrect request method
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};
