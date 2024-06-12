//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

async function getOrdersByCouponCode(couponCode: any) {
  try {
    const response = await axios.get(`${process.env.SHOPIFY_ENDPOINT}/orders.json`, {
      headers: {
        "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    });

    let confirmedReferrals: any = [];
    let pendingReferrals: any = [];
    let totalBalance = 0;

    response.data.orders.forEach((order: any) => {
      if (
        order.discount_codes.some(
          (discount: any) => discount.code === couponCode
        )
      ) {
        if (order.financial_status === "paid") {
          confirmedReferrals.push(order);
          totalBalance += order.current_total_price * 0.1; // 10% of total price
        } else {
          pendingReferrals.push(order);
        }
      }
    });

    return {
      confirmedReferrals,
      pendingReferrals,
      totalBalance,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const couponCode = req.query.couponCode;
    try {
      const { confirmedReferrals, pendingReferrals, totalBalance } =
        await getOrdersByCouponCode(couponCode);

      res.status(200).json({
        success: true,
        data: {
          confirmedReferrals: confirmedReferrals.length,
          pendingReferrals: pendingReferrals.length,
          totalBalance,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }
};
