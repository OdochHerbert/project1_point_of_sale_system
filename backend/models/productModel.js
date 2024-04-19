const mongoose = require("mongoose");
const Populate = require('../util/autopopulate');

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Please add a price"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    store: {
      type: String,
    },
    approved: {
      type: Boolean,
    },
    adminApproved: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);
// Always populate the author field
productSchema
.pre('findOne', Populate('name'))
.pre('find', Populate('name'));


const Product = mongoose.model("Product", productSchema);
module.exports = Product;
