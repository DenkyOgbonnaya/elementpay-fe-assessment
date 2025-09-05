import { getOrders } from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";

// retuen list of orders
export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getOrders(),
  });
};
