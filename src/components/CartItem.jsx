import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { decrease, increase, remove } from "../redux/feature/cartSlice";

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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  img: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  amount: PropTypes.number,
};

export default CartItem;
