import React from 'react'
import {onAuthStateChanged } from "firebase/auth";
import { auth , db } from '../config/Firebase/firebaseConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";



function Navbar() {
  //Navigate

  const navigate = useNavigate();

  const [isloggedIn, setisloggedIn] = useState(false);

  const [userData , setUserData] = useState(null)

 

  const getData = async (user) => {
    const q = query(collection(db, "user"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

      const image =
        "https://images.unsplash.com/photo-1727162334483-64741c31f45e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D";

        const userProfile = doc.data().profile;

      setUserData(userProfile)

      
      
    

      // console.log(doc.data());
      
      
      
      
    });
  };

  {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setisloggedIn(true);
        getData(user)
        
        
        

        return;
      }
    });
  }

  

  //login button functionality

  const loginButton = () => {
    navigate("/login");
  };

  //logout user

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
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={userData}
                    />
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
                    <p>Settings</p>
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



