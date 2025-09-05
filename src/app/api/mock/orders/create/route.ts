import orderModel from "@/db/order.model";
import { IOrderInput } from "@/types/order.type";
import { NextRequest } from "next/server";

import { z } from "zod";

// schema for the request body
const createOrderSchema = z.object({
  amount: z.number("Enter order amount"),
  currency: z.string("Currency is required"),
  token: z.string("Token is required"),
  note: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body: IOrderInput = await req.json();

    // Validate the request body using Zod
    await createOrderSchema.parseAsync(body);

    // create new order
    const newOrder = await orderModel.create(body);

    return new Response(
      JSON.stringify({
        message: "Order created",
        data: newOrder,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const validationErrors: { [x: string]: string } = {};

      error.issues.forEach((err) => {
        const pathString = err.path[0] ?? "";

        validationErrors[pathString.toString()] = err.message;
      });

      return Response.json(
        {
          message: `Something went wrong, Check for validation errors: ${
            Object.values(validationErrors)[0]
          }`,
          error: validationErrors,
        },
        { status: 400 }
      );
    }
    // Handle other potential errors
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
