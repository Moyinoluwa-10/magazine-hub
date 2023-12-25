import PropTypes from "prop-types";

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

export default OrderItem;
