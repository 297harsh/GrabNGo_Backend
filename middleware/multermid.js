const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "GrabNGo", 
    allowed_formats: ["jpeg", "png", "jpg"],
  },
});

const upload = multer({ storage });

export { upload }
