import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./App.css";
import Dashboard from "./components/dashboard/dashboard";
import FeedbackPage from "./components/feedbackPage/feedbackPage";
import LoginPage from './components/login/LoginPage';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  console.log(isLoggedIn);
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
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <LoginPage />} />
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <LoginPage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/feedbacks" element={<FeedbackPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
