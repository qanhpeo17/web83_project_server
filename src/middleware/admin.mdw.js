import jwt from "jsonwebtoken";
const checkAdmin = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        Message: "Missing Bearer token",
      });
    }

    const token = req.headers.authorization.split("Bearer ")[1];
    if (!token) {
      return res.status(403).json({
        Message: "Invalid Bearer",
      });
    }
    const user = jwt.verify(token, process.env.SECRET_KEY);
    if (!user) {
      return res.status(403).json({
        Message: "Invalid token",
      });
    }

    if (user.role === "user") {
      return res.status(401).json({
        Message: "unauthorized",
      });
    }

    req.admin = user;
    //  console.log("~ authorizationToken ~ admin: ", user);
    next();
  } catch (error) {
    return res.status(401).json({
      Message: error.Message,
    });
  }
};
export default checkAdmin;
