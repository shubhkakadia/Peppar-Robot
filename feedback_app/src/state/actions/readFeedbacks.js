import axios from "axios";
import { FEEDBACKS } from "../types";

export const readFeedbacks = () => (dispatch) => {
  dispatch(load());
  var config = {
    method: "get",
    url: "http://192.168.0.115:3000/feedback/get",
    headers: {},
  };

  axios(config)
    .then(function (response) {
      dispatch(success(response.data.response));
    })
    .catch(function (error) {
      console.log(error);
      dispatch(error(error));
    });
};

export const load = () => ({
  type: FEEDBACKS.load,
});

export const success = (data) => ({
  type: FEEDBACKS.success,
  payload: data,
});

export const error = (error) => ({
  type: FEEDBACKS.error,
  payload: error,
});
