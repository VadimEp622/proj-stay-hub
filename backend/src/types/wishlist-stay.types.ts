import { Types } from "mongoose";

// INFO: You as the developer are responsible for ensuring that your document interface lines up with your Mongoose schema. For example, Mongoose won't report an error if email is required in your Mongoose schema but optional in your document interface.
// CONCLUSION: The interface, does not matter for the database interaction itself.

// Full way the user doc is in the db
export interface IWishlistStayModel {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  stayId: Types.ObjectId;
  createdAt: NativeDate;
  updatedAt: NativeDate;
  __v: number;
}

// Only the needed relevant fields
export interface IWishlistStay {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  stayId: Types.ObjectId;
  createdAt: NativeDate;
}
