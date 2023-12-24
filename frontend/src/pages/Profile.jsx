import Header from "../components/Header";
import ProfileBox from "../components/ProfileBox";
import SideBar from "../components/SideBar";

const Profile = () => {
  return (
    <>
      <Header />
      <div
        className="grid lg:grid-cols-[280px_1fr] w-full overflow-hidden"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <SideBar />
        <ProfileBox />
      </div>
    </>
  );
};

export default Profile;
