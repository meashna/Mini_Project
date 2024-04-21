const express = require("express");
const router = express.Router();
const Product = require("../models/product.js");
const User = require("../models/user.js");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

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

router.post("/addProduct", upload.single("productImage"), async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productCategory,
      productPrice,
      userId,
    } = req.body;
    let productImage = req.file ? req.file.filename : "";

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const newProduct = new Product({
      productName,
      productDescription,
      productCategory,
      productImage,
      productPrice,
      user: existingUser._id, // Associate user by ID
    });

    const savedProduct = await newProduct.save();
    existingUser.products.push(savedProduct._id); // Ensure `products` is the correct array field in User schema
    await existingUser.save();

    res
      .status(200)
      .json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product" });
  }
});

//get
router.get("/getProducts/:id", async (req, res) => {
  try {
    const products = await Product.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

router.get("/getImage/:id", async (req, res) => {
  try {
    const image = await Product.findById(req.params.id).select("productImage");
    res.status(200).json(image);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Error fetching image" });
  }
});

//for fetch all products in mongo db
router.get("/getAllProducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

module.exports = router;
