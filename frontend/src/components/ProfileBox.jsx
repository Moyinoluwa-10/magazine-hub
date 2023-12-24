import { useSelector } from "react-redux";
import { AiOutlineMail } from "react-icons/ai";

const ProfileBox = () => {
  const { authValue } = useSelector((state) => state.auth);
  console.log(authValue);
  console.log(authValue.createdAt);

  return (
    <section className="grid min-h-screen place-items-center bg-gray-200 px-5 py-10">
      <div className="max-w-md w-full p-6 bg-white rounded-md">
        <h1 className="font-semibold text-2xl mb-10">Your Profile</h1>
        <img
          src={authValue.photoURL}
          alt=""
          className="w-48 h-48 rounded-full bg-gray-100 mx-auto mb-5"
        />
        <h4 className="font-semibold text-2xl mb-2">{authValue.displayName}</h4>

        <p className="flex items-center text-base gap-2">
          <AiOutlineMail /> {authValue.email}
        </p>
      </div>
    </section>
  );
};

export default ProfileBox;
