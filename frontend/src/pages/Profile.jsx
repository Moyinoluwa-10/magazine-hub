// components
import Header from "../components/Header";
import ProfileContainer from "../components/ProfileContainer";
import SideBar from "../components/SideBar";

const Profile = () => {
  return (
    <>
      <Header />
      <div
        className="grid md:grid-cols-[280px_1fr] w-full overflow-hidden mt-[60px] md:mt-0"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <SideBar />
        <ProfileContainer />
      </div>
    </>
  );
};

export default Profile;
