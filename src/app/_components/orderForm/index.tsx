"use client";
import WalletConnection from "@/components/walletConnection";
import { useForm, SubmitHandler } from "react-hook-form";

import { useState } from "react";
import { useAccount } from "wagmi";
import { IOrderInput } from "@/types/order.type";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";

export default function OrderForm() {
  const [isConnected] = useState(true); // useAccount();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IOrderInput>();
  const onSubmit: SubmitHandler<IOrderInput> = (data) => console.log(data);
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
          </div>

          <button
            type="submit"
            className="w-full mt-8 py-2 rounded-lg bg-primary text-white hover:opacity-90 disabled:opacity-40"
          >
            Create Order
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
