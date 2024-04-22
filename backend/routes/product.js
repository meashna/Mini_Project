const express = require("express");
const router = express.Router();
const Product = require("../models/product.js");
const User = require("../models/user.js");
const BuyedProduct = require("../models/buyedProduct.js");
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

// Route to add a product to user's purchased products
router.post("/purchaseProduct", async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: "User or Product not found" });
    }

    const newPurchase = new BuyedProduct({
      product: productId,
      user: userId,
    });

    await newPurchase.save();
    res.status(201).json({
      message: "Product purchased successfully",
      purchase: newPurchase,
    });
  } catch (error) {
    console.error("Error purchasing product:", error);
    res.status(500).json({ message: "Error purchasing product" });
  }
});

// Route to get all purchased products for a user
router.get("/userPurchases/:userId", async (req, res) => {
  try {
    const purchases = await BuyedProduct.find({ user: req.params.userId })
      .populate("product")
      .sort({ purchaseDate: -1 });

    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error fetching user purchases:", error);
    res.status(500).json({ message: "Error fetching user purchases" });
  }
});

// Route to delete a purchased product for a user
router.delete("/userPurchases/:userId/:productId", async (req, res) => {
  try {
    // Attempt to find and delete the purchased product that matches the userId and productId
    const result = await BuyedProduct.findOneAndDelete({
      _id: req.params.productId,
      user: req.params.userId,
    });

    if (!result) {
      // If no document was found and deleted, send a 404 response
      return res
        .status(404)
        .json({ message: "Product not found or not associated with the user" });
    }

    // Send a success response if the product was deleted
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting the purchased product:", error);
    res.status(500).json({ message: "Error deleting the purchased product" });
  }
});

router.get("/products/:productId/owner-email", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate("user"); // 'owner' should be the field in Product model that references the User model
    if (!product) {
      return res.status(404).send("Product not found");
    }
    // res.send({ email: product.user.email });
    res.status(200).send({
      email: product.user.email,
      username: product.user.username,
      product,
    });
  } catch (error) {
    console.error("Error fetching product owner email:", error);
    res.status(500).send("Failed to retrieve product owner email");
  }
});

module.exports = router;
