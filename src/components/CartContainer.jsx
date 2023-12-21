import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import {
  decrease,
  getCartTotal,
  increase,
  remove,
} from "../redux/feature/cartSlice";

const CartContainer = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [items]);

  if (items.length === 0) {
    return <div>Your shopping cart is empty</div>;
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

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex items-center gap-4">
        <img
          alt={title}
          className="w-20 h-20 aspect-square object-cover"
          src={img}
        />
        <div>
          <h4 className="font-semibold">{title}</h4>
          <div className="">${price}</div>
          <MdDelete
            className="text-red-600 cursor-pointer"
            onClick={() => dispatch(remove(id))}
          />
        </div>

        <div className="ml-auto flex flex-col gap-1 items-center">
          <FaAngleUp
            className="cursor-pointer"
            onClick={() => dispatch(increase(id))}
          />
          <p>{amount}</p>
          <FaAngleDown
            className="cursor-pointer"
            onClick={() => dispatch(decrease(id))}
          />
        </div>
      </div>
      <hr />
    </>
  );
};

CartItem.propTypes = {
  id: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  amount: PropTypes.number,
};

export default CartContainer;
