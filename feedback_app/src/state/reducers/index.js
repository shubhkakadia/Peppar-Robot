import { combineReducers } from "redux";
import { readFeedbacksReducer } from "./readFeedbacks";
import { selectedFeedbackReducer } from "./selectFeedback";

const reducers = combineReducers({
  FeedbackData: readFeedbacksReducer,
  selectedFeedback: selectedFeedbackReducer,
});

export default reducers;
