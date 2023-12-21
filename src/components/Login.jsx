import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Link
      to={"/login"}
      className="w-full mb-4 mt-3 py-3 px-5 bg-black hover:bg-opacity-80 transition-all duration-200 text-white rounded-md"
    >
      Log in
    </Link>
  );
};

export default Login;
