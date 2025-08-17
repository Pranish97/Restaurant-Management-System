const cloudinary = require("cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dox48pari",
  api_key: "414593555332658",
  api_secret: "bikwiiLGuJBS55LDfxWw6T01bBg",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
