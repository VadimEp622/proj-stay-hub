import mongoose, { Schema } from "mongoose";
import { IUserModel } from "../types/user.types.ts";

// By default, Mongoose adds an _id property to your schemas.
// When you create a new document with the automatically added _id property, Mongoose creates a new _id of type ObjectId to your document.
const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    wishlist: {
      type: Array,
      required: true,
    },
    trip: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

export const UserModel = mongoose.model<IUserModel>("user", userSchema, "user");

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // never return the password
    delete returnedObject.password;
    // pointless version field
    delete returnedObject.__v;
  },
});
