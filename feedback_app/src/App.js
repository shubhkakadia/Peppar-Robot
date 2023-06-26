import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./App.css";
import Dashboard from "./components/dashboard/dashboard";
import FeedbackPage from "./components/feedbackPage/feedbackPage";
import LoginPage from './components/login/LoginPage';
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <div className="App">
      {/* Add meta and link tags for styling and dependencies */}
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
          {/* Define the routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoutes> <Dashboard/> </ProtectedRoutes>} />
          <Route path="/feedbacks" element={<ProtectedRoutes> <FeedbackPage/> </ProtectedRoutes>} />
          <Route path="/login" element={<LoginPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
