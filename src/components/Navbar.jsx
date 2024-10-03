// import React, { useEffect, useState } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth, db } from "../config/Firebase/firebaseConfig";
// import { Link, useNavigate } from "react-router-dom";
// import { collection, query, where, getDocs } from "firebase/firestore";

// function Navbar() {
//   const navigate = useNavigate();
//   const [isloggedIn, setisloggedIn] = useState(false);
//   const [userData, setUserData] = useState(null);

//   // Function to get data from Firebase by uid using query
//   const getData = async (user) => {
//     const q = query(collection(db, "user"), where("uid", "==", user.uid));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       const profile = doc.data().profile;
//       setUserData(profile);
//     });
//   };

//   // UseEffect to check if user is logged in or not
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setisloggedIn(true);
//         getData(user);
//       } else {
//         setisloggedIn(false);
//       }
//     });

//     // Clean up the listener when the component unmounts
//     return () => unsubscribe();
//   }, []);

//   // Login button functionality
//   const loginButton = () => {
//     navigate("/login");
//   };

//   // Logout functionality
//   const logoutBtn = () => {
//     signOut(auth)
//       .then(() => {
//         setisloggedIn(false);
//         alert("Logout successfully!");
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   };

//   return (
//     <>
//       <div className="navbar bg-primary">
//         <span className="flex-1">
//           <Link to="/" className="btn btn-ghost text-xl text-white">
//             Personal Blogging App
//           </Link>
//         </span>

//         <div className="flex-none">
//           {isloggedIn ? (
//             <nav className="flex-none">
//               <div className="dropdown dropdown-end">
//                 <div
//                   tabIndex={0}
//                   role="button"
//                   className="btn btn-ghost btn-circle avatar"
//                 >
//                   <div className="w-10 rounded-full">
//                     <img alt="User Profile" src={userData} />
//                   </div>
//                 </div>
//                 <ul
//                   tabIndex={0}
//                   className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//                 >
//                   <li>
//                     <Link to="/profile" className="justify-between">
//                       Profile
//                       <span className="badge">New</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/dashboard">Dashboard</Link>
//                   </li>
//                   <li>
//                     <Link to="/">Home</Link>
//                   </li>
//                   <li>
//                     <p onClick={logoutBtn}>Logout</p>
//                   </li>
//                 </ul>
//               </div>
//             </nav>
//           ) : (
//             <button className="btn btn-warning" onClick={loginButton}>
//               LOGIN
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Navbar;















import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../config/Firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Function to get data from Firebase by uid using query
  const getData = async (user) => {
    const q = query(collection(db, "user"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const profile = doc.data().profile;
      setUserData(profile);
    });
  };

  // UseEffect to check if user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        getData(user);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Login button functionality
  const loginButton = () => {
    navigate("/login");
  };

  // Open the logout confirmation
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  // Confirm logout functionality
  const confirmLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        setShowLogoutConfirm(false);
        setShowSuccessModal(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // Close the logout confirmation
  const closeLogoutConfirm = () => {
    setShowLogoutConfirm(false);
  };

  // Close the success modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <div className="navbar bg-primary p-4">
        <span className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl text-white">
            Personal Blogging App
          </Link>
        </span>

        <div className="flex-none">
          {isLoggedIn ? (
            <nav className="flex-none">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="User Profile" src={userData} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-md"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <p
                      className="text-red-600 cursor-pointer"
                      onClick={handleLogoutClick}
                    >
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            </nav>
          ) : (
            <button className="btn btn-warning" onClick={loginButton}>
              LOGIN
            </button>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-evenly">
              <button
                className="btn btn-danger px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                onClick={confirmLogout}
              >
                Yes
              </button>
              <button
                className="btn btn-error px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-black"
                onClick={closeLogoutConfirm}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">
              You are Logged out successfully!
            </h2>
            <div className="text-center">
              <button
                className="btn btn-primary px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 mt-4 "
                onClick={closeSuccessModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
