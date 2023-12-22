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
import Order from "./pages/Order";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import AuthenticatedRoutes from "./utils/AuthenticatedRoutes";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/catalog"} element={<Catalog />} />
      <Route path={"/cart"} element={<Cart />} />
      <Route element={<AuthenticatedRoutes />}>
        <Route path={"/signup"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/checkout"} element={<Checkout />} />
        <Route path={"/orders"} element={<Order />} />
      </Route>
    </Routes>
  );
}

export default App;

