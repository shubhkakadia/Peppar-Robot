const express = require("express");
const router = express.Router(); // Use Router instead of the app instance
const { register, read } = require("../controller/feedback");

const bodyParser = require("body-parser");
router.use(bodyParser.json());

// Define the routes
router.post("/register", register); // Handle POST requests to /register
router.get("/get", read); // Handle GET requests to /get

module.exports = router;
