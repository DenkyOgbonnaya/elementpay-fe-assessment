import { IOrder } from "@/types/order.type";

interface Props {
  order: IOrder;
}
export default function OrderDetails({ order }: Props) {
  const statusColor = (status: string) => {
    switch (status) {
      case "settled":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "created":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="overflow-x-auto bg-surface p-6 rounded-xl shadow-lg">
      <table className="w-full border-collapse">
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="py-3 px-4 font-medium text-gray-600">Order ID</td>
            <td className="py-3 px-4">{order.order_id}</td>
          </tr>
          <tr>
            <td className="py-3 px-4 font-medium text-gray-600">Status</td>
            <td className="py-3 px-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </td>
          </tr>
          <tr>
            <td className="py-3 px-4 font-medium text-gray-600">Amount</td>
            <td className="py-3 px-4">
              {order.amount.toLocaleString()} {order.currency}
            </td>
          </tr>
          <tr>
            <td className="py-3 px-4 font-medium text-gray-600">Token</td>
            <td className="py-3 px-4">{order.token}</td>
          </tr>
          <tr>
            <td className="py-3 px-4 font-medium text-gray-600">Created At</td>
            <td className="py-3 px-4">
              {new Date(order.created_at).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="py-3 px-4 font-medium text-gray-600">Note</td>
            <td className="py-3 px-4">{order.note ?? ""}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
