import envConfig from "@/configs/env.config";
import orderModel from "@/db/order.model";
import { broadcastOrderUpdate } from "@/utils/orderSubscribers";
import crypto from "crypto";
import { NextResponse } from "next/server";

const WEBHOOK_SECRET = envConfig.WEBHOOK_SECRET;

// constant-time compare
function safeCompare(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);

  if (aBuf.length !== bBuf.length) return false;

  return crypto.timingSafeEqual(aBuf, bBuf);
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text(); // raw body is needed for HMAC
    const sigHeader = req.headers.get("x-webhook-signature");

    if (!sigHeader) {
      return NextResponse.json(
        { error: "Missing signature header" },
        { status: 400 }
      );
    }

    // parse signature header: t=<unix_ts>,v1=<base64sig>
    const match = sigHeader.match(/t=(\d+),v1=([A-Za-z0-9+/=]+)/);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid signature header" },
        { status: 400 }
      );
    }

    const [, tStr, v1] = match;
    const timestamp = parseInt(tStr, 10);

    // freshness check (reject if |now - t| > 300s)
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - timestamp) > 300) {
      return NextResponse.json({ error: "Stale timestamp" }, { status: 400 });
    }

    // compute HMAC
    const mac = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(`${timestamp}.${rawBody}`)
      .digest("base64");

    if (!safeCompare(mac, v1)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    // now safe to parse JSON
    const event = JSON.parse(rawBody);

    if (event.type === "order.settled" || event.type === "order.failed") {
      const { order_id, status } = event.data;

      const order = orderModel.find(order_id);

      //ignore duplicates, only update if the mock polling has not
      // finalized(settled/failed) the order
      if (order && !["settled", "failed"].includes(order.status)) {
        // update order in store
        orderModel.updateStatus(order_id, status);

        // broadcast order update in real time to client subscribers
        broadcastOrderUpdate(order.order_id, status);
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Webhook error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
