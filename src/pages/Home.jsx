import Catalog from "../components/Catalogue";
import SideBar from "../components/SideBar";

const Home = () => {
  return (
    <>
      <div className="grid h-screen min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
        <SideBar />
        <Catalog />
      </div>
    </>
  );
};

export default Home;