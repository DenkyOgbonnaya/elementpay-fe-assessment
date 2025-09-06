import orderModel from "@/db/order.model";

export async function GET() {
  const orders = orderModel.get();
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
