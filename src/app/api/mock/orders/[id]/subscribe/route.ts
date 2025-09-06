import { NextRequest } from "next/server";

// simple in-memory store for pub/sub
const orderSubscribers = new Map<
  string,
  Set<ReadableStreamDefaultController>
>();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const orderId = (await params).id;

  // SSE headers
  const headers = new Headers({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  // Create a new stream for this client
  const stream = new ReadableStream({
    start(controller) {
      // Add client to subscribers
      if (!orderSubscribers.has(orderId)) {
        orderSubscribers.set(orderId, new Set());
      }
      orderSubscribers.get(orderId)!.add(controller);

      // Send an event immediately
      controller.enqueue(
        `data: ${JSON.stringify({ status: "subscribed", orderId })}\n\n`
      );
    },
    cancel() {
      // Cleanup if client disconnects

      orderSubscribers.get(orderId)?.delete(this as any);
    },
  });

  return new Response(stream, { headers });
}

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
