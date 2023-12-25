// components
import Landing from "../components/Landing.jsx";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Home = () => {
  return (
    <>
      <Header />
      <div
        className="grid lg:grid-cols-[280px_1fr] w-full overflow-hidden"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <SideBar />
        <Landing />
      </div>
    </>
  );
};

export default Home;
