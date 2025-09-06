"use client";

import { pollOrder } from "@/services/order.service";
import { OrderStatus } from "@/types/order.type";
import { useEffect, useState, useRef } from "react";

//
export function useOrderStatus(orderId: string | null) {
  const [status, setStatus] = useState<OrderStatus>("created");
  const finalized = useRef(false); // ensures idempotency

  useEffect(() => {
    if (!orderId) return;

    let events: EventSource | null = null;
    let pollingInterval: NodeJS.Timeout | null = null;
    let timeout: NodeJS.Timeout | null = null;

    function finalize(newStatus: OrderStatus) {
      if (finalized.current) return; // idempotent
      finalized.current = true;

      setStatus(newStatus);

      // cleanup everything
      if (events) events.close();
      if (pollingInterval) clearInterval(pollingInterval);
      if (timeout) clearTimeout(timeout);
    }

    //  Setup SSE subscription
    events = new EventSource(`/api/mock/orders/${orderId}/subscribe`);
    events.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.status === "settled" || data.status === "failed") {
          finalize(data.status);
        } else {
          if (data.status != "subscribed") setStatus(data.status);
        }
      } catch (err) {
        console.error("SSE parse error", err);
      }
    };
    events.onerror = (err) => {
      console.error("SSE error", err);
      // don’t finalize, fallback to polling
    };

    //  Setup Polling fallback
    pollingInterval = setInterval(async () => {
      try {
        const order = await pollOrder(orderId);

        if (order.data.status === "settled" || order.data.status === "failed") {
          finalize(order.data.status);
        } else {
          setStatus(order.data.status);
        }
      } catch (err) {
        console.error("Polling error", err);
      }
    }, 3000); // poll every 3s

    //  Setup 60s timeout
    timeout = setTimeout(() => {
      finalize("timeout");
    }, 60000);

    return () => {
      if (events) events.close();
      if (pollingInterval) clearInterval(pollingInterval);
      if (timeout) clearTimeout(timeout);
    };
  }, [orderId]);

  return status;
}
