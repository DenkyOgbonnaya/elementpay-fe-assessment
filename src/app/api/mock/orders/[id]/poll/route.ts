import orderModel from "@/db/order.model";
import { getOrderStatus } from "@/utils/order.util";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = orderModel.find(id);

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
  let orderStatus = order.status;
  //ignore duplicates, only update if the webhook has not
  // finalized(settled/failed) the order
  if (!["settled", "failed"].includes(orderStatus)) {
    // derive the current order status
    const currentOrderStatus = getOrderStatus(order);

    // update status
    orderModel.updateStatus(order.order_id, currentOrderStatus);
    orderStatus = currentOrderStatus;
  }

  return new Response(
    JSON.stringify({
      message: "Order polled successfully",
      data: {
        status: orderStatus,
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
