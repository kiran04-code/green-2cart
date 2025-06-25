import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offerPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: [String], // Array of image URLs or filenames
    required: true,
  },
  description: {
    type: [String], // Array of description lines
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
},{timestamps:true}); // adds createdAt and updatedAt automatically

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
