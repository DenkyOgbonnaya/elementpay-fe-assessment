"use client";

const orders = [
  {
    order_id: "ord_0xabc123",
    status: "created",
    amount: 1500,
    currency: "KES",
    token: "USDC",
    created_at: "2025-09-02T10:00:00Z",
  },
  {
    order_id: "ord_0xdef456",
    status: "completed",
    amount: 2500,
    currency: "USD",
    token: "ETH",
    created_at: "2025-09-03T14:30:00Z",
  },
  {
    order_id: "ord_0xghi789",
    status: "pending",
    amount: 1000,
    currency: "NGN",
    token: "BTC",
    created_at: "2025-09-04T08:45:00Z",
  },
];

export default function OrdersTable() {
  const statusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
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
    <div className="max-w-5xl mx-auto mt-8 shadow-md rounded-2xl">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Token</th>
                <th className="px-4 py-3">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td className="px-4 py-3 font-medium">{order.order_id}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {order.amount.toLocaleString()} {order.currency}
                  </td>
                  <td className="px-4 py-3">{order.token}</td>
                  <td className="px-4 py-3">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
