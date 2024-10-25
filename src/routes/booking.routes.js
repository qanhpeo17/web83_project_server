import { Router } from "express";
import bookingController from "../controller/booking.controller.js";

const bookingRouter = Router();

bookingRouter.post("/", bookingController.postBooking);
bookingRouter.get("/", bookingController.getBooking);
bookingRouter.get("/:id", bookingController.getBookingById);
bookingRouter.delete("/:id", bookingController.deleteBooking);
bookingRouter.get("/user/:userId", bookingController.getBookingByUserId);
export default bookingRouter;
