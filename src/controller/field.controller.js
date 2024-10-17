import Field from "../models/field.model.js";
const createField = async (req, res) => {
  try {
    const { fieldName, fieldLocation, fieldImage, fieldQuantity } = req.body;
    if (!fieldName || !fieldLocation || !fieldImage || !fieldQuantity) {
      return res.status(404).json({
        message: "Thieu thong tin",
        data: null,
      });
    }
    const field = {
      name: fieldName,
      location: fieldLocation,
      image: fieldImage,
      quantity: fieldQuantity,
    };
    const fieldAdded = await Field.create(field);
    // const field = new Field(req.body);
    // await field.save();
    console.log(fieldAdded);
    res.status(201).json({
      message: "Them san thanh cong",
      fieldAdded,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};
const getField = async (req, res) => {
  try {
    const fields = await Field.find();
    res.json({
      message: "Thanh cong",
      fields,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};
const getFieldById = async (req, res) => {
  try {
    const field = await Field.findById(req.params.id);
    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }
    res.json(field);
  } catch (err) {
    next(err);
  }
};
const fieldController = {
  getField,
  createField,
  getFieldById,
};
export default fieldController;
