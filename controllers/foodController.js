import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// add food
const addFood = async (req, res) => {
  try {
    const files = req.files;
    let image_filename = files[0].path;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// delete food

function getCloudinaryPublicId(url) {
  const parts = url.split("/upload/")[1]; // Gets: v1744589910/GrabNGo/sitwelvipvbtdidmhvzj.png
  const withoutVersion = parts.split("/").slice(1).join("/"); // Removes v1744589910
  const publicId = withoutVersion.replace(/\.[^/.]+$/, ""); // Remove file extension
  return publicId; 
}

async function deleteImage(id) {
  try {
    const result = await cloudinary.uploader.destroy(id);

  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    const imageid = getCloudinaryPublicId(food.image);
    deleteImage(imageid);

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { listFood, addFood, removeFood };
