import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/signup"} element={<Register />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/profile"} element={<Profile />} />
      <Route path={"/dashboard"} element={<Dashboard />} />
    </Routes>
  );
}

export default App;

