// simple in-memory store for pub/sub
export const orderSubscribers = new Map<
  string,
  Set<ReadableStreamDefaultController>
>();

// Helper to broadcast updates to all clients of an order
export function broadcastOrderUpdate(orderId: string, status: string) {
  const subs = orderSubscribers.get(orderId);
  if (!subs) return;

  const msg = `data: ${JSON.stringify({ orderId, status })}\n\n`;

  for (const sub of subs) {
    try {
      sub.enqueue(msg);
    } catch (err) {
      console.error("SSE enqueue failed", err);
      subs.delete(sub);
    }
  }
}
