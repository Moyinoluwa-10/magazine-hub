// components
import Header from "../components/Header";
import OrderContainer from "../components/OrderContainer";
import SideBar from "../components/SideBar";

const Order = () => {
  return (
    <>
      <Header />
      <div
        className="grid md:grid-cols-[280px_1fr] w-full overflow-hidden mt-16 md:mt-0"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <SideBar />
        <OrderContainer />
      </div>
    </>
  );
};

export default Order;
