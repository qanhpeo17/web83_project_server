import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
      required: true,
    },
    referee: {
      type: Boolean,
      required: true,
    },
    ball: {
      type: Number,
      required: true,
    },
    rentalDate: {
      type: Date,
      required: true,
    },
    rentalTime: {
      type: String,
      required: true,
    },
    // booking: {
    //   type: Date,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
