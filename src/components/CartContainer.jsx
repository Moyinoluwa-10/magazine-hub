import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fillCart, getCartTotal } from "../redux/feature/cartSlice";
import CartItem from "./CartItem";

const CartContainer = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [items]);

  if (items.length === 0) {
    return (
      <>
        <div>Your shopping cart is empty</div>
        <button onClick={() => dispatch(fillCart())}>Add Docs</button>;
      </>
    );
  }

  return (
    <div className="p-4 overflow-scroll">
      <h1 className="text-4xl font-bold mb-16">Shopping Cart</h1>

      <div className="grid gap-4">
        {items.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>

      <footer className="my-10">
        <h4 className="flex justify-between font-semibold text-lg mb-5">
          Total <span>${totalAmount}</span>
        </h4>
        <button className="bg-black text-white py-2 px-5 rounded-md ml-auto block">
          Checkout
        </button>
      </footer>
    </div>
  );
};

export default CartContainer;
