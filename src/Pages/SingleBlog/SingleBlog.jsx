
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/Firebase/firebaseConfig";
import Cards from "../../components/Cards";

function SingleBlog() {
  const getData = JSON.parse(localStorage.getItem("userSingleBlog"));
  const profile = getData[0].image;
  const uid = getData[0].uid;

  //user image and email


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
      

      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        {/* Profile Section */}
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 mb-8 text-center flex justify-center flex-col items-center">
          <div className="w-32 h-32 border-4 border-indigo-500 rounded-lg overflow-hidden shadow-lg ">
            <img
              src={getData[0].image}
              alt="User Profile"
              className="w-full h-full object-cover text-center"
            />
          </div>
          <h2 className="text-2xl font-bold mt-4">{getData[0].userName}</h2>
        </div>
        {/* User Posts */}

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Posts</h3>

        <div className="flex justify-center w-full md:w-3/2 md:ml-6 gap-3 flex-wrap">
          {loading ? (
            <div className="text-center my-10">
              <span className="loading loading-spinner text-warning loading-lg"></span>
            </div>
          ) : userBlog.length !== 0 ? (
            userBlog.map((item, index) => {
              return (
                <Cards
                  key={index}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  username={item.userName}
                />
              );
            })
          ) : (
            <h1>No post found...</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default SingleBlog;



