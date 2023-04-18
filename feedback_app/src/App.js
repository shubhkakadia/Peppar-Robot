import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/dashboard";
import FeedbackPage from "./components/feedbackPage/feedbackPage";

function App() {
  return (
    <div className="App">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
      ></link>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
        crossOrigin="anonymous"
      ></link>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/:id" element={<FeedbackPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
