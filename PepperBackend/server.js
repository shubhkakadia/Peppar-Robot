const express = require("express");
const feedbackRouter = require("./routes/feedback");

const app = express();
const cors = require("cors");
require("./db/conn");

app.use(cors()); // Enable CORS
app.use("/feedback", feedbackRouter); // Mount the feedback router at the "/feedback" path

app.listen(3000, () => {
  console.log("Connected to PORT 3000...");
});
