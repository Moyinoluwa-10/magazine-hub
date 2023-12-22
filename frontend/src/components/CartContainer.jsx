import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartTotal } from "../redux/feature/cartSlice";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const CartContainer = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
    // eslint-disable-next-line
  }, [items]);

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
            <button className="bg-black text-white py-2 px-5 rounded-md ml-auto block transition-all hover:bg-black/80">
              Checkout
            </button>
          </footer>
        </>
      )}
    </section>
  );
};

export default CartContainer;
