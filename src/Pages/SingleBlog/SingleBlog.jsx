// import React, { useState } from 'react'
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from '../../config/Firebase/firebaseConfig';
// import Cards from '../../components/Cards';

// function SingleBlog() {

//   const getData = JSON.parse(localStorage.getItem("userSingleBlog"));

//   const uid = getData[0].uid;

//   const [userBlog , setUserBlog] = useState([]);
  

//  //get single user data from firebase

//  const getSingleUserBlog = async() => {

//   const q = query(collection(db, "userblogs"), where("uid", "==", uid));

//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//     setUserBlog(doc.data() , ...userBlog)
//   });

//  }

//  getSingleUserBlog()



//   return (
//     <>

//     <div>
//       {

//         userBlog.length!=0 ? userBlog.map((item , index) => {
//           return(
//             <Cards/>
//           )
//         }):<h1>No post found...</h1>

//       }
//     </div>
      
//     </>
//   );
// }

// export default SingleBlog


import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/Firebase/firebaseConfig";
import Cards from "../../components/Cards";

function SingleBlog() {
  const getData = JSON.parse(localStorage.getItem("userSingleBlog"));
  const uid = getData[0].uid;

  const [userBlog, setUserBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserBlog = localStorage.getItem("userBlog");
    if (storedUserBlog) {
      setUserBlog(JSON.parse(storedUserBlog));
      setLoading(false);
    } else {
      getSingleUserBlog();
    }
  }, []);

  const getSingleUserBlog = async () => {
    const q = query(collection(db, "userblogs"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const blogData = [];
    querySnapshot.forEach((doc) => {
      blogData.push(doc.data());
    });
    setUserBlog(blogData);
    setLoading(false);
  };


  


  return (
    <>
      <div className="flex flex-col items-center p-6 space-y-6 bg-gray-100 min-h-screen">
        {/* User Profile Section */}
        <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg w-full max-w-sm">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHaaCIKM5nWOuJsfYmYKK0YsuVsdZ2s-1eqQ&s"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">Ashar</h2>
          {/* <p className="text-gray-600">cmcmcmcmmc</p> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {userBlog.length != 0 ? (
            userBlog.map((item, index) => (
              <Cards
                key={index}
                title={item.title}
                description={item.description}
                image={item.image}
                username={item.userName}
                date={item.date}
              />
            ))
          ) : (
            <div className="text-center m-[20vh] flex justify-center">
              <span className="loading loading-spinner text-warning loading-lg"></span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SingleBlog;



{/* <div className="flex flex-col md:flex-row items-start justify-center p-6 bg-gray-50 min-h-screen">
  {/* User Profile Section */}
  // <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/4 mb-6 md:mb-0">
  //   <div className="flex justify-center mb-4">
  //     <img
  //       className="h-32 w-32 object-cover rounded-lg border-4 border-blue-500"
  //       src="https://images.unsplash.com/photo-1727299028177-ab72188797d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1NXx8fGVufDB8fHx8fA%3D%3D"
  //       alt="User Profile"
  //     />
  //   </div>
  //   <h2 className="text-2xl font-bold text-gray-800 text-center">Ashar</h2>
  //   <p className="text-gray-600 text-center">asharullah.khan123@gmail.com</p>
  // </div>

  // {/* User Posts Section */}
  // <div className="flex flex-col w-full md:w-3/4 md:ml-6">
  //   <h3 className="text-xl font-semibold text-gray-800 mb-4">User Posts</h3>

  //   {loading ? (
  //     <h1>Loading...</h1>
  //   ) : userBlog.length !== 0 ? (
  //     userBlog.map((item, index) => {
  //       return (
  //         <Cards
  //           key={index}
  //           image={item.image}
  //           title={item.title}
  //           description={item.description}
  //           date={item.date}
  //           username={item.userName}
  //         />
  //       );
      // })
//     ) : (
//       <h1>No post found...</h1>
//     )}
//   </div>
// </div>; */}