import React, { useEffect, useState } from "react";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import { selectFeedback } from "../../state/actions/selectFeedback";
import { deleteFeedback } from "../../state/actions/deleteFeedback";
import Loader from "../loader";

export default function Table(props) {
  const dispatch = useDispatch();
  const [viewFeedbackToggle, setViewFeedbackToggle] = useState(false);
  const [removeFeedbackPopup, setRemoveFeedbackPopup] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const isLoading = useSelector((state) => state.FeedbackData?.load);
  const selected_feedback = useSelector(
    (state) => state.selectedFeedback?.selected
  );
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = feedbackData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(feedbackData.length / recordsPerPage);
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  useEffect(() => {
    setFeedbackData(props.props);
  }, [props.props]);

  useEffect(() => {
    if (selected_feedback !== undefined) {
      console.log("asd", selected_feedback);
      setViewFeedbackToggle(true);
    } else {
      setViewFeedbackToggle(false);
      setRemoveFeedbackPopup(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected_feedback]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleSearch = () => {
    let arr = [];
    if (props.props) {
      props.props?.forEach((item) => {
        if (
          item.Name?.toLowerCase().includes(searchText) ||
          item.ID?.toString().includes(searchText) ||
          item.ServiceType.toLowerCase().includes(searchText)
        ) {
          arr.push(item);
        }
      });
    }
    setFeedbackData(arr);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const handleDownload = () => {
    // Create the header row for the CSV
    const header = Object.keys(feedbackData[0]).join(",") + "\n";

    // Create the body of the CSV
    const body = feedbackData
      .map((obj) => {
        return Object.values(obj).join(",");
      })
      .join("\n");

    // Combine the header and body to create the final CSV
    const csv = header + body;

    const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = URL.createObjectURL(csvBlob);
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", csvURL);
    downloadLink.setAttribute("download", "data.csv");
    downloadLink.style.visibility = "hidden";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

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
          <label>Search Feedback by ID or Name or Service</label>
        </div>
      </div>
      <div className={`shadow-lg ${viewFeedbackToggle ? "blurred" : ""}`}>
        {!feedbackData ? (
          <Loader />
        ) : feedbackData.length > 0 ? (
          <>
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
                {currentRecords?.map((item, i) => {
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
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            setRemoveFeedbackPopup(true);
                            dispatch(selectFeedback(item));
                          }}
                        >
                          <i className="bi bi-trash icon"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {nPages > 1 ? (
              <ul className="pagination flexBetween">
                <li className="page-item">
                  <div
                    onClick={prevPage}
                    className="page-link"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </div>
                </li>
                {pageNumbers.map((pgNumber) => (
                  <li
                    key={pgNumber}
                    className={`page-item ${
                      currentPage === pgNumber ? "active" : ""
                    } `}
                  >
                    <div
                      onClick={() => setCurrentPage(pgNumber)}
                      className="page-link"
                    >
                      {pgNumber}
                    </div>
                  </li>
                ))}
                <li className="page-item">
                  <div
                    onClick={nextPage}
                    className="page-link"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </div>
                </li>
              </ul>
            ) : (
              <></>
            )}
            <i
              onClick={() => handleDownload()}
              className="bi bi-file-earmark-arrow-down downloadbutton"
            ></i>
          </>
        ) : (
          <div>No Data found!!!</div>
        )}
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

      {removeFeedbackPopup ? (
        <div className="feedbackpopup shadow-lg">
          <h5 className="flexBetween space">
            Are you sure you want to delete this feedback{" "}
            {selected_feedback?.ID}?
          </h5>
          <div className="flexBetween spaceAround">
            <button className="btn btn-success w-25">No</button>
            <button
              className="btn btn-danger w-25"
              onClick={() => {
                dispatch(deleteFeedback(selected_feedback));
              }}
            >
              Yes
            </button>
          </div>
        </div>
      ) : (
        <div id="popup"></div>
      )}
      {isLoading ? (
        <div className="load">
          <Loader />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
