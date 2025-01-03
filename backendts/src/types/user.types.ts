import { Types } from "mongoose";

// INFO: You as the developer are responsible for ensuring that your document interface lines up with your Mongoose schema. For example, Mongoose won't report an error if email is required in your Mongoose schema but optional in your document interface.
// CONCLUSION: The interface, does not matter for the database interaction itself.

// Full way the user doc is in the db
export interface IUserModel {
  _id: Types.ObjectId;
  username: string;
  password: string;
  fullname: string;
  imgUrl?: string;
  wishlist: any[];
  trip: any[];
  createdAt?: NativeDate;
  updatedAt?: NativeDate;
  __v?: number;
}

// Only the needed relevant fields
export interface IUser {
  _id: Types.ObjectId;
  username: string;
  fullname: string;
  imgUrl?: string;
  wishlist: any[];
  trip: any[];
  createdAt?: NativeDate;
}
