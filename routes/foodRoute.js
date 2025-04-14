import express from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import cloudinary from "../config/cloudinary.js";

const foodRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "GrabNGo",
    allowed_formats: ["jpeg", "png", "jpg"],
  },
});

const upload = multer({ storage });

foodRouter.get("/list", listFood);
foodRouter.post("/add", upload.array("image",10), addFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
