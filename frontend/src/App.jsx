import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Catalog from "./pages/Catalog";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/signup"} element={<Register />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/profile"} element={<Profile />} />
      <Route path={"/dashboard"} element={<Dashboard />} />
      <Route path={"/cart"} element={<Cart />} />
      <Route path={"/catalog"} element={<Catalog />} />
      <Route path={"/checkout"} element={<Checkout />} />
    </Routes>
  );
}

export default App;

