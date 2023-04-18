import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readFeedbacks } from "../../state/actions/readFeedbacks";
import Table from "../table/table";
import "../style.css";
import { select, selectFeedback } from "../../state/actions/selectFeedback";
// import Navbar from "../navbar/navbar";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [closeToggle, setCloseToggle] = useState(false);
  const [toggleCounter, setToggleCounter] = useState(0);
  const feedbackData = useSelector((state) => state.FeedbackData.data);
  const selected_feedback = useSelector(
    (state) => state.selectedFeedback.selected
  );

  useEffect(() => {
    dispatch(readFeedbacks());
    dispatch(selectFeedback());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // const dash = document.getElementById("dashboard");

  // dash.addEventListener('click', dispatch(selectFeedback({})))
  function handleCloseViewFeedback(){
    if (toggleCounter > 0){
      dispatch(selectFeedback());
      setToggleCounter(0);
    }
    else{
      setToggleCounter(toggleCounter+1);
    }
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="bgImg" id="dashboard" onClick={() => {console.log("clicked"); handleCloseViewFeedback()}}>
        <div className="flexBetween">
          <Table props={feedbackData} />
        </div>
      </div>
    </>
  );
}
