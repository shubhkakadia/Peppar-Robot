import { SELECTED_FEEDBACK } from "../types";

// Action creator for selecting a feedback
export const selectFeedback = (feedback) => (dispatch) => {
  // Dispatch the select action with the provided feedback
  dispatch(select(feedback));
};

// Action creator for the select action
export const select = (feedback) => ({
  // Set the action type to "SELECTED_FEEDBACK.selected"
  type: SELECTED_FEEDBACK.selected,
  // Set the payload to the selected feedback
  payload: feedback,
});
