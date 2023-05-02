import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Home from './components/Home';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
console.log(isLoggedIn);
  return (
    <Router>
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Home" element={isLoggedIn ? <Home /> : <LoginPage />} />
        <Route path="/" element={isLoggedIn ? <Home /> : <LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
