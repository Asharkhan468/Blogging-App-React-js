
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cards from "../../components/Cards";
import { addDoc, collection, query, where, getDocs , deleteDoc } from "firebase/firestore";
import { db, auth } from "../../config/Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

function Dashboard() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  const blogDate = `${month} , ${date}, ${year}`;

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const q = query(collection(db, "userblogs"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const newData = querySnapshot.docs.map((doc) => doc.data());
        setCardData(newData);
      }
    });
  }, []);

  const userBlog = (data) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        const getUserImageName = async () => {
          const q = query(collection(db, "user"), where("uid", "==", uid));

         

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const setUserBlogInFirestore = async () => {
              const docRef = await addDoc(collection(db, "userblogs"), {
                title: data.title,
                description: data.description,
                image: doc.data().profile,
                userName: doc.data().userName,
                date: blogDate,
                uid: uid,
              });
              console.log("Document written with ID: ", docRef.id);

              
            };

            setUserBlogInFirestore();

            const getData = async () => {
              const q = query(
                collection(db, "userblogs"),
                where("uid", "==", uid)
              );

              const querySnapshot = await getDocs(q);
              const newData = querySnapshot.docs.map((doc) => doc.data());
              setCardData(newData);
              console.log(cardData);
            };

            getData();
          });
        };

        getUserImageName();
      }
    });
  };

  // const editBtn = () => {
  //   console.log('edit button clicked!');
    
  // }

  const deleteBtn = async(index) => {
    console.log('delete button clicked!' , index);

    console.log(cardData[index]);

  


  }

  
   
  

  

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-3">Dashboard</h1>

      <form
        onSubmit={handleSubmit(userBlog)}
        className="border p-6 sm:p-8 lg:p-10 mx-4 sm:mx-auto mt-7 flex flex-col shadow-2xl rounded-xl border-gray-300 max-w-xl sm:max-w-2xl lg:max-w-4xl"
      >
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Enter a title..."
          className="input input-bordered text-base md:text-lg w-full mb-4"
        />
        <br />
        {errors.title && (
          <span className="text-red-600">This field is required</span>
        )}

        <textarea
          {...register("description", { required: true })}
          placeholder="What's on your mind?"
          className="textarea textarea-bordered textarea-lg 
          text-base md:text-lg w-full mb-4"
        ></textarea>
        {errors.description && (
          <span className="text-red-600">This field is required</span>
        )}

        <div className="mt-4 flex justify-center lg:justify-start">
          <button className="btn btn-primary text-white w-full sm:w-auto px-6 py-3 text-sm sm:text-base lg:text-lg">
            Publish Blog
          </button>
        </div>
      </form>

      <h1 className="text-2xl text-center font-bold mt-[7rem]">My Blogs</h1>

      {cardData.length != 0 ? (
        cardData.map((item , index) => {
          return (
            <div key={index} className="mt-5">
              <Cards
                title={item.title}
                description={item.description}
                image={item.image}
                username={item.userName}
                date={item.date}
                editBtn={"Edit"}
                deleteBtn={'Delete'}
                // onEditBtn={editBtn}
                onDeleteBtn={() => deleteBtn(index)}
              />
            </div>
          );
        })
      ) : (
        <h1 className="text-center font-bold text-lg mt-9">No Blog uploaded</h1>
      )}
    </>
  );
}

export default Dashboard;
























































































































































