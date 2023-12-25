// react & redux
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart, getCartTotal } from "../redux/feature/cartSlice";
// icons
import { IoCheckmarkOutline } from "react-icons/io5";

const CheckoutContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
    dispatch(getCartTotal());
    // eslint-disable-next-line
  }, []);

  return (
    <section className="grid min-h-screen place-items-center bg-gray-200 px-5 pt-20 py-40 overflow-y-auto">
      <div className="max-w-md w-full p-6 bg-white rounded-md">
        <h1 className="font-bold text-2xl mb-10">Checkout Successful</h1>
        <div>
          <div className="flex flex-col items-center gap-4 mb-5">
            {/* <CheckIcon className="h-20 w-20 text-green-500" /> */}
            <IoCheckmarkOutline className="text-7xl sm:text-9xl text-green-500" />
            <h3 className="text-xl font-semibold">Thank You for Your Order!</h3>
            <p className="text-gray-500">
              Your magazines will be delivered to you soon.
            </p>
          </div>
          <Link
            className="bg-black text-white py-2 px-5 rounded-md transition-all hover:bg-black/80 ml-auto"
            to={"/orders"}
          >
            View Order
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CheckoutContainer;
