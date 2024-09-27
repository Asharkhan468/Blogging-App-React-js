import React from 'react'
import {onAuthStateChanged } from "firebase/auth";
import { auth , db } from '../config/Firebase/firebaseConfig';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";



function Navbar() {


  //Navigate

  const navigate = useNavigate();

  const [isloggedIn, setisloggedIn] = useState(false);

  //state for store userdata like profile

  const [userData , setUserData] = useState(null)



 //get data from firebase by uid using query

  const getData = async (user) => {
    const q = query(collection(db, "user"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

      const profile = doc.data().profile;

      //set the user profile in userdata

      setUserData(profile)

      
    });
  };

  //check if user login or not by firebase function means usestate

  
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setisloggedIn(true);
        getData(user)
        
        
        

        return;
      }
    });
  

  

  //login button functionality which navigate user on login 

  const loginButton = () => {
    navigate("/login");
  };

  //logout user using firebase function signout

  const logoutBtn = () => {
    signOut(auth)
      .then(() => {
        setisloggedIn(false);
        alert("Logout sucessfully!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <div className="navbar bg-primary">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white">
            Personal Blogging App
          </a>
        </div>

        <div className="flex-none">
          {isloggedIn ? (
            <div className="flex-none">
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
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      Dashboard
                      
                    </a>
                  </li>
                  <li>
                    <p onClick={logoutBtn}>Logout</p>
                  </li>
                </ul>
              </div>
            </div>
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

export default Navbar



