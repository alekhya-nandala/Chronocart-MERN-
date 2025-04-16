const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { log } = require("console");

app.use(express.json());
app.use(cors());



// 1) Connect to MongoDB
mongoose.connect(
  "mongodb+srv://lexaa0207:Alexa%40123@cluster0.src1d.mongodb.net/chronocart"
);

// 2) Basic route
app.get("/", (req, res) => {
  res.send("Express App is Running::");
});

// 3) Multer setup for file uploads
const storage = multer.diskStorage({
  destination: "./upload/images", // where to save uploaded files
  filename: (req, file, cb) => {
    // e.g. product_1679148573000.png
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

// 4) Serve uploaded images from /images
app.use("/images", express.static("upload/images"));

// 5) Single-file upload endpoint (multipart/form-data)
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }
  // Construct the URL pointing to the uploaded file
  // Construct the URL pointing to the uploaded file using the deployed address
  const imageUrl = `https://chronocart-mern-project-s10s.onrender.com/images/${req.file.filename}`;
  return res.status(200).json({
    success: 1,
    image_url: imageUrl,
  });
});

// 6) URL-based "upload" endpoint (JSON body)
app.post("/upload-url", (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res
      .status(400)
      .json({ success: 0, message: "No imageUrl provided" });
  }
  return res.status(200).json({
    success: 1,
    message: "Image URL received",
    imageUrl,
  });
});

// ------------------- Product Schema & Endpoints -------------------
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// Add product
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Delete product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Get all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

// ------------------- User Schema & Auth Endpoints -------------------
const Users = mongoose.model("Users", {
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  CartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Signup
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "User with same email exists" });
  }
  // Create default cart structure
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  // Note: Using req.body.username
  const user = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    CartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const jwt = require("jsonwebtoken");
  const token = jwt.sign(data, "secret_ecom");

  res.json({ success: true, token });
});

// Login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwt = require("jsonwebtoken");
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Id" });
  }
});

// ------------------- Middleware to Fetch User -------------------
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const jwt = require("jsonwebtoken");
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ errors: "Please authenticate using a valid token" });
  }
};

// ------------------- Cart-Related Endpoints -------------------

// Add to cart
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.CartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { CartData: userData.CartData });
  res.json({ message: "Added" });
});

// Remove from cart
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);

  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.CartData[req.body.itemId] > 0) {
    userData.CartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate({ _id: req.user.id }, { CartData: userData.CartData });
  res.json({ message: "Removed" });
});

// Get cart data
app.post("/getcartdata", fetchUser, async (req, res) => {
  console.log("get cart data");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.CartData);
});

// ------------------- Get User Info -------------------
app.get("/getuser", fetchUser, async (req, res) => {
  try {
    let userData = await Users.findById(req.user.id);
    if (!userData) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    // Return user details (username and email)
    res.json({
      success: true,
      username: userData.username,
      email: userData.email,
    });
  } catch (error) {
    console.error("Error in /getuser:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// 7) Start the server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on Port " + port);
  } else {
    console.log("ERROR : " + error);
  }
});
