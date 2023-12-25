// react & redux
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
//icons
import { CiHome } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrCatalog } from "react-icons/gr";
// hamburger
import { Spiral as Hamburger } from "hamburger-react";

const SideBar = () => {
  const [isOpen, setOpen] = useState(false);
  const { totalCount } = useSelector((state) => state.cart);

  return (
    <>
      <div className="h-[60px] flex items-center px-6 gap-2 sm:hidden fixed z-10 top-0 left-0">
        <Hamburger
          toggled={isOpen}
          size={20}
          toggle={setOpen}
          label="Show menu"
        />
        <Link className="flex items-center gap-2 font-semibold" to={"/"}>
          <span className="">MagazineHub</span>
        </Link>
      </div>

      <section
        className={
          isOpen
            ? "z-10 fixed md:relative left-0 top-[60px] md:top-0 border-r md:bg-gray-100/40 bg-black/30 md:block dark:bg-gray-800/40 h-full w-full overflow-hidden transition-all duration-500"
            : "z-10 fixed md:relative left-0 top-[60px] md:top-0 border-r md:bg-gray-100/40 bg-black/30 md:block dark:bg-gray-800/40 h-full w-0 md:w-full overflow-hidden transition-all duration-500"
        }
      >
        <div className="flex h-full max-h-screen flex-col gap-2 bg-white w-full max-w-[280px]">
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
      </section>
    </>
  );
};

export default SideBar;
