import mongoose from "mongoose";

const fieldChildSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
  },
});

const fieldChild = mongoose.model("fieldChild", fieldChildSchema);
export default fieldChild;
