import axios from "axios";
import { FEEDBACKS } from "../types";
import serverIP from "../../assets/ip.json";

// Action creator for deleting feedback
export const deleteFeedback = (feedback) => (dispatch) => {
  dispatch(load()); // Dispatch the load action

  var config = {
    method: "delete",
    url: `http://${serverIP.ip}/feedback/delete/${feedback.ID}`,
    headers: {},
  };

  // Make an API request to delete the feedback
  axios(config)
    .then(function (response) {
      dispatch(success(response.data.response));
    })
    .catch(function (error) {
      console.log(error);
      dispatch(error(error));
    });
};

// Action creator for the load action
export const load = () => ({
  type: FEEDBACKS.load,
});

// Action creator for the success action
export const success = (data) => ({
  type: FEEDBACKS.success,
  payload: data,
});

// Action creator for the error action
export const error = (error) => ({
  type: FEEDBACKS.error,
  payload: error,
});
