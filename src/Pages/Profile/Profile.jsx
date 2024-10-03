// import { onAuthStateChanged } from 'firebase/auth'
// import { auth , db } from '../../config/Firebase/firebaseConfig';
// import { collection, query, where, getDocs } from "firebase/firestore";

// import React, { useEffect, useState } from 'react'

// function Profile() {

//   const [userData , setUserData] = useState(null)

//   onAuthStateChanged(auth , async (user) => {
//     if (user) {
//       const uid = user.uid;

//       const getUserData = async () => {
//         const q = query(collection(db, "user"), where("uid", "==", uid));

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   setUserData(doc.data())
  
// });




// }
// getUserData()

// return

     


//     }

    
//   })


//   return (
//     <>
//       <div className="text-center font-semibold text-3xl mt-3">
//         <h1>My Profile</h1>
//       </div>

//       <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
//         {/* Profile Section */}

//         {userData && (
//           <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 mb-8 text-center flex justify-center flex-col items-center">
//             <div className="w-32 h-32 border-4 border-indigo-500 rounded-lg overflow-hidden shadow-lg ">
//               <img
//                 src={userData.profile}
//                 alt="User Profile"
//                 className="w-full h-full object-cover text-center"
//               />
//             </div>
//             <h2 className="text-2xl font-bold mt-4">{userData.userName}</h2>
//             <p className="text-gray-600">{userData.email}</p>
//           </div>
//         )}

//         {/* User Posts */}
//       </div>
//     </>
//   );
// }

// export default Profile









































// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db , storage } from "../../config/Firebase/firebaseConfig";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import React, { useEffect, useState, useRef } from "react";
// import { getStorage, ref, uploadBytes , getDownloadURL } from "firebase/storage";

// function Profile() {
//   const [userData, setUserData] = useState(null);
//   const fileInputRef = useRef(null); // Reference to the file input element

//   // Open the file selector when the pencil icon is clicked
//   const handleEditClick = () => {
//     fileInputRef.current.click(); // Programmatically click the hidden file input
//   };

//   // Function to handle file selection
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     //ref of storage

//     const storageRef = ref(storage , selectedFile.name);

//     const uploadFile = () => {
//       uploadBytes(storageRef, selectedFile)
//         .then((snapshot) => {
//           console.log("Uploaded a blob or file!");

//           getDownloadURL(storageRef)
//           .then((url) => {
//             console.log(url);
            
//           })
//           .catch((err) => {
//             console.log('Error in url' , err);
            
//           })

//         })
//         .catch((err) => console.log("error in uploading", err));

//         console.log(auth.currentUser);
        
//     };
//     uploadFile();
//     if (selectedFile) {
//       // Handle the file upload or any additional logic here
//       console.log("Selected file:", selectedFile);
//     }
//   };

//   onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       const uid = user.uid;

//       const getUserData = async () => {
//         const q = query(collection(db, "user"), where("uid", "==", uid));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//           setUserData(doc.data());
//         });
//       };
//       getUserData();
//       return;
//     }
//   });

//   return (
//     <>
//       <div className="text-center font-semibold text-3xl mt-3">
//         <h1>My Profile</h1>
//       </div>

//       <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
//         {/* Profile Section */}
//         {userData && (
//           <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 mb-8 text-center flex justify-center flex-col items-center relative">
//             <div className="w-32 h-32 border-4 border-indigo-500 rounded-lg overflow-hidden shadow-lg relative">
//               <img
//                 src={userData.profile}
//                 alt="User Profile"
//                 className="w-full h-full object-cover text-center"
//               />
//               {/* Pencil Icon for editing */}
//               <div
//                 className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer"
//                 onClick={handleEditClick}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-indigo-500"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M15.232 5.232l3.536 3.536m-2.036-7.036a2.5 2.5 0 113.536 3.536L7.5 21H3v-4.5L16.732 3.732z"
//                   />
//                 </svg>
//               </div>

//               {/* Hidden File Input */}
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 className="hidden"
//                 accept="image/*"
//               />
//             </div>
//             <h2 className="text-2xl font-bold mt-4">{userData.userName}</h2>
//             <p className="text-gray-600">{userData.email}</p>
//           </div>
//         )}

//         {/* User Posts */}
//       </div>
//     </>
//   );
// }

// export default Profile;




















































































import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../../config/Firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Profile() {
  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null); // Reference to the file input element
  const [userDocId, setUserDocId] = useState(null); // Store user document ID

  // Open the file selector when the pencil icon is clicked
  const handleEditClick = () => {
    fileInputRef.current.click(); // Programmatically click the hidden file input
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Reference to the Firebase Storage location
    const storageRef = ref(storage, `profilePictures/${selectedFile.name}`);

    const uploadFile = () => {
      uploadBytes(storageRef, selectedFile)
        .then((snapshot) => {
          console.log("File uploaded!");

          // Get the download URL of the uploaded image
          getDownloadURL(storageRef)
            .then((url) => {
              console.log("Image URL:", url);

              // Update the profile picture URL in Firestore
              if (userDocId) {
                const userRef = doc(db, "user", userDocId);
                updateDoc(userRef, {
                  profile: url, // Update profile field in Firestore
                })
                  .then(() => {
                    console.log("Profile picture updated in Firestore");
                    setUserData((prev) => ({ ...prev, profile: url })); // Update the UI
                  })
                  .catch((err) => {
                    console.error("Error updating Firestore:", err);
                  });
              }
            })
            .catch((err) => {
              console.error("Error getting image URL:", err);
            });
        })
        .catch((err) => console.log("Error uploading file:", err));
    };

    uploadFile();
  };

  // Handle authentication state change
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        const getUserData = async () => {
          const q = query(collection(db, "user"), where("uid", "==", uid));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserData(doc.data());
            setUserDocId(doc.id); // Store document ID for future updates
          });
        };

        getUserData();
      }
    });
 

  return (
    <>
      <div className="text-center font-semibold text-3xl mt-3">
        <h1>My Profile</h1>
      </div>

      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        {/* Profile Section */}
        {userData && (
          <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 mb-8 text-center flex justify-center flex-col items-center relative">
            <div className="w-32 h-32 border-4 border-indigo-500 rounded-lg overflow-hidden shadow-lg relative">
              <img
                src={userData.profile}
                alt="User Profile"
                className="w-full h-full object-cover text-center"
              />
              {/* Pencil Icon for editing */}
              <div
                className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer"
                onClick={handleEditClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-7.036a2.5 2.5 0 113.536 3.536L7.5 21H3v-4.5L16.732 3.732z"
                  />
                </svg>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
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

export default Profile;
