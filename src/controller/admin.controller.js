import Booking from "../models/booking.model.js";

const getBooking = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      message: "loi server " + error.message,
    });
  }
};
const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId)
      return res.status(404).json({
        message: "Khong tim thay lich",
      });
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking)
      return res.status(404).json({
        message: "Khong the xoa lich",
      });
    res.status(200).json({
      message: "Xoa lich thanh cong!",
      deletedBooking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server " + error.message,
    });
  }
};
const adminController = {
  getBooking,
  deleteBooking,
};
export default adminController;
