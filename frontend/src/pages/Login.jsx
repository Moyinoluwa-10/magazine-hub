import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/feature/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function signIn(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginUser(auth.currentUser));
      navigate("/catalog");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGoogleAuth() {
    try {
      await signInWithPopup(auth, googleProvider);
      dispatch(loginUser(auth.currentUser));
      navigate("/catalog");
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("This field is required"),
    }),
    onSubmit: (values) => {
      signIn(values.email, values.password);
    },
  });

  return (
    <section className="grid min-h-screen place-items-center bg-gray-200 px-5 py-10">
      <div className="max-w-md w-full p-6 bg-white rounded-md">
        <h1 className="text-center font-semibold text-2xl mb-10">Log In</h1>
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

          <p className="text-center text-[13px]">Or log in with</p>
          <div className="flex justify-center mt-4 mb-4">
            <button
              className="mx-2 p-3 border border-gray-400 rounded-md text-lg"
              onClick={handleGoogleAuth}
            >
              <FcGoogle />
            </button>
          </div>
        </div>

        <div>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-blue-600 hover:underline transition-all"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
