import orderModel from "@/db/order.model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const orders = await orderModel.get();
  return new Response(
    JSON.stringify({
      message: "Orders fetched successfully",
      data: orders,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
