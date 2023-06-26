import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readFeedbacks } from "../../state/actions/readFeedbacks";
import Table from "../table/table";
import { selectFeedback } from "../../state/actions/selectFeedback";
import Navbar from "../navbar/navbar";

export default function FeedbackPage() {
  const dispatch = useDispatch();
  const [toggleCounter, setToggleCounter] = useState(false);
  const feedbackData = useSelector((state) => state.FeedbackData?.data);
  const selected_feedback = useSelector(
    (state) => state.selectedFeedback?.selected
  );

  useEffect(() => {
    dispatch(readFeedbacks());
    dispatch(selectFeedback());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCloseViewFeedback() {
    if (toggleCounter === true && selected_feedback!== undefined) {
      dispatch(selectFeedback());
      setToggleCounter(false);
    } else {
      setToggleCounter(true);
    }
  }

  return (
    <>
      <div
        className="bgImg"
        id="dashboard"
        onClick={() => {
          console.log("clicked");
          handleCloseViewFeedback();
        }}
      >
        <Navbar />
        <div className="flexBetween">
          <Table props={feedbackData} />
        </div>
      </div>
    </>
  );
}
