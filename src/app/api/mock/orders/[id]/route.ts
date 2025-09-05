import orderModel from "@/db/order.model";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = await orderModel.find(id);

  if (!order) {
    return new Response(
      JSON.stringify({
        error: "order_not_found",
        message: `No order with id ${id}`,
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Order fetched successfully",
      data: order,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
