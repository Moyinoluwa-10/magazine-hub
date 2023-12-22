import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
// import { FaFacebookF } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const Login = () => {
  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleGoogleAuth() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(auth?.currentUser);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
      password: Yup.string().required("This field is required"),
    }),
    onSubmit: (values) => {
      signIn(values.email, values.password);
    },
  });

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
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <input
                  className="w-full border border-gray-400 rounded-md py-3 px-5 outline-none transition-all focus:border-black"
                  placeholder="Email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-[13px] text-red-500 mt-[2px]">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full border border-gray-400 rounded-md py-3 px-5 outline-none transition-all focus:border-black"
                  placeholder="Password"
                  type="password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-[13px] text-red-500 mt-[2px]">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full mb-4 mt-3 py-3 px-5 bg-black hover:bg-opacity-80 transition-all duration-200 text-white rounded-md"
              >
                Log in
              </button>
            </form>
            <button onClick={logout}>Logout</button>
            <div className="text-center text-[13px]">Or log in with</div>
            <div className="flex justify-center mt-4 mb-4">
              <button
                className="mx-2 p-3 border border-gray-400 rounded-md text-lg"
                onClick={handleGoogleAuth}
              >
                <FcGoogle />
              </button>
              {/* <button className="mx-2 p-3 border border-gray-400 rounded-md text-lg">
                <FaFacebookF className="text-blue-600" />
              </button> */}
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
