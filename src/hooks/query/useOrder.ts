import { getSingleOrder } from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";

// return a single order using order ID
export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["order-detailss", orderId],
    queryFn: async () => await getSingleOrder(orderId),
  });
};
