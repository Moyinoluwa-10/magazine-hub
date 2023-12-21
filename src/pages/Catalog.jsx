import Catalogue from "../components/Catalogue";
import SideBar from "../components/SideBar";

const Catalog = () => {
  return (
    <>
      <div className="grid h-screen min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
        <SideBar />
        <Catalogue />
      </div>
    </>
  );
};

export default Catalog;
