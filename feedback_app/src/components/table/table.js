import React, { useEffect, useRef, useState } from "react";
import "../style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectFeedback } from "../../state/actions/selectFeedback";

export default function Table(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewFeedbackToggle, setViewFeedbackToggle] = useState(false);
  const [searchText, setSearchText] = useState("");
  const selected_feedback = useSelector(
    (state) => state.selectedFeedback.selected
  );

  useEffect(() => {
    if (selected_feedback !== undefined) {
      console.log("changed");
      setViewFeedbackToggle(true);
    } else {
      setViewFeedbackToggle(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected_feedback]);

  return (
    <div className="tableContent">
      <div className="searchBar">
        <div className="form-floating">
          <input
            id="search"
            className="form-control"
            placeholder="temp"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <label>
            Search Feedback by ID or Name or Service
          </label>
        </div>
      </div>
      <div className={`shadow-lg ${viewFeedbackToggle ? "blurred" : ""}`}>
        <table className="table table-stiped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Comments</th>
              <th scope="col">ServiceType</th>
              <th scope="col">Ratings</th>
              <th scope="col" colSpan="3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {props.props?.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.ID}</td>
                  <td>
                    {item.Name.length > 10
                      ? item.Name.substring(0, 10) + "..."
                      : item.Name}
                  </td>
                  <td>
                    {item.Comments.length > 10
                      ? item.Comments.substring(0, 10) + "..."
                      : item.Comments}
                  </td>
                  <td>{item.ServiceType}</td>
                  <td>{item.Rating}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        dispatch(selectFeedback(item));
                        setViewFeedbackToggle(true);
                      }}
                    >
                      <i className="bi bi-eye icon"></i>
                    </button>
                  </td>
                  {/* <td>
                    <button className="btn btn-success btn-sm">
                      <i className="bi bi-pencil icon"></i>
                    </button>
                  </td> */}
                  <td>
                    <button className="btn btn-danger btn-sm">
                      <i className="bi bi-trash icon"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {viewFeedbackToggle ? (
        <div className="feedbackpopup shadow-lg">
          <div>
            <h3 className="flexBetween space">{selected_feedback?.ID}</h3>
            <h5 className="space">Name: {selected_feedback?.Name}</h5>
            <h6 className="space">
              Service Type: {selected_feedback?.ServiceType}
            </h6>
            <h6 className="space">Ratings: {selected_feedback?.Rating}</h6>
            <h6 className="space">Comments: {selected_feedback?.Comments}</h6>
          </div>
        </div>
      ) : (
        <div id="popup"></div>
      )}
    </div>
  );
}
