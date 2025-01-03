import { Types } from "mongoose";

// Full way the doc is in the db
export interface IStayModel {
  _id: Types.ObjectId;
  name?: string;
  type?: string;
  imgUrls?: any[];
  price?: number;
  summary?: string;
  capacity?: number;
  amenities?: any[];
  bathrooms?: number;
  bedrooms?: number;
  roomType?: string;
  host?: any;
  loc?: any;
  reviews?: any[];
  likedByUsers?: any[];
  availableDates?: any[];
  createdAt?: NativeDate;
  updatedAt?: NativeDate;
  __v?: number;
}

// Only the needed relevant fields
export interface IStay {
  _id: Types.ObjectId;
  name?: string;
  type?: string;
  imgUrls?: any[];
  price?: number;
  summary?: string;
  capacity?: number;
  amenities?: any[];
  bathrooms?: number;
  bedrooms?: number;
  roomType?: string;
  host?: any;
  loc?: any;
  reviews?: any[];
  likedByUsers?: any[];
  availableDates?: any[];
  createdAt?: NativeDate;
}
