import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/feature/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authValue } = useSelector((state) => state.auth);

  useEffect(() => {
    authValue && navigate("/catalog");
    // eslint-disable-next-line
  }, []);

  async function signup(data) {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: `${data.firstName} ${data.lastName}`,
      });
      dispatch(loginUser(auth.currentUser));
      return;
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("This field is required"),
      lastName: Yup.string().required("This field is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("This field is required"),
      confirmPassword: Yup.string()
        .required("This field is required")
        .oneOf(
          [Yup.ref("password"), null],
          "Password and Compare Password fields do not match"
        ),
    }),
    onSubmit: (values) => {
      signup(values);
      navigate("/catalog");
    },
  });

  return (
    <section className="grid min-h-screen place-items-center bg-gray-200 px-5 py-10">
      <div className="max-w-md w-full p-6 bg-white rounded-md">
        <h1 className="text-center font-semibold text-2xl mb-10">Sign Up</h1>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <input
                className="w-full border border-gray-400 rounded-md py-3 px-5 outline-none transition-all focus:border-black"
                placeholder="First Name"
                type="text"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-[13px] text-red-500 mt-[2px]">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <input
                className="w-full border border-gray-400 rounded-md py-3 px-5 outline-none transition-all focus:border-black"
                placeholder="Last Name"
                type="text"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-[13px] text-red-500 mt-[2px]">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>

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

            <div className="mb-4">
              <input
                className="w-full border border-gray-400 rounded-md py-3 px-5 outline-none transition-all focus:border-black"
                placeholder="Confirm Password"
                type="password"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-[13px] text-red-500 mt-[2px]">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-full mb-4 mt-3 py-3 px-5 bg-black hover:bg-opacity-80 transition-all duration-200 text-white rounded-md"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-[13px]">Or sign up with</p>
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
          <p className="text-center text-[13px]">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-600 hover:underline transition-all"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
