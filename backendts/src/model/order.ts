import mongoose, { Schema } from "mongoose";
import { IOrderModel } from "../types/order.types.ts";

const orderSchema: Schema = new Schema(
  {
    byUserId: {
      type: Schema.Types.ObjectId,
    },
    aboutUserId: {
      type: Schema.Types.ObjectId,
    },
    content: {
      type: {
        buyer: {
          required: true,
        },
        seller: {
          required: true,
        },
        orderDetails: {
          required: true,
        },
        orderPrice: {
          required: true,
        },
        stayDetails: {
          required: true,
        },
        explore: {
          type: Array,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

export const OrderModel = mongoose.model<IOrderModel>(
  "order",
  orderSchema,
  "order"
);

orderSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // pointless version field
    delete returnedObject.__v;
  },
});
