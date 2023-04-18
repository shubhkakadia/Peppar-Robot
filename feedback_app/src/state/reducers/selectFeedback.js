import { SELECTED_FEEDBACK } from "../types";

const initialState = {
  selected: "",
};

export const selectedFeedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_FEEDBACK.selected:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};
