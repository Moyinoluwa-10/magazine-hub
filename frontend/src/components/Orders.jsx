// react & redux
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// firebase
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import OrderItem from "./OrderItem";

const Orders = () => {
  const [orderHistory, setOrderHistory] = useState(null);
  const { authValue } = useSelector((state) => state.auth);
  const ordersCollectionRef = collection(db, "orders");

  const getOrderHistory = async () => {
    try {
      const q = query(
        ordersCollectionRef,
        where("userId", "==", authValue.uid)
      );
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (filteredData.length !== 0) {
        setOrderHistory(filteredData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrderHistory();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="p-5">
      <h1 className="text-3xl font-bold mb-4">Order History</h1>
      {orderHistory ? (
        <table className="w-full border text-left p-10">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Magazines</th>
              <th className="p-2 border">Total Amount</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {orderHistory &&
              orderHistory.map((order, i) => {
                return <OrderItem key={i} {...order} />;
              })}
          </tbody>
        </table>
      ) : (
        <>
          <p className="mb-3">You don't have any order</p>
          <Link
            className="bg-black text-white py-2 px-5 rounded-md transition-all hover:bg-black/80"
            to={"/cart"}
          >
            Order Now
          </Link>
        </>
      )}
    </section>
  );
};

export default Orders;
