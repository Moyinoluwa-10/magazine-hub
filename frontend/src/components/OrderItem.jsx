// react
import PropTypes from "prop-types";

const OrderItem = ({ createdAt, payment_status, total, products }) => {
  return (
    <tr>
      <td className="p-2 border">{createdAt.toDate().toDateString()}</td>
      <td className="p-2 border">
        {products.map((product) => product.productId).join(",")}
      </td>
      <td className="p-2 border">{total}</td>
      <td className="p-2 border">{payment_status}</td>
    </tr>
  );
};

OrderItem.propTypes = {
  createdAt: PropTypes.object,
  payment_status: PropTypes.string,
  products: PropTypes.array,
  total: PropTypes.number,
};

export default OrderItem;
