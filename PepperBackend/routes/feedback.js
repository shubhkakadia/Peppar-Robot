const express = require("express");
var router = express();
const { register, read, deleteFeedback } = require("../controller/feedback");

const bodyparser = require("body-parser");
router.use(bodyparser.json());
router.post("/register", register);
router.get("/get", read);
router.delete("/delete/:id", deleteFeedback);
module.exports = router;
