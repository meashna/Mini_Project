const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");
// require("dotenv").config();

// const url = process.env.MONGODB_URI;

// const storage = new GridFsStorage({
//   url,
//   file: (req, file) => {
//     //If it is an image, save to photos bucket
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//       return {
//         bucketName: "photos",
//         filename: `${Date.now()}_${file.originalname}`,
//       };
//     } else {
//       //Otherwise save to default bucket
//       return `${Date.now()}_${file.originalname}`;
//     }
//   },
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = { upload };
