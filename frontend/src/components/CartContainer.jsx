// react & redux
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, getCartTotal } from "../redux/feature/cartSlice";
// components
import CartItem from "./CartItem";
// axios
import axios from "axios";

const CartContainer = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { authValue } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
    // eslint-disable-next-line
  }, [items]);

  const handleCheckout = () => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/stripe/create-checkout-session`, {
        cartItems: items,
        userId: authValue.uid,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <section className="p-4 overflow-x-auto">
      <h1 className="text-3xl font-bold mb-10">Shopping Cart</h1>

      {items.length === 0 ? (
        <>
          <p className="mb-4">Your shopping cart is empty</p>
          <Link
            to={"/catalog"}
            className="bg-black text-white py-2 px-5 rounded-md transition-all hover:bg-black/80"
          >
            Explore
          </Link>
        </>
      ) : (
        <>
          <div className="grid gap-4">
            {items.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })}
          </div>

          <footer className="my-10">
            <h4 className="flex justify-between font-semibold text-lg mb-5">
              Total <span>${totalAmount}</span>
            </h4>

            <div className="flex items-center justify-between">
              <button
                className="bg-red-500 text-white py-2 px-5 rounded-md  block transition-all hover:bg-red-500/80"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>

              {authValue ? (
                <button
                  className="bg-black text-white py-2 px-5 rounded-md  block transition-all hover:bg-black/80"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="bg-black text-white py-2 px-5 rounded-md  block transition-all hover:bg-black/80"
                >
                  Log in to Checkout
                </Link>
              )}
            </div>
          </footer>
        </>
      )}
    </section>
  );
};

export default CartContainer;
