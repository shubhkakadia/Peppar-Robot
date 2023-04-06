const express = require("express");
const feedbackRouter = require("./routes/feedback");

const app = express();
const cors = require("cors");
require("./db/conn");

app.use(cors());
app.use("/feedback", feedbackRouter);

app.listen(3000, () => {
  console.log("Connected to PORT 3000...");
});
