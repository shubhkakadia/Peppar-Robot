const feedback = require("../model/feedback");

const register = (req, res) => {
  const ID = req.body.ID;
  const Name = req.body.Name;
  const ServiceType = req.body.ServiceType;
  const Comments = req.body.Comments;
  const Rating = req.body.Rating;
  const Conversation = req.body.Conversation;

  const newFeedback = feedback({
    ID,
    Name,
    ServiceType,
    Comments,
    Rating,
    Conversation,
  });

  newFeedback
    .save()
    .then((data) => {
      console.log("Created new feedback in the database.");
      const response = {
        satus: "Success",
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

const read = (req, res) => {
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

const deleteFeedback = (req, res) => {
  feedback
    .findOneAndRemove({ ID: req.params.id })
    .then((data) => {
      feedback.find().then((remainingData) => {
        console.log("Delete Feedback (Success)");
        const response = {
          status: "Success",
          response: remainingData,
        };
        res.send(response);
      });
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
  deleteFeedback,
};
