import { IoNewspaper } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((open) => !open);
  };
  return (
    <header className="grid h-[60px] w-full overflow-hidden sm:grid-cols-[280px_1fr] border-b bg-gray-100/40 shadow-md">
      <div className="hidden sm:flex items-center px-6 border-r">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <IoNewspaper />
          <span className="">MagazineHub</span>
        </Link>
        <button className="ml-auto h-8 w-8 border rounded-md flex justify-center items-center">
          <IoMdNotificationsOutline />
          <span className="sr-only">Toggle notifications</span>
        </button>
      </div>

      <div className="flex items-center gap-4 px-6">
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
              ? "fixed right-6 top-12 p-5 bg-white border border-gray-400 rounded-md w-40 z-10 transition-all flex flex-col gap-1"
              : "fixed right-6 top-12 p-5 bg-white border border-gray-400 rounded-md w-40 z-10 transition-all hidden"
          }
        >
          <Link to={"/login"}>Log in</Link>
          <Link to={"/signup"}>Sign-up</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
