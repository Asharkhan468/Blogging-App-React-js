import { onAuthStateChanged } from 'firebase/auth'
import { auth , db } from '../../config/Firebase/firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";

import React, { useEffect, useState } from 'react'

function Profile() {

  const [userData , setUserData] = useState(null)

  onAuthStateChanged(auth , async (user) => {
    if (user) {
      const uid = user.uid;

      const getUserData = async () => {
        const q = query(collection(db, "user"), where("uid", "==", uid));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  setUserData(doc.data())
  
});




}
getUserData()

return

     


    }

    
  })


  return (
    <>
      <div className="text-center font-semibold text-3xl mt-3">
        <h1>My Profile</h1>
      </div>

      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        {/* Profile Section */}

        {userData && (
          <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 mb-8 text-center">
            <div className="flex justify-center">
              <img
                src={userData.profile}
                alt="User Profile"
                className="w-32 h-32 rounded-full border-4 border-indigo-500"
              />
            </div>
            <h2 className="text-2xl font-bold mt-4">{userData.userName}</h2>
            <p className="text-gray-600">{userData.email}</p>
          </div>
        )}

        {/* User Posts */}
      </div>
    </>
  );
}

export default Profile