// components
import CartContainer from "../components/CartContainer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Cart = () => {
  return (
    <>
      <Header />
      <div
        className="grid lg:grid-cols-[280px_1fr] w-full overflow-hidden"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <SideBar />
        <CartContainer />
      </div>
    </>
  );
};

export default Cart;
