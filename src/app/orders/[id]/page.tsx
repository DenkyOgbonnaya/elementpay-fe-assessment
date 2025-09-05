import { getSingleOrder } from "@/services/order.service";
import { Suspense } from "react";
import OrderDetails from "./_components/orderDetails";
import { IHttpError } from "@/types/http.type";

import OrderNotFound from "./_components/orderNotFound";
import Header from "@/app/_components/header";

async function fetchOrder(orderId: string) {
  try {
    const { data } = await getSingleOrder(orderId);

    return data;
  } catch (error) {
    const err = error as IHttpError<string>;

    return err.response.data;
  }
}

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetchOrder(id);

  return (
    <>
      <Header />
      <main className="p-4 max-w-2xl mx-auto mt-8 shadow-md rounded-2xl">
        <h1 className="text-xl font-semibold mb-4">Order Details</h1>
        <Suspense
          fallback={
            <div>
              <p>Loading...</p>
            </div>
          }
        >
          {"error" in res ? (
            <OrderNotFound error={res} />
          ) : (
            <OrderDetails order={res} />
          )}
        </Suspense>
      </main>
    </>
  );
}
