import Catalogue from "../components/Catalogue";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Catalog = () => {
  return (
    <>
      <Header />
      <div
        className="grid lg:grid-cols-[280px_1fr] w-full overflow-hidden"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <SideBar />
        <Catalogue />
      </div>
    </>
  );
};

export default Catalog;
