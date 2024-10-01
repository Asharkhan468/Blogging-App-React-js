

























// import React from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "../config/Firebase/firebaseConfig";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import { collection, query, where, getDocs } from "firebase/firestore";

// function Navbar() {
//   //Navigate

//   const navigate = useNavigate();

//   const [isloggedIn, setisloggedIn] = useState(false);

//   //state for store userdata like profile

//   const [userData, setUserData] = useState(null);

//   //get data from firebase by uid using query

//   const getData = async (user) => {
//     const q = query(collection(db, "user"), where("uid", "==", user.uid));

//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       const profile = doc.data().profile;

//       //set the user profile in userdata

//       setUserData(profile);
//     });
//   };

//   //check if user login or not by firebase function means usestate

//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//       setisloggedIn(true);
//       getData(user);

//       return;
//     }
//   });

//   //login button functionality which navigate user on login

//   const loginButton = () => {
//     navigate("/login");
//   };

//   //logout user using firebase function signout

//   const logoutBtn = () => {
//     signOut(auth)
//       .then(() => {
//         setisloggedIn(false);
//         alert("Logout sucessfully!");
//       })
//       .catch((error) => {
//         alert(error);
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
//                     <Link to="/login" className="justify-between">
//                       Profile
//                       <span className="badge">New</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/dashboard">Dashboard</Link>
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
  const [isloggedIn, setisloggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

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
        setisloggedIn(true);
        getData(user);
      } else {
        setisloggedIn(false);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Login button functionality
  const loginButton = () => {
    navigate("/login");
  };

  // Logout functionality
  const logoutBtn = () => {
    signOut(auth)
      .then(() => {
        setisloggedIn(false);
        alert("Logout successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div className="navbar bg-primary">
        <span className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl text-white">
            Personal Blogging App
          </Link>
        </span>

        <div className="flex-none">
          {isloggedIn ? (
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
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
                    <p onClick={logoutBtn}>Logout</p>
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
    </>
  );
}

export default Navbar;
