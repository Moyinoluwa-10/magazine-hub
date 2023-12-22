import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import UseAuth from "../hooks/UseAuth";
import data from "../redux/data";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../redux/feature/cartSlice";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import CatalogItem from "./CatalogItem";

const Catalogue = () => {
  const [magazineList, setMagazineList] = useState([]);

  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const moviesCollectionRef = collection(db, "magazines");

  const getMagazineList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMagazineList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMagazineList();
    dispatch(getCartTotal());
    // eslint-disable-next-line
  }, [items]);

  // console.log(magazineList);

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
          {magazineList.map((data) => {
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

export default Catalogue;
