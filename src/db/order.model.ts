import { IOrder, IOrderInput } from "@/types/order.type";
import { getOrderStatus } from "@/utils/order.util";
import { v4 as uuidv4 } from "uuid";

class Order {
  private orders = new Map<string, IOrder>();

  create(order: IOrderInput): IOrder {
    const uuid = uuidv4();
    const order_id = `ord_${uuid}`;

    const created_at = new Date().toISOString();

    const newOrder: IOrder = {
      ...order,
      order_id,
      created_at,
      status: "created",
    };

    this.orders.set(order_id, newOrder);
    return newOrder;
  }

  get(): IOrder[] {
    return Array.from(this.orders.values());
  }

  find(orderId: string): IOrder | undefined {
    if (!orderId) return undefined;

    const order = this.orders.get(orderId);
    if (!order) return undefined;

    const orderStatus = getOrderStatus(order);

    const orderWithStatus: IOrder = {
      ...order,
      status: orderStatus,
    };

    // Persist final state so it sticks
    if (order.status !== orderStatus) {
      this.orders.set(orderId, orderWithStatus);
    }

    return orderWithStatus;
  }
}

// 👇 Persist across hot reloads
const globalForOrders = globalThis as unknown as { orderModel?: Order };

const orderModel = globalForOrders.orderModel ?? new Order();

if (!globalForOrders.orderModel) {
  globalForOrders.orderModel = orderModel;
}

export default orderModel;
