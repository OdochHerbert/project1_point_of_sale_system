const mongoose = require("mongoose");

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a store name"],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
