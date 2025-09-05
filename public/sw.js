self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
});

let pollingInterval = null;

self.addEventListener("message", (event) => {
  const { type, orderId } = event.data;

  if (type === "START_POLLING") {
    startPolling(orderId);
  }

  if (type === "STOP_POLLING") {
    stopPolling();
  }
});

function startPolling(orderId) {
  if (pollingInterval) return;

  pollingInterval = setInterval(async () => {
    try {
      const res = await fetch(`/api/mock/orders/poll/${orderId}`);
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Notify all clients (open tabs)

      const clients = await self?.clients.matchAll();
      const orderStatus = data?.data?.status ?? "failed";

      clients.forEach((client) => {
        client.postMessage({
          type: "ORDER_STATUS",
          orderId,
          status: orderStatus,
        });
      });

      if (orderStatus === "settled" || orderStatus === "failed") {
        stopPolling();
      }
    } catch (err) {
      console.error("Polling error:", err);
    }
  }, 5000);
}

function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}
