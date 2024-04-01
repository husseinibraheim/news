import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
