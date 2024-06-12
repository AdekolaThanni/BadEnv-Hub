//@ts-nocheck

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import prisma from "@/lib/prisma";


async function createDiscountCode(couponCode: string, discount: number) {
  console.log({couponCode, discount})
  // Create a Price Rule
  const createPriceRuleResponse = await axios.post(
    `${process.env.SHOPIFY_ENDPOINT}/price_rules.json`,
    {
      price_rule: {
        title: "Discount for " + couponCode,
        target_type: "line_item",
        target_selection: "all",
        allocation_method: "across",
        value_type: "percentage",
        value: `-${discount}`, // This means a discount of 10%
        customer_selection: "all",
        starts_at: new Date().toISOString(),
      },
    },
    {
      headers: {
        "X-Shopify-Access-Token": proocess.env.SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

  const priceRuleId = createPriceRuleResponse.data.price_rule.id;

  // Create a Discount Code with the Price Rule ID
  const discountCodeResponse = await axios.post(
    `${SHOPIFY_ENDPOINT}/price_rules/${priceRuleId}/discount_codes.json`,
    {
      discount_code: {
        code: couponCode,
        usage_limit: 1,
      },
    },
    {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

  return discountCodeResponse.data.discount_code.code;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { couponCode, discount, walletAddress } = req.body;

    try {
      let wallet = await prisma.wallet.findFirst({
        where: { address: walletAddress },
      });

      if (wallet) {
        res.status(200).json({ success: true, code: wallet.code, user: wallet });
      } else {
        const code = await createDiscountCode(couponCode, discount);


        wallet = await prisma.wallet.create({
          data: {
            address: walletAddress,
            code: code,
          },
        });

        res.status(200).json({ success: true, code: wallet.code, user: wallet });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};
