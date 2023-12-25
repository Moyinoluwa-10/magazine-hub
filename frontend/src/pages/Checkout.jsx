// components
import CheckoutContainer from "../components/CheckoutContainer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Checkout = () => {
  return (
    <>
      <Header />
      <div
        className="grid lg:grid-cols-[280px_1fr] w-full overflow-hidden"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <SideBar />
        <CheckoutContainer />
      </div>
    </>
  );
};

export default Checkout;
