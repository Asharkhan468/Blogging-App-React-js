import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/Firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import AlertComponent from "../../components/Alert";


function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Loading state
  const [loading, setLoading] = useState("LOGIN");

  // Success popup state
  const [showPopup, setShowPopup] = useState(false);

  // Navigate
  const navigate = useNavigate();

  const loginUserFromFirebase = (data) => {
    setLoading(
      <span className="loading loading-spinner text-primary loading-lg"></span>
    );

    // Login user from Firebase
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        setShowPopup(true); // Show success modal

        const getData = async () => {
          const q = query(collection(db, "user"), where("uid", "==", user.uid));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());

            // Navigate after successful login
            setTimeout(() => {
              setShowPopup(false); // Hide pop-up after delay
              navigate("/");
            }, 2000); // Wait for 2 seconds before redirecting
          });
        };
        getData();
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoading("LOGIN");
      });
  };

  return (
    <>
      <div className="shadow-2xl p-[30px] flex justify-center flex-col items-center bg-white border-4 w-[21rem] sm:w-[35rem] md:w-[35rem] lg:w-[35rem] m-[auto] mt-[17vh] rounded-2xl">
        <div>
          <h1 className="text-center font-sans font-bold text-2xl">LOGIN</h1>
        </div>
        <form onSubmit={handleSubmit(loginUserFromFirebase)}>
          <label className="input input-bordered flex items-center gap-2 mt-5 w-[19rem] sm:w-[25rem] md:w-[25rem] lg:w-[25rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-600">Email is required</span>
          )}

          <label className="input input-bordered flex items-center gap-2 w-[19rem] mt-4 sm:w-[25rem] md:w-[25rem] lg:w-[25rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
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

          <div className="mt-3">
            <button
              type="submit"
              className="btn btn-warning w-[19rem] mt-4 sm:w-[25rem] md:w-[25rem] lg:w-[25rem]"
            >
              {loading}
            </button>
          </div>
        </form>

        <div className="mt-4">
          <p className="font-sans">
            Don't have an account?{" "}
            <Link to={"/register"} className="font-bold cursor-pointer">
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Registration Success Pop-up */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center animate-fadeInUp">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
            <p className="text-lg text-gray-700">
              You have successfully logged in!
            </p>
            <div className="mt-4">
              <span className="loading loading-spinner text-primary"></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
