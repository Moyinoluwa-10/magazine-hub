//components
import CatalogContainer from "../components/CatalogContainer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Catalog = () => {
  return (
    <>
      <Header />
      <div
        className="grid md:grid-cols-[280px_1fr] w-full overflow-hidden mt-[60px] md:mt-0"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <SideBar />
        <CatalogContainer />
      </div>
    </>
  );
};

export default Catalog;
