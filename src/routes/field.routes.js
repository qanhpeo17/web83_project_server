import { Router } from "express";
import fieldController from "../controller/field.controller.js";
const fieldRouter = Router();

fieldRouter.post("/create-field", fieldController.createField);

fieldRouter.get("/", fieldController.getField);

fieldRouter.get("/:id", fieldController.getFieldById);

// Update field by id
// router.put("/:id", async (req, res, next) => {
//   try {
//     const field = await Field.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!field) {
//       return res.status(404).json({ message: "Field not found" });
//     }
//     res.json(field);
//   } catch (err) {
//     next(err);
//   }
// });

// Delete field by id
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const field = await Field.findByIdAndDelete(req.params.id);
//     if (!field) {
//       return res.status(404).json({ message: "Field not found" });
//     }
//     res.json({ message: "Field deleted successfully" });
//   } catch (err) {
//     next(err);
//   }
// });

export default fieldRouter;
