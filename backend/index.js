const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

require("./conn/conn");

const authRoutes = require("./routes/auth");

app.use(express.json());

app.use(
  cors({
    origin: "*", // Allows requests from all origins
    credentials: true, // Allows cookies to be sent with requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed HTTP headers
    preflightContinue: true, // Moves the request to the next middleware if the preflight request is successful
  })
);

// Setup CORS headers for all responses
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allows all origins
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/v1", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
