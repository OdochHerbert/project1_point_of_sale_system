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
    carton: {
      type: Number,
      required: [true, "Please add a category"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      trim: true,
    },
    dozen: {
      type: Number,
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
.pre('findOne', Populate('user'))
.pre('find', Populate('user'))
.pre('findOne', Populate('adminApproved'))
.pre('find', Populate('adminApproved'));


const Product = mongoose.model("Product", productSchema);
module.exports = Product;
