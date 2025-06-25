import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Address", // ✅ CORRECT
  required: true,
},
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Shipped", "Delivered", "Cancelled"],
    },
    paymentType: {
      type: String,
      enum: ["Online", "COD"],
      default: "Online",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
