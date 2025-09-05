"use client";
import WalletConnection from "@/components/walletConnection";
import { useForm, SubmitHandler } from "react-hook-form";

import { useState } from "react";
import { useAccount } from "wagmi";
import { IOrderInput } from "@/types/order.type";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/services/order.service";
import { IHttpError, IHttpResponse } from "@/types/http.type";

export default function OrderForm() {
  const [isConnected] = useState(true); // useAccount();

  const { isPending, error, mutate } = useMutation<
    IHttpResponse<IOrderInput>,
    IHttpError<IOrderInput>,
    IOrderInput
  >({
    mutationFn: async (input) => await createOrder(input),
    onSuccess(data) {},
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrderInput>();
  const onSubmit: SubmitHandler<IOrderInput> = (data) => {
    mutate({
      ...data,
      amount: Number(data.amount),
    });
  };

  return (
    <section className="max-w-3xl mx-auto text-center py-20 px-6">
      {/* Only show the create order form when the wallet is connected */}
      {isConnected ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`bg-surface p-6 rounded-xl shadow-lg max-w-md mx-auto space-y-4`}
        >
          <h3 className=" font-heading font-semibold text-lg lg:text-2xl text-text-primary">
            Create Order
          </h3>
          <div className="flex flex-col">
            <label htmlFor="amount" className="block text-left text-sm mb-1">
              Amount
            </label>
            <Input
              id="amount"
              placeholder="Enter amount"
              {...register("amount", { required: true })}
            />
            {error?.response?.data?.error.amount && (
              <span className=" font-normal font-body text-xs leading-5 text-red-500">
                {error?.response?.data?.error.amount}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="currency" className="block text-left text-sm mb-1">
              Currency
            </label>
            <Select id="currency" {...register("currency", { required: true })}>
              <option value="KES">KES</option>
              <option value="USD">USD</option>
              <option value="NGN">NGN</option>
            </Select>
            {error?.response?.data?.error.currency && (
              <span className=" font-normal font-body text-xs leading-5 text-red-500">
                {error?.response?.data?.error.currency}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="token" className="block text-left text-sm mb-1">
              Token
            </label>
            <Input
              id="token"
              placeholder="Enter Token"
              {...register("token", { required: true })}
            />
            {error?.response?.data?.error.token && (
              <span className=" font-normal font-body text-xs leading-5 text-red-500">
                {error?.response?.data?.error.token}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="note" className="block text-left text-sm mb-1">
              Note(optional)
            </label>
            <Input
              id="note"
              placeholder="Note (optional)"
              {...register("note", { required: false })}
            />
            {error?.response?.data?.error.note && (
              <span className=" font-normal font-body text-xs leading-5 text-red-500">
                {error?.response?.data?.error.note}
              </span>
            )}
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="w-full mt-8 py-2 rounded-lg bg-primary text-white hover:opacity-90 disabled:opacity-40"
          >
            {isPending ? "Processing..." : "Create Order"}
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center">
          <WalletConnection showBalance={false} />
        </div>
      )}
    </section>
  );
}
