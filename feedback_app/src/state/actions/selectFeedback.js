import { SELECTED_FEEDBACK } from "../types";

export const selectFeedback = (feedback) => (dispatch) => {
  dispatch(select(feedback));
};

export const select = (feedback) => ({
  type: SELECTED_FEEDBACK.selected,
  payload: feedback,
});
