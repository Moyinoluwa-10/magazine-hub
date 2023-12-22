import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const Logout = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      className="w-full mb-4 mt-3 py-3 px-5 bg-black hover:bg-opacity-80 transition-all duration-200 text-white rounded-md"
      onClick={handleSignOut}
    >
      Sign out
    </button>
  );
};

export default Logout;
