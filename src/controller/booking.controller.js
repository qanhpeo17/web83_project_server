import Booking from "../models/booking.model.js";
import Field from "../models/field.model.js";
import fieldChild from "../models/fieldChild.model.js";
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
// const postBooking = async (req, res) => {
//   try {
//     const {
//       phone,
//       fieldId,
//       fieldChildId,
//       referee,
//       ball,
//       rentalDate,
//       rentalTime,
//     } = req.body;

//     if (
//       !phone ||
//       !fieldId ||
//       !fieldChildId || // Đã sửa: !fieldChildId
//       !referee ||
//       !ball ||
//       !rentalDate ||
//       !rentalTime
//     ) {
//       return res.status(404).json({
//         message: "Thiếu thông tin",
//       });
//     }

//     if (ball < 1 || ball > 2) {
//       return res.status(404).json({
//         message: "Thông tin không hợp lệ",
//       });
//     }

//     const user = req.user; // Assumes user authentication middleware
//     const _user = await User.findById(user.id);
//     const field = await Field.findById(fieldId);

//     if (!field) {
//       return res.status(404).json({
//         message: "Không tìm thấy sân",
//       });
//     }
//     if (field.available >= field.quantity) {
//       return res.status(404).json({
//         message: "Het san",
//       });
//     }
//     const bookInfo = {
//       user: _user,
//       phone: phone,
//       field: field,
//       fieldChild: fieldChildId,
//       referee: referee,
//       ball: ball,
//       rentalDate: rentalDate,
//       rentalTime: rentalTime,
//     };

//     const newBooking = await Booking.create(bookInfo);

//     field.available += 1;
//     await field.save();
//     console.log(field);
//     res.status(201).json({
//       message: `Đặt sân thành công, còn ${
//         field.quantity - field.available
//       } sân`,
//       newBooking,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Lỗi server",
//       err,
//     });
//   }
// };
const postBooking = async (req, res) => {
  try {
    const {
      phone,
      fieldId,
      fieldChildId,
      referee,
      ball,
      rentalDate,
      rentalTime,
    } = req.body;

    if (
      !phone ||
      !fieldId ||
      !fieldChildId ||
      !referee ||
      !ball ||
      !rentalDate ||
      !rentalTime
    ) {
      return res.status(400).json({
        message: "Thiếu thông tin bắt buộc",
      });
    }

    if (ball < 1 || ball > 2) {
      return res.status(400).json({
        message: "Thông tin bóng không hợp lệ",
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

    // Check if there is availability
    if (field.available >= field.quantity) {
      return res.status(400).json({
        message: "Hết sân",
      });
    }

    // Create booking
    const bookInfo = {
      user: _user,
      phone,
      field: fieldId,
      fieldChild: fieldChildId,
      referee,
      ball,
      rentalDate,
      rentalTime,
    };

    const newBooking = await Booking.create(bookInfo);

    // Update the availability count
    field.available += 2; // Increment the booked count
    await field.save(); // Save the updated field instance

    res.status(201).json({
      message: `Đặt sân thành công, còn ${
        field.quantity - field.available
      } sân`,
      newBooking,
    });
  } catch (err) {
    res.status(500).json({
      message: "Lỗi server",
      err: err.message,
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
const getBookingByUserId = async (req, res) => {
  try {
    //const user = req.user;

    // const bookings = await Booking.find({ user: user._id });
    const { userId } = req.params;
    console.log(userId);
    const bookings = await Booking.find({ user: userId });
    if (!bookings)
      return res.json({
        message: "Nguoi dung chua dat lich nao",
      });
    res.status(200).json({
      message: "Thanh cong",
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server " + error.message,
    });
  }
};
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy lịch đặt sân" });
    }

    const field = await Field.findById(booking.field);
    if (!field) {
      return res.status(404).json({ message: "Không tìm thấy sân" });
    }

    if (field.available > 0) {
      field.available -= 1;
    } else {
      return res.status(400).json({
        message: "Lỗi khi cập nhật số sân hữu dụng",
      });
    }

    // Attempt to save the updated field availability
    await field.save();

    // Respond with success
    res.json({ message: "Lịch xóa thành công" });
  } catch (err) {
    // Handle any errors during the delete process
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const bookingController = {
  getBooking,
  postBooking,
  getBookingById,
  deleteBooking,
  getBookingByUserId,
};

export default bookingController;
