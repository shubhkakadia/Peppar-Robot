const express = require("express");
const router = express.Router(); // Use Router instead of the app instance
const { register, read, remove } = require("../controller/feedback");

const bodyParser = require("body-parser");
router.use(bodyParser.json());

// Define the routes
router.post("/register", register); // Handle POST requests to /register
router.get("/get", read); // Handle GET requests to /get
router.delete("/delete/:ID", remove); // Handle DELETE requests to /delete/:ID

module.exports = router;
