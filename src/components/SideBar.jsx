import { Link, NavLink } from "react-router-dom";
import { IoNewspaper } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiHome } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrCatalog } from "react-icons/gr";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { totalCount } = useSelector((state) => state.cart);
  return (
    <div>
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 h-full">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <IoNewspaper />
              <span className="">MagazineHub</span>
            </Link>
            <button className="ml-auto h-8 w-8 border rounded-md flex justify-center items-center">
              <IoMdNotificationsOutline />
              <span className="sr-only">Toggle notifications</span>
            </button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 rounded-lg px-3 py-2 text-black  transition-all hover:text-black bg-gray-200"
                    : "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-black"
                }
                to={"/"}
              >
                <CiHome />
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 rounded-lg px-3 py-2 text-black  transition-all hover:text-black bg-gray-200"
                    : "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-black"
                }
                to={"/catalog"}
              >
                <GrCatalog />
                Catalog
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 rounded-lg px-3 py-2 text-black  transition-all hover:text-black bg-gray-200"
                    : "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-black"
                }
                to={"/cart"}
                activeStyle={{ color: "red" }}
              >
                <AiOutlineShoppingCart />
                Orders
                <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-white">
                  {totalCount}
                </span>
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
