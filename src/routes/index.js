import { Router } from "express";
import fieldRouter from "./field.routes.js";
import authRouter from "./auth.routes.js";
import bookingRouter from "./booking.routes.js";
import authorizationToken from "../middleware/auth.mdw.js";
import checkAdmin from "../middleware/admin.mdw.js";
import adminRouter from "./admin.routes.js";

const router = Router();

router.use("/field", fieldRouter);
router.use("/auth", authRouter);
router.use("/booking", authorizationToken, bookingRouter);
router.use("/admin", checkAdmin, adminRouter);
export default router;
