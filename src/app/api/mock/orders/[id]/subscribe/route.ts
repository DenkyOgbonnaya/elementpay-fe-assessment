import { orderSubscribers } from "@/utils/orderSubscribers";
import { NextRequest } from "next/server";

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
      // @ts-expect-error type referency error
      orderSubscribers.get(orderId)?.delete(this);
    },
  });

  return new Response(stream, { headers });
}
