import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const Login = () => {
  return (
    <section>
      <div className="grid h-screen place-items-center bg-gray-200">
        <div className="max-w-md w-full p-6 bg-white rounded-md">
          <div>
            <h1 className="text-center font-semibold text-2xl mb-10">
              Sign Up
            </h1>
          </div>
          <div>
            <form>
              <input
                className="w-full mb-4 border border-gray-400 rounded-md py-3 px-5"
                placeholder="Email"
                type="email"
              />
              <input
                className="w-full mb-4 border border-gray-400 rounded-md py-3 px-5"
                placeholder="Password"
                type="password"
              />
              <button className="w-full mb-4 mt-3 py-3 px-5 bg-black hover:bg-opacity-80 transition-all duration-200 text-white rounded-md">
                Log in
              </button>
            </form>
            <div className="text-center text-sm">Or sign up with</div>
            <div className="flex justify-center mt-4 mb-4">
              <button className="mx-2 p-3 border border-gray-400 rounded-md text-lg">
                <FcGoogle />
              </button>
              <button className="mx-2 p-3 border border-gray-400 rounded-md text-lg">
                <FaFacebookF className="text-blue-600" />
              </button>
            </div>
          </div>
          <div>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-blue-600" href="#">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
