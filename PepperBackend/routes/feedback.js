const express = require("express");
var router = express();
const { register, read } = require("../controller/feedback");

const bodyparser = require("body-parser");
router.use(bodyparser.json());
router.post("/register", register);
router.get("/get", read);
module.exports = router;
