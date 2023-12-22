import Header from "../components/Header";
import Orders from "../components/Orders";
import SideBar from "../components/SideBar";

const Order = () => {
  return (
    <>
      <Header />
      <div
        className="grid lg:grid-cols-[280px_1fr] w-full overflow-hidden"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <SideBar />
        <Orders />
      </div>
    </>
  );
};

export default Order;
