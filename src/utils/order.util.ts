import { IOrder, OrderStatus } from "@/types/order.type";

/*
*
Returns the order with a time-based status.
Behavior:
 0–7s → created
 8–17s → processing
 ≥18s → settled (80%) or failed (20%)
*
*/
export const getOrderStatus = (order: IOrder): OrderStatus => {
  // If status already set to settled/failed, return it (idempotent)
  if (order.status === "settled" || order.status === "failed") {
    return order.status;
  }

  const now = Date.now();
  const createdTime = new Date(order.created_at).getTime();
  const diffSeconds = Math.floor((now - createdTime) / 1000);

  if (diffSeconds <= 7) {
    order.status = "created";
  } else if (diffSeconds <= 17) {
    order.status = "processing";
  } else {
    // Once it reaches ≥18s, lock in a final status
    if (
      !order.status ||
      order.status === "created" ||
      order.status === "processing"
    ) {
      order.status = Math.random() < 0.8 ? "settled" : "failed";
    }
  }

  return order.status;
};
