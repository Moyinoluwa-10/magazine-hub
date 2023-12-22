import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../redux/feature/cartSlice";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import CatalogItem from "./CatalogItem";

const CatalogList = () => {
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
          <div className="relative">
            <CiSearch className="absolute left-2.5 top-[50%] -translate-y-[50%] text-gray-500 dark:text-gray-400 text-lg " />
            <input
              className="w-full bg-white shadow-none appearance-none pl-8 pr-2 md:w-2/3 lg:w-1/3 dark:bg-gray-950 border border-gray-300 py-[6px] rounded-md outline-none"
              placeholder="Search"
              type="search"
              name="searchField"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
          </div>
        </form>
        <form className="flex">
          <label htmlFor="sortBy">Sort By</label>
          <select name="sortBy" id="sortBy">
            <option value="name">Name</option>
            <option value=""></option>
          </select>
        </form>
      </div>

      <main className="flex flex-col p-4 gap-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMagazine.map((data) => {
            return <CatalogItem key={data.id} {...data} />;
          })}
        </div>
      </main>
    </section>
  );
};

export default CatalogList;
