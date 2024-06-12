//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      // Get products from Shopify
      const productsResponse = await axios.get(
        `${process.env.SHOPIFY_ENDPOINT}/products.json`,
        {
          headers: {
            "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      // Respond to the client with the fetched products
      res.status(200).json({ success: true, data: productsResponse.data });
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        // If the error is from Axios, respond with the error response from Shopify
        res
          .status(error.response?.status || 500)
          .json({
            success: false,
            message: error.response?.data || error.message,
          });
      } else {
        // If the error is not from Axios, respond with a server error
        res.status(500).json({ success: false, message: "Server error" });
      }
    }
  } else {
    // If the request method is not GET, return method not allowed
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};
