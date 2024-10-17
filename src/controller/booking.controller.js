import Booking from "../models/booking.model.js";
import Field from "../models/field.model.js";
import User from "../models/user.model.js";
const getBooking = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user").populate("field");
    res.status(200).json({
      message: "thanh cong",
      bookings,
    });
  } catch (err) {
    res.status(500).json({
      message: "Loi server",
      err,
    });
  }
};
const postBooking = async (req, res) => {
  try {
    const { phone, fieldId, referee, ball, rentalDate, rentalTime } = req.body;
    if (!phone || !fieldId || !referee || !ball || !rentalDate || !rentalTime) {
      return res.status(404).json({
        message: "Thieu thong tin",
      });
    }

    if (ball < 1 || ball > 2) {
      return res.status(404).json({
        message: "Thong tin khong hop le",
      });
    }
    const user = req.user;
    const _user = await User.findById(user.id);
    const field = await Field.findById(fieldId);
    if (!field) {
      return res.status(404).json({
        message: "Không tìm thấy sân",
      });
    }
    console.log(_user);
    const bookInfo = {
      user: _user,
      phone: phone,
      field: field,
      referee: referee,
      ball: ball,
      rentalDate: rentalDate,
      rentalTime: rentalTime,
    };
    const newBooking = await Booking.create(bookInfo);
    res.status(201).json({
      message: "Dat san thanh cong",
      newBooking,
    });
  } catch (err) {
    res.status(500).json({
      message: "Loi server",
      err,
    });
  }
};
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user")
      .populate("field");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({
      message: "Loi server",
      err,
    });
  }
};
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Loi server",
      err,
    });
  }
};
const bookingController = {
  getBooking,
  postBooking,
  getBookingById,
  deleteBooking,
};

export default bookingController;
