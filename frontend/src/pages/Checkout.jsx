// components
import CheckoutContainer from "../components/CheckoutContainer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Checkout = () => {
  return (
    <>
      <Header />
      <div
        className="grid md:grid-cols-[280px_1fr] w-full overflow-hidden mt-16 md:mt-0"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <SideBar />
        <CheckoutContainer />
      </div>
    </>
  );
};

export default Checkout;
