import Booking from "../models/booking.model.js";
import Field from "../models/field.model.js";
import fieldChild from "../models/fieldChild.model.js";
const createField = async (req, res) => {
  try {
    const {
      fieldName,
      fieldLocation,
      fieldImage,
      fieldQuantity,
      pricePerHour,
      childField,
    } = req.body;
    if (!fieldName || !fieldLocation || !fieldImage || !fieldQuantity) {
      return res.status(404).json({
        message: "Thieu thong tin",
        data: null,
      });
    }
    const available = 0;

    const field = {
      name: fieldName,
      location: fieldLocation,
      image: fieldImage,
      quantity: fieldQuantity,
      available: available,
      pricePerHour: pricePerHour,
      childField: childField,
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
    for (let i = 0; i < fields.length; i++) {
      fields[i].available = await Booking.find({
        field: fields[i]._id,
      }).countDocuments();
    }
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
    const { fieldId } = req.params;
    const field = await Field.findById(fieldId);
    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }
    res.json(field);
  } catch (err) {
    res.status(500).json({ message: "Loi server " + err.message });
  }
};

const createChildField = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image)
      return res.status(404).json({
        message: "Thieu thong tin",
      });
    const isAvailable = false;
    const newChild = {
      name: name,
      image: image,
      isAvailable: isAvailable,
    };
    const saveNewChild = await fieldChild.create(newChild);
    res.status(200).json({
      message: "Thanh cong",
      saveNewChild,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server " + error.message,
    });
  }
};
const getChildFIeld = async (req, res) => {
  try {
    const { fieldId } = req.params;

    // Kiểm tra nếu fieldId không tồn tại
    if (!fieldId) {
      return res.status(400).json({
        message: "Thiếu thông tin fieldId",
      });
    }

    // Tìm kiếm Field theo fieldId
    const field = await Field.findById(fieldId).populate("childField"); // Giả sử bạn đã kết nối childField với field

    if (!field) {
      return res.status(404).json({
        message: "Không tìm thấy sân với fieldId này",
      });
    }

    // Trả về danh sách sân con
    res.status(200).json({
      message: "OK",
      childFields: field.childField || [], // Nếu không có sân con thì trả về mảng rỗng
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};
const getChildById = async (req, res) => {
  const { childId } = req.params;
  if (!childId) return res.status(404).json({ message: "Thieu thong tin" });
  const childField = await fieldChild.findById(childId);
  res.status(200).json({
    message: "OK",
    childField,
  });
};
const fieldController = {
  getField,
  createField,
  getFieldById,
  createChildField,
  getChildFIeld,
  getChildById,
};
export default fieldController;
