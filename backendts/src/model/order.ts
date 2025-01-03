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
          type: Object,
          required: true,
        },
        seller: {
          type: Object,
          required: true,
        },
        orderDetails: {
          type: Object,
          required: true,
        },
        orderPrice: {
          type: Object,
          required: true,
        },
        stayDetails: {
          type: Object,
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
      _id: false, // Mongoose creates _id for single nested subdocuments or arrays/objects. To avoid this, we set _id to false
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
