import CartContainer from "../components/CartContainer";
import Catalog from "../components/Catalogue";
import SideBar from "../components/SideBar";

const Cart = () => {
  return (
    <>
      <div className="grid h-screen min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
        <SideBar />
        <CartContainer />
      </div>
    </>
  );
};

export default Cart;
