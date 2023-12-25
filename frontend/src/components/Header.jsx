// react and redux
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/feature/authSlice";
// icons
import { IoNewspaper } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FaAngleDown, FaRegUser } from "react-icons/fa6";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((open) => !open);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authValue } = useSelector((state) => state.auth);
  return (
    <header className="grid h-[60px] w-full overflow-hidden sm:grid-cols-[280px_1fr] border-b bg-gray-100/40 shadow-md fixed md:relative top-0 left-0">
      <div className="hidden sm:flex items-center px-6 border-r">
        <Link className="flex items-center gap-2 font-semibold" to={"/"}>
          <IoNewspaper />
          <span className="">MagazineHub</span>
        </Link>
        {/* <button className="ml-auto h-8 w-8 border rounded-md flex justify-center items-center">
          <IoMdNotificationsOutline />
          <span className="sr-only">Toggle notifications</span>
        </button> */}
      </div>

      <div className="flex items-center gap-4 px-6">
        {authValue ? (
          <>
            <div
              className="flex gap-2 items-center text-base cursor-pointer ml-auto"
              onClick={handleToggle}
            >
              <FaRegUserCircle /> My Account{" "}
              <FaAngleDown
                className={
                  isOpen
                    ? "rotate-180 transition-all duration-200"
                    : "transition-all duration-200"
                }
              />
            </div>
            <div
              className={
                isOpen
                  ? "fixed right-6 top-12 px-5 py-8 bg-white border border-gray-400 rounded-md w-64 z-10 transition-all flex flex-col gap-2"
                  : "fixed right-6 top-12 px-5 py-8 bg-white border border-gray-400 rounded-md w-64 z-10 transition-all hidden"
              }
            >
              <Link to={"/profile"} className="flex gap-2 items-center">
                <FaRegUser />
                Your Profile
              </Link>
              <Link to={"/orders"} className="flex gap-2 items-center">
                <IoIosList />
                Your Orders
              </Link>
              <hr className="border-1" />
              <button
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/");
                }}
                className="text-left"
              >
                Sign out
              </button>
            </div>
          </>
        ) : (
          <Link
            className="bg-black text-white py-2 px-5 rounded-md  block transition-all hover:bg-black/80 ml-auto"
            to={"/login"}
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
