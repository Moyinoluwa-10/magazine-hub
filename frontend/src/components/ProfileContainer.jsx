// react & redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/feature/authSlice";
//icons
import { AiOutlineMail } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineLink } from "react-icons/hi";
import { MdModeEditOutline } from "react-icons/md";
// form
import { useFormik } from "formik";
import * as Yup from "yup";
// firebase
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage, auth } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const ProfileContainer = () => {
  const { authValue } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [userProfile, setUserProfile] = useState("");
  const [edit, setEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const docRef = doc(db, "users", authValue.uid);

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line
  }, []);

  async function getUserProfile() {
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      }
    } catch (err) {
      console.error(err);
    }
  }

  const formik = useFormik({
    initialValues: {
      location: userProfile?.location || "",
      website: userProfile?.website || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      website: Yup.string().url("Value must be a url"),
    }),
    onSubmit: (values) => {
      updateUserProfile(values);
      getUserProfile();
      setEdit(false);
    },
  });

  async function updateUserProfile(data) {
    try {
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpload(e) {
    const filesFolderRef = ref(storage, `userImages/${authValue.uid}`);
    try {
      const file = await uploadBytes(filesFolderRef, e.target.files[0]);
      const photoURL = await getDownloadURL(file.ref);
      await updateProfile(auth.currentUser, {
        photoURL,
      });
      dispatch(loginUser(auth.currentUser));
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRemove() {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: "",
      });
      dispatch(loginUser(auth.currentUser));
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="grid min-h-screen place-items-center bg-gray-200 px-5 pt-20 py-40 overflow-y-auto">
      <div className="max-w-md w-full p-6 bg-white rounded-md">
        <h1 className="font-semibold text-3xl mb-10">Your Profile</h1>
        <div className="w-48 h-48 mx-auto relative mb-10">
          <div className="w-full h-full mb-5 rounded-full bg-gray-100 overflow-hidden">
            <img
              src={
                authValue.photoURL
                  ? authValue.photoURL
                  : "https://res.cloudinary.com/dapwu9k1x/image/upload/v1703441325/download_vc8gvx.png"
              }
              alt="profile image"
              className="w-full"
            />
          </div>

          <span
            className="absolute bottom-2 left-5 bg-gray-100 p-2 rounded-full border border-gray-500 cursor-pointer"
            onClick={() => setIsOpen((open) => !open)}
          >
            <MdModeEditOutline />
          </span>

          {isOpen && (
            <div className="bg-gray-100 inline-block py-2 text-[#24292f] rounded-md border-gray-200 border text-[15px] leading-[24px] absolute left-5 -bottom-[70px]">
              <label
                htmlFor="file"
                className="px-5 hover:bg-gray-300 cursor-pointer block"
              >
                Upload a photo...
              </label>
              <input
                type="file"
                value={""}
                id="file"
                onChange={handleUpload}
                className="hidden"
              />
              <p
                className="hover:bg-gray-300 cursor-pointer px-5"
                onClick={handleRemove}
              >
                Remove photo
              </p>
            </div>
          )}
        </div>

        {!edit && (
          <button
            className="text-sm px-4 py-1 bg-gray-100 border border-gray-300 rounded-md w-full mb-4"
            onClick={() => setEdit(true)}
          >
            Edit profile
          </button>
        )}
        <h4 className="font-semibold text-2xl mb-2">{authValue.displayName}</h4>
        <div className="flex flex-col gap-2 text-gray-800">
          <p className="flex items-center text-base gap-2">
            <AiOutlineMail /> {authValue.email}
          </p>
          {!edit && (
            <>
              {userProfile?.location && (
                <p className="flex items-center text-base gap-2">
                  <IoLocationOutline /> {userProfile.location}
                </p>
              )}
              {userProfile?.website && (
                <p className="flex items-center text-base gap-2">
                  <HiOutlineLink />{" "}
                  <a href={userProfile.website}>
                    {userProfile.website.split("//")[1]}
                  </a>
                </p>
              )}
            </>
          )}
        </div>

        {edit && (
          <form
            className="flex flex-col gap-3 text-gray-800 mt-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex items-center text-base gap-2">
              <IoLocationOutline />{" "}
              <input
                type="text"
                className="border placeholder:text-[13px] text-[13px] px-3 py-[2px] rounded-sm w-full"
                placeholder="Location"
                {...formik.getFieldProps("location")}
              />
            </div>
            <div>
              <div className="flex items-center text-base gap-2">
                <HiOutlineLink />{" "}
                <input
                  type="text"
                  className="border placeholder:text-[13px] text-[13px] px-3 py-[2px] rounded-sm w-full"
                  placeholder="Website"
                  {...formik.getFieldProps("website")}
                />
              </div>
              {formik.touched.website && formik.errors.website ? (
                <p className="text-[13px] text-red-500 mt-[0px] pl-6 block">
                  {formik.errors.website}
                </p>
              ) : null}
            </div>
            <div className="flex gap-3 items-center mt-2">
              <button
                type="submit"
                className="text-sm px-4 py-1 bg-gray-300 border border-gray-500 rounded-md"
              >
                Save
              </button>
              <button
                className="text-sm px-4 py-1 bg-gray-300 border border-gray-500 rounded-md"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ProfileContainer;
