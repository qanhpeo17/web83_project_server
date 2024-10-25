import { Router } from "express";
import adminController from "../controller/admin.controller.js";
const adminRouter = Router();

adminRouter.get("/bookings", adminController.getBooking);
adminRouter.delete("/delete-booking", adminController.deleteBooking);
export default adminRouter;