import { FEEDBACKS } from "../types";

const initialState = {
  load: false,
  data: "",
  error: "",
};

export const readFeedbacksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEEDBACKS.load:
      return {
        ...state,
        load: true,
      };
    case FEEDBACKS.success:
      return {
        ...state,
        data: action.payload,
        error: "",
        load: false,
      };
    case FEEDBACKS.error:
      return {
        ...state,
        error: action.payload,
        load: false,
      };
    default:
      return state;
  }
};
