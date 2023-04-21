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
  let date = new Date();
  const dispatch = useDispatch();
  const [empCounter, setEmpCounter] = useState(0);
  const [counterSpeed, setCounterSpeed] = useState(100);
  const [feedbackCount, setFeedbackCount] = useState([]);
  const [selectedService, setSelectedService] = useState("All");
  const [ratngLabel, setRatinglabel] = useState([]);
  const feedbackData = useSelector((state) => state.FeedbackData.data);
  const isLoading = useSelector((state) => state.FeedbackData.load);
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = [];
  let allServices = [];
  const labels = [
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
    labels: labels,
    datasets: [
      {
        label: "Usage Distribution",
        data: [65, 59, 80, 81, 56, 55, 40, 23, 78, 70, 9, 50],
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
    console.log(Array(Math.ceil(new Date(year, month + 1, 0).getDate())));
    // daysInMonth.push(Array(Math.ceil(new Date(year, month + 1, 0).getDate())))
    console.log(daysInMonth);
    if (feedbackData){
      feedbackData?.forEach((item) => {
        console.log(
          item.ID,
          new Date(item.createdAt).getDate(),
          new Date(item.createdAt).getMonth() + 1,
          new Date(item.createdAt).getFullYear()
        );
      });
    }

  }

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
          <Line data={LineData} options={LineOptions} />
        </div>
        <div className="load">{isLoading ? <Loader /> : <></>}</div>
      </>
    </div>
  );
}
