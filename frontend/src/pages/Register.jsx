// react & redux
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/feature/authSlice";
// icons
import { FcGoogle } from "react-icons/fc";
//form
import { useFormik } from "formik";
import * as Yup from "yup";
// firebase
import { auth, db, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const Register = () => {
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function signup(data) {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: `${data.firstName} ${data.lastName}`,
      });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        location: "",
        website: "",
        createdAt: serverTimestamp(),
      });
      dispatch(loginUser(auth.currentUser));
      navigate("/catalog");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use");
      }
    }
  }

  async function handleGoogleAuth() {
    try {
      await signInWithPopup(auth, googleProvider);
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        location: "",
        website: "",
        createdAt: serverTimestamp(),
      });
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
              {error ? (
                <div className="text-[13px] text-red-500 mt-[2px]">{error}</div>
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
