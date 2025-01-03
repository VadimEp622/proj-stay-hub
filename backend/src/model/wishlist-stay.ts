import mongoose, { Schema } from "mongoose";
import { IWishlistStayModel } from "../types/wishlist-stay.types.ts";

// By default, Mongoose adds an _id property to your schemas.
// When you create a new document with the automatically added _id property, Mongoose creates a new _id of type ObjectId to your document.
const wishlistStaySchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    stayId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IWishlistStayModel>(
  "wishlistStay",
  wishlistStaySchema,
  "wishlistStay"
);

wishlistStaySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // pointless version field
    delete returnedObject.__v;
  },
});
