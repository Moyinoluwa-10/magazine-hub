import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../config/firebase";
import PropTypes from "prop-types";

const Orders = () => {
  const [orderHistory, setOrderHistory] = useState([]);
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
      setOrderHistory(filteredData);
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
      <div>
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
      </div>
    </section>
  );
};

const OrderItem = ({ createdAt, status, total, products }) => {
  return (
    <tr>
      <td className="p-2 border">{createdAt.seconds}</td>
      <td className="p-2 border">
        {products.map((product) => product.productId).join(",")}
      </td>
      <td className="p-2 border">{total}</td>
      <td className="p-2 border">{status}</td>
    </tr>
  );
};

OrderItem.propTypes = {
  createdAt: PropTypes.object,
  status: PropTypes.string,
  products: PropTypes.array,
  total: PropTypes.number,
};

export default Orders;
