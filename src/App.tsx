import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register";
import "./App.css";
import Login from "./components/login";
import Home from "./components/home";
import Profile from "./components/profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
