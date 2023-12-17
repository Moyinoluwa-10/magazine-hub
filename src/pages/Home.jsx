import Catalog from "../Components/Catalog";
import SideBar from "../Components/SideBar";

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
