import { IoNewspaper } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="grid h-[60px] w-full overflow-hidden lg:grid-cols-[280px_1fr] border-b bg-gray-100/40 shadow-md">
      <div className="flex items-center px-6 border-r">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <IoNewspaper />
          <span className="">MagazineHub</span>
        </Link>
        <button className="ml-auto h-8 w-8 border rounded-md flex justify-center items-center">
          <IoMdNotificationsOutline />
          <span className="sr-only">Toggle notifications</span>
        </button>
      </div>
      <div className="flex items-center gap-4 px-6 shadow-2xl">
        <div className="flex gap-2 items-center text-base cursor-pointer ml-auto">
          <FaRegUserCircle /> My Account <FaAngleDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
