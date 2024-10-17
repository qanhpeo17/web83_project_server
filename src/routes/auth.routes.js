import { Router } from "express";
import authController from "../controller/auth.controller.js";
import authorizationToken from "../middleware/auth.mdw.js";
const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/token", authController.getRefToken);
authRouter.post("/logout", authController.logout);
authRouter.get("/protected-data", authorizationToken, (req, res) => {
  const protectedData = {
    message: "This is protected data",
    user: req.user,
    data: {
      id: 1,
      name: "Sample Data",
      description: "This is a description of the protected data",
    },
  };

  res.json(protectedData);
});
export default authRouter;
