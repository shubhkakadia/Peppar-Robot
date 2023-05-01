import { combineReducers } from "redux";
import { readFeedbacksReducer } from "./readFeedbacks";
import { selectedFeedbackReducer } from "./selectFeedback";
import authReducer from "../reducers/authReducers";
const reducers = combineReducers({
  FeedbackData: readFeedbacksReducer,
  selectedFeedback: selectedFeedbackReducer,
  auth: authReducer,
});

export default reducers;
