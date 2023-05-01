import React, { useEffect, useState } from "react";
import "../style.css";
import Navbar from "../navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import { Doughnut, Line } from "react-chartjs-2";
import { Tooltip, Title, ArcElement, Legend, Chart, Colors } from "chart.js";
import { readFeedbacks } from "../../state/actions/readFeedbacks";
import { selectFeedback } from "../../state/actions/selectFeedback";
import "chart.js/auto";
import Loader from "../loader";

export default function Dashboard() {
  Chart.register(Colors, Tooltip, Title, ArcElement, Legend);
  const dispatch = useDispatch();
  const date = new Date();
  const [empCounter, setEmpCounter] = useState(0);
  const [counterSpeed, setCounterSpeed] = useState(100);
  const [feedbackCount, setFeedbackCount] = useState([]);
  const [numaricLineData, setNumaricLineData] = useState([]);
  const [labelLineData, setLabelLineData] = useState([]);
  const [viewingType, setViewingtype] = useState("Monthly");
  const [selectedService, setSelectedService] = useState("All");
  const [chartDate, setChartDate] = useState(new Date());
  const [ratngLabel, setRatinglabel] = useState([]);
  const feedbackData = useSelector((state) => state.FeedbackData.data);
  const isLoading = useSelector((state) => state.FeedbackData.load);
  const month = chartDate.getMonth();
  const year = chartDate.getFullYear();
  let allServices = [];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (feedbackData) {
    allServices = [
      "All",
      ...new Set(feedbackData?.map((feedback) => feedback.ServiceType)),
    ];
  }

  const DoughnutOptions = {
    plugins: {
      colors: {
        forceOverride: true,
      },
    },
  };

  const LineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // scales: {
    //   xAxes: [
    //     {
    //       type: "time",
    //       time: {
    //         unit: "month",
    //       },
    //     },
    //   ],
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //       },
    //     },
    //   ],
    // },
  };

  const DoughnutData = {
    datasets: [
      {
        data: feedbackCount,
      },
    ],
    labels: ratngLabel,
  };

  const LineData = {
    labels: labelLineData,
    datasets: [
      {
        label: "Pepper Robot Usage Distribution",
        data: numaricLineData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        lineTension: 0.1,
      },
    ],
  };

  useEffect(() => {
    handleRatingDognut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbackData, selectedService]);

  useEffect(() => {
    if (empCounter !== feedbackData.length) {
      setTimeout(() => {
        setEmpCounter(empCounter + 1);
      }, counterSpeed);
      if (empCounter === Math.round((feedbackData.length / 100) * 80)) {
        setCounterSpeed(500);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    handleUsageLine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartDate, viewingType]);

  useEffect(() => {
    dispatch(readFeedbacks());
    dispatch(selectFeedback());
    handleUsageLine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleRatingDognut() {
    if (feedbackData) {
      let ratinglabel = [];
      let feedbackcount = [];
      let selectedData = [];
      if (selectedService === "All") {
        selectedData = feedbackData;
      } else {
        selectedData = feedbackData.filter(
          (item) => item.ServiceType === selectedService
        );
      }
      selectedData?.forEach((item) => {
        if (!ratinglabel.includes(item.Rating)) {
          ratinglabel.push(item.Rating);
        }
      });
      ratinglabel.sort();
      ratinglabel?.forEach((item) => {
        feedbackcount.push(
          (feedbackData?.filter((feedback) => feedback.Rating === item)).length
        );
      });
      setFeedbackCount(feedbackcount);
      setRatinglabel(ratinglabel);
    }
  }

  function handleUsageLine() {
    if (feedbackData) {
      let dates = [];
      let allDates = [];
      // Step 1: Extract createdAt date and convert to string
      if (viewingType === "Monthly") {
        dates = feedbackData
          .filter((doc) => {
            const createdAt = new Date(doc.createdAt);
            return (
              createdAt.getMonth() === month && createdAt.getFullYear() === year
            );
          })
          .map((doc) => {
            const createdAt = new Date(doc.createdAt);
            return `${createdAt.getDate()}/${
              createdAt.getMonth() + 1
            }/${createdAt.getFullYear()}`;
          });
      } else {
        dates = feedbackData
          .filter((doc) => {
            const createdAt = new Date(doc.createdAt);
            return createdAt.getFullYear() === year;
          })
          .map((doc) => {
            const createdAt = new Date(doc.createdAt);
            return `${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`;
          });
      }

      // Step 2: Create object with date keys and feedback count values
      const feedbackCounts = {};
      dates.forEach((date) => {
        if (feedbackCounts[date]) {
          feedbackCounts[date] += 1;
        } else {
          feedbackCounts[date] = 1;
        }
      });

      if (viewingType === "Monthly") {
        // Step 3: Create an array of dates for the entire month range
        const startDate = new Date(chartDate);
        startDate.setDate(1);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(endDate.getDate() - 1);

        allDates = [];
        while (startDate <= endDate) {
          const dateStr = `${startDate.getDate()}/${
            startDate.getMonth() + 1
          }/${startDate.getFullYear()}`;
          allDates.push(dateStr);
          startDate.setDate(startDate.getDate() + 1);
        }
      } else {
        // Step 3: Create an array of dates for the entire month range
        const startDate = new Date(chartDate);
        startDate.setMonth(0);
        const endDate = new Date(chartDate);
        endDate.setMonth(11);

        allDates = [];
        while (startDate <= endDate) {
          const dateStr = `${
            startDate.getMonth() + 1
          }/${startDate.getFullYear()}`;
          allDates.push(dateStr);
          startDate.setDate(startDate.getDate() + 1);
        }
      }

      // Step 4: Update object with feedback counts for all dates
      allDates.forEach((date) => {
        if (!feedbackCounts[date]) {
          feedbackCounts[date] = 0;
        }
      });

      // Step 5: Convert object to array of objects
      const feedbackCountsArray = Object.entries(feedbackCounts).map(
        ([date, count]) => {
          return { date, count };
        }
      );

      // Step 6: Sort array by date
      feedbackCountsArray.sort((a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("/"));
        const dateB = new Date(b.date.split("/").reverse().join("/"));
        return dateA - dateB;
      });

      setNumaricLineData(feedbackCountsArray.map((date) => date.count));
      console.log(feedbackCountsArray);
      if (viewingType === "Monthly") {
        setLabelLineData(
          feedbackCountsArray.map((date) => date.date.split("/")[0])
        );
      } else {
        setLabelLineData(
          feedbackCountsArray.map(
            (date) => monthNames[date.date.split("/")[0] - 1]
          )
        );
      }
    }
  }

  const changeMonth = (monthIndex) => {
    setChartDate(new Date(year, monthIndex, 1));
  };

  const nextYear = () => {
    setChartDate(new Date(year + 1, month, 1));
  };

  const prevYear = () => {
    setChartDate(new Date(year - 1, month, 1));
  };

  const handleViewingType = () => {
    if (viewingType === "Monthly") {
      setViewingtype("Yearly");
    } else {
      setViewingtype("Monthly");
    }
  };

  return (
    <div className="bgImg">
      <Navbar />

      <>
        <div className="counterBlock flexBetween">
          <div className="fs-3">Total Feedbacks: {empCounter}</div>
        </div>
        <div className="ratingBlock">
          <h5 className="title flexBetween">Ratings Distribution</h5>

          <div className="flexBetween">
            <select
              className="dropdown"
              onChange={(event) => {
                setSelectedService(event.target.value);
              }}
            >
              {allServices?.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <Doughnut data={DoughnutData} options={DoughnutOptions} />
        </div>

        <div className="usageBlock">
          <div className="year-selector">
            <button
              className="d-inline btn btn-primary btn-sm"
              onClick={prevYear}
            >
              &lt;&lt;
            </button>
            <h2 className="d-inline p-5">{year}</h2>
            <button
              className="d-inline btn btn-primary btn-sm"
              onClick={nextYear}
            >
              &gt;&gt;
            </button>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              onClick={() => handleViewingType()}
            />
            <label className="form-check-label">View by Yearly</label>
          </div>
          {viewingType === "Monthly" ? (
            <select
              defaultValue={chartDate.getMonth()}
              className="dropdown"
              onChange={(event) => {
                changeMonth(event.target.value);
              }}
            >
              {monthNames.map((monthName, i) => {
                return (
                  <option key={i} value={i}>
                    {monthName}
                  </option>
                );
              })}
            </select>
          ) : (
            <></>
          )}

          <div className="lineGraph">
            <Line data={LineData} options={LineOptions} />
          </div>
        </div>
        {isLoading ? (
          <div className="load">
            <Loader />
          </div>
        ) : (
          <></>
        )}
      </>
    </div>
  );
}