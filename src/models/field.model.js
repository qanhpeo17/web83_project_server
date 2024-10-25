import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  available: {
    type: Number,
  },
  pricePerHour: {
    type: Number,
  },
  childField: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fieldChild",
    },
  ],
});

const Field = mongoose.model("Field", fieldSchema);

export default Field;
