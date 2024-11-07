import { Router } from "express";
import bookingController from "../controller/booking.controller.js";

const bookingRouter = Router();

bookingRouter.get("/", bookingController.getBooking);
bookingRouter.get("/weekly-bookings", bookingController.getWeeklyBookings);
bookingRouter.get("/:id", bookingController.getBookingById);
bookingRouter.get("/user/:userId", bookingController.getBookingByUserId);
bookingRouter.post("/", bookingController.postBooking);

bookingRouter.delete("/:id", bookingController.deleteBooking);

export default bookingRouter;
