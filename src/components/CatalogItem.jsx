import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/feature/cartSlice";

const CatalogItem = ({ id, title, description, img, price }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex flex-col gap-2 border border-gray-300 p-6 rounded-md">
        <img
          alt={title}
          className="w-full object-cover bg-gray-100"
          height="200"
          src={img}
          style={{
            aspectRatio: "200/200",
            objectFit: "cover",
          }}
          width="200"
        />
        <div className="font-semibold">{title}</div>
        <div className="text-gray-500">
          This is the description of Magazine 2. {description}
        </div>
        <button
          className="border py-2 px-2 rounded-md hover:bg-gray-100 transition-all cursor-pointer"
          onClick={() =>
            dispatch(addToCart({ id, title, description, price, img }))
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
CatalogItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  price: PropTypes.number,
};

export default CatalogItem;
