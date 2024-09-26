import React from 'react'
import {onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/Firebase/firebaseConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {signOut } from "firebase/auth";


function Navbar() {

  //Navigate

  const navigate = useNavigate()



   const [isloggedIn, setisloggedIn] = useState(false);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setisloggedIn(true);
        return
      } 
    });

    //login button functionality


    const loginButton = () => {

      navigate('/login')

    }


    //logout user

    const logoutBtn = () => {
      signOut(auth)
        .then(() => {
         alert('Logout sucessfully!')
         setisloggedIn(false)
        })
        .catch((error) => {
          alert(error)
        });

    }





  return (
   <>
   <div className="navbar bg-primary">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl text-white">Personal Blogging App</a>
  </div>


  <div className="flex-none">

    {
      isloggedIn ? 
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><p>Settings</p></li>
        <li><p onClick={logoutBtn}>Logout</p></li>
      </ul>
    </div> :<button onClick={loginButton} className='btn btn-warning'>LOGIN</button>
    }

    
  </div>
</div>
</>
  )
}

export default Navbar



