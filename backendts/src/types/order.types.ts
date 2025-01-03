import { Types } from "mongoose";

// Full way the doc is in the db
export interface IOrderModel {
  _id: Types.ObjectId;
  byUserId?: Types.ObjectId;
  aboutUserId?: Types.ObjectId;
  content: {
    buyer: any;
    seller: any;
    orderDetails: any;
    orderPrice: any;
    stayDetails: any;
    explore: any[];
    status: string;
  };
  createdAt?: NativeDate;
  updatedAt?: NativeDate;
  __v?: number;
}

// Only the needed relevant fields
export interface IOrder {
  _id: Types.ObjectId;
  byUserId?: Types.ObjectId;
  aboutUserId?: Types.ObjectId;
  content: {
    buyer: any;
    seller: any;
    orderDetails: any;
    orderPrice: any;
    stayDetails: any;
    explore: any[];
    status: string;
  };
  createdAt?: NativeDate;
}
