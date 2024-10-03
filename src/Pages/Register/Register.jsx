import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage, db } from "../../config/Firebase/firebaseConfig";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

// Error Pop-up Component
function ErrorPopup({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">
          Invalid Credentials
        </h2>
        <p className="text-lg">
          Please check your email or password and try again.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// Success Pop-up Component
function SuccessPopup({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold text-green-600 mb-4">Success!</h2>
        <p className="text-lg">You have registered successfully.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState("REGISTER");
  const [successPopup, setSuccessPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false); // State for error pop-up
  const navigate = useNavigate();

  const RegisterUserToFirebase = (data) => {
    setLoading(
      <span className="loading loading-spinner text-primary loading-lg"></span>
    );

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;

        const profile = data.userProfile[0];
        const UserProfileStorageRef = ref(storage, data.userProfile[0].name);

        const UserAddedtoFirestore = () => {
          uploadBytes(UserProfileStorageRef, profile)
            .then(() => {
              getDownloadURL(UserProfileStorageRef)
                .then((url) => {
                  const setDataInFirebase = async () => {
                    await addDoc(collection(db, "user"), {
                      userName: data.username,
                      email: data.email,
                      uid: user.uid,
                      profile: url,
                    });
                    setSuccessPopup(true); // Show the success pop-up
                    setTimeout(() => {
                      navigate("/");
                    }, 2000);
                  };
                  setDataInFirebase();
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((err) => {
              console.log("File upload error ===>", err);
            });
        };
        UserAddedtoFirestore();
      })
      .catch((error) => {
        setLoading("REGISTER");
        setErrorPopup(true); // Show the error pop-up when registration fails
      });
  };

  return (
    <div className="shadow-2xl p-[30px] flex justify-center flex-col items-center bg-white border-4 w-[21rem] sm:w-[35rem] md:w-[35rem] lg:w-[35rem] m-[auto] mt-[17vh] rounded-2xl">
      <div>
        <h1 className="text-center font-sans font-bold text-2xl">REGISTER</h1>
      </div>
      <form onSubmit={handleSubmit(RegisterUserToFirebase)}>
        <label className="input input-bordered flex items-center gap-2 mt-5 w-[19rem] sm:w-[25rem] md:w-[25rem] lg:w-[25rem]">
          <input
            type="text"
            className="grow"
            {...register("username", { required: true })}
            placeholder="Username"
          />
        </label>
        {errors.username && (
          <span className="text-red-600">Username is required</span>
        )}

        <label className="input input-bordered flex items-center gap-2 mt-5 w-[19rem] sm:w-[25rem] md:w-[25rem] lg:w-[25rem]">
          <input
            type="text"
            className="grow"
            {...register("email", { required: true })}
            placeholder="Email"
          />
        </label>
        {errors.email && (
          <span className="text-red-600">Email is required</span>
        )}

        <label className="input input-bordered flex items-center gap-2 w-[19rem] mt-4 sm:w-[25rem] md:w-[25rem] lg:w-[25rem]">
          <input
            type="password"
            className="grow"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </label>
        {errors.password && (
          <span className="text-red-600">Password is required</span>
        )}

        <input
          type="file"
          className="file-input file-input-bordered flex items-center w-[19rem] mt-4 sm:w-[25rem] md:w-[25rem] lg:w-[25rem]"
          {...register("userProfile")}
        />

        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-warning w-[19rem] mt-4 sm:w-[25rem] md:w-[25rem] lg:w-[25rem]"
          >
            {loading}
          </button>
        </div>
      </form>

      {/* Success and Error Pop-ups */}
      <SuccessPopup
        show={successPopup}
        onClose={() => setSuccessPopup(false)}
      />
      <ErrorPopup show={errorPopup} onClose={() => setErrorPopup(false)} />
    </div>
  );
}

export default Register;
