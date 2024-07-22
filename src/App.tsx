import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/register";
import "./App.css";
import Login from "./components/login";
import Home from "./components/home";
import Profile from "./components/profile";
import AllBlocksPage from "./components/all-blocks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/allblocks" element={<AllBlocksPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
