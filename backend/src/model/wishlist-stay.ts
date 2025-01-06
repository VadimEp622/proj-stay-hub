import mongoose, { Schema } from "mongoose";
import { IWishlistStayModel } from "../types/wishlist-stay.types.ts";

// ************************************************** EXTRA NOTE **************************************************
// NOTE: a possible structure for wishlist doc, is to implement "Expire Documents with Filter Conditions" (partial TTL index)
//      * wishlist doc will have an isWishlist boolean field.
//      * on first wishlist PUT, doc will be created with isWishlist = true.
//      * on second wishlist PUT, doc will be updated with isWishlist = false, etc...
//      * IF a certain amount of time is passed, and isWishlist is false, then doc will be removed.
//      * doc will NOT be removed if isWishlist is true!!!
//      * this will prevent wishlist collection from infinitely growing.
// ****************************************************************************************************************

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

export const wishlistStayModel = mongoose.model<IWishlistStayModel>(
  "wishlistStay",
  wishlistStaySchema,
  "wishlistStay"
);

wishlistStaySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // pointless updatedAt field
    delete returnedObject.updatedAt;
    // pointless version field
    delete returnedObject.__v;
  },
});
