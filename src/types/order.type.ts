export type OrderStatus = "created" | "processing" | "settled" | "failed";
export interface IOrderInput {
  amount: number;
  currency: string;
  token: string;
  note?: string;
}

export interface IOrder extends IOrderInput {
  order_id: string;
  status: OrderStatus;
  created_at: string;
}
