import mongoose, { Schema } from "mongoose";
import { IStayModel } from "../types/stay.types.ts";

const staySchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    imgUrls: {
      type: Array,
    },
    price: {
      type: Number,
    },
    summary: {
      type: String,
    },
    capacity: {
      type: Number,
    },
    amenities: {
      type: Array,
    },
    bathrooms: {
      type: Number,
    },
    bedrooms: {
      type: Number,
    },
    roomType: {
      type: String,
    },
    host: {},
    loc: {},
    reviews: {
      type: Array,
    },
    likedByUsers: {
      type: Array,
    },
    availableDates: {
      type: Array,
    },
  },
  {
    timestamps: false,
  }
);

export const StayModel = mongoose.model<IStayModel>("stay", staySchema, "stay");

staySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // pointless version field
    delete returnedObject.__v;
  },
});
