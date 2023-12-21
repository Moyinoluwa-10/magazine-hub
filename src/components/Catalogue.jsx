import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import UseAuth from "../hooks/UseAuth";
import data from "../redux/data";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartTotal } from "../redux/feature/cartSlice";
import { useEffect } from "react";

const Catalogue = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [items]);

  return (
    <div className="flex flex-col overflow-auto">
      <header className="flex h-14 lg:h-[60px] lg:min-h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <Link className="lg:hidden" href="#">
          {/* <Package2Icon className="h-6 w-6" /> */}
          <span>Hello</span>
          <span className="sr-only">Home</span>
        </Link>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              {/* <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" /> */}
              {/* <input
                type="search"
                name=""
                id=""
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"
              /> */}
              <CiSearch className="absolute left-2.5 top-[50%] -translate-y-[50%] text-gray-500 dark:text-gray-400 text-lg " />
              <input
                className="w-full bg-white shadow-none appearance-none pl-8 pr-2 md:w-2/3 lg:w-1/3 dark:bg-gray-950 border border-gray-300 py-[6px] rounded-md outline-none"
                placeholder="Search"
                type="search"
              />
            </div>
          </form>
        </div>
        <button className="ml-4">Login</button>
        <UseAuth />
      </header>

      <main className="flex flex-col p-4 gap-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((data) => {
            return <CatalogItem key={data.id} {...data} />;
          })}
        </div>

        {/* <div className="mt-6 flex justify-center">
          <button className="border py-2 px-5 rounded-md hover:bg-gray-100 transition-all">
            Load More
          </button>
        </div> */}
      </main>
    </div>
  );
};

const CatalogItem = ({ id, title, description, img }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex flex-col gap-2 border border-gray-300 p-6 rounded-md">
        <img
          alt={title}
          className="w-full object-cover bg-gray-100"
          height="200"
          src={img}
          style={{
            aspectRatio: "200/200",
            objectFit: "cover",
          }}
          width="200"
        />
        <div className="font-semibold">{title}</div>
        <div className="text-gray-500">
          This is the description of Magazine 2. {description}
        </div>
        <button
          className="border py-2 px-2 rounded-md hover:bg-gray-100 transition-all cursor-pointer"
          onClick={() => dispatch(addToCart(id))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

CatalogItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
};

export default Catalogue;
