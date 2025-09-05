import { IOrderInput, IOrder } from "@/types/order.type";
import { handleGetRequest, handlePostRequest } from "./httpClient.service";
import { IHttpResponse } from "@/types/http.type";

// make a network request to create order
export const createOrder = async (order: IOrderInput) => {
  return await handlePostRequest<IOrderInput, IHttpResponse<IOrder>>(
    "/api/mock/orders/create",
    order
  );
};

// get orders
export const getOrders = async () => {
  return await handleGetRequest("/api/mock/orders/get");
};

// get orders
export const getSingleOrder = async (orderId: string) => {
  return await handleGetRequest(`/api/mock/orders/${orderId}`);
};
