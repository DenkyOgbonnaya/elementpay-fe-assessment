import { IOrder, IOrderInput } from "@/types/order.type";
import { getOrderStatus } from "@/utils/order.util";
import { v4 as uuidv4 } from "uuid";

class Order {
  private orders = new Map<string, IOrder>();

  // create a new order
  async create(order: IOrderInput): Promise<IOrder> {
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

  // get all orders
  async get(): Promise<IOrder[]> {
    return Array.from(this.orders.values());
  }

  // get a single order by ID
  async find(orderId: string): Promise<IOrder | undefined> {
    if (!orderId) return undefined;

    const order = this.orders.get(orderId);
    if (!order) return undefined;

    const orderStatus = getOrderStatus(order);

    const orderWithStatus: IOrder = {
      ...order,
      status: orderStatus,
    };

    return orderWithStatus;
  }
}

const orderModel = new Order();

export default orderModel;
