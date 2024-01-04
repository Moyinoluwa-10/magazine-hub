// react & redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../redux/feature/cartSlice";
// icons
import { CiSearch } from "react-icons/ci";
// firebase
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
// components
import CatalogItem from "./CatalogItem";

const CatalogContainer = () => {
  const [magazineList, setMagazineList] = useState([]);
  const [searchField, setSearchField] = useState("");

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

  const filteredMagazine = magazineList.filter((magazine) => {
    return magazine.title.toLowerCase().includes(searchField.toLowerCase());
  });

  useEffect(() => {
    getMagazineList();
    dispatch(getCartTotal());
    // eslint-disable-next-line
  }, [items]);

  return (
    <section className="flex flex-col overflow-auto">
      <div className="flex items-center px-6 mt-7 mb-5">
        <form className="w-full">
          <div className="relative -z-10">
            <CiSearch className="absolute z-0 left-2.5 top-[50%] -translate-y-[50%] text-gray-500 dark:text-gray-400 text-lg " />
            <input
              className="w-full bg-white shadow-none appearance-none pl-8 pr-2 md:w-2/3 lg:w-1/3 border border-gray-300 py-[6px] rounded-md outline-none"
              placeholder="Search"
              type="search"
              name="searchField"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
          </div>
        </form>
      </div>

      <main className="flex flex-col p-4 gap-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMagazine.map((data) => {
            return <CatalogItem key={data.id} {...data} />;
          })}
        </div>
      </main>
    </section>
  );
};

export default CatalogContainer;
