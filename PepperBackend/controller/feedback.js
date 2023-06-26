const feedback = require("../model/feedback");

// Register a new feedback
const register = (req, res) => {
  const { ID, Name, ServiceType, Comments, Rating, Conversation } = req.body;

  // Create a new instance of the feedback model
  const newFeedback = new feedback({
    ID,
    Name,
    ServiceType,
    Comments,
    Rating,
    Conversation,
  });

  // Save the new feedback to the database
  newFeedback
    .save()
    .then((data) => {
      console.log("Created new feedback in the database.");
      const response = {
        status: "Success",
        response: data,
      };
      res.send(response);
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: err,
      };
      res.send(response);
    });
};

// Read all feedback
const read = (req, res) => {
  // Find all feedback in the database
  feedback
    .find()
    .then((data) => {
      console.log("Read Feedback (Success) ");
      const response = {
        status: "Success",
        response: data,
      };
      res.send(response);
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: err,
      };
      res.send(response);
    });
};

module.exports = {
  register,
  read,
};
