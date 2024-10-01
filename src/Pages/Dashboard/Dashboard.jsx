
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cards from "../../components/Cards";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../config/Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";



function Dashboard() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //button text in a state

  const [buttonText, setButtonText] = useState(" Publish Blog");

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
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCardData(newData);
      }
    });
  }, []);

  const userBlog = (data) => {
    setButtonText(
      <span className="loading loading-spinner text-warning loading-md"></span>
    );

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
              setButtonText(" Publish Blog");
            };

            getData();
          });
        };

        getUserImageName();
      }
    });
  };

  const deleteBtn = async (index) => {
    console.log("delete button clicked!", index);

    console.log(cardData[index].id);

    const deleteDataFromFirestore = async () => {
      await deleteDoc(doc(db, "userblogs", cardData[index].id));
    };

    deleteDataFromFirestore();

    alert('Blog deleted sucessfully!')
  };

  //edit blog

  

  const editBtn = async(index) => {

    const editedTitle = prompt("Enter updated title");
    const editedDescription = prompt("Enter description");


    const washingtonRef = doc(db, "userblogs", cardData[index].id);
    await updateDoc(washingtonRef, {
  title: editedTitle,
  description: editedDescription
});

alert('Blog updated sucessfully!')


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
            {buttonText}
          </button>
        </div>
      </form>

      <h1 className="text-2xl text-center font-bold mt-[7rem]">My Blogs</h1>

      {cardData ? (
        cardData.map((item, index) => {
          return (
            <div key={index} className="mt-5">
              <Cards
                title={item.title}
                description={item.description}
                image={item.image}
                username={item.userName}
                date={item.date}
                editBtn={"Edit"}
                deleteBtn={"delete"}
                // onEditBtn={editBtn}
                onDeleteBtn={() => deleteBtn(index)}
                onEditBtn={() => editBtn(index)}
              />
            </div>
          );
        })
      ) : (
        <div className="text-center m-[20vh]">
          <span className="loading loading-spinner text-warning loading-lg"></span>
        </div>
      )}
    </>
  );
}

export default Dashboard;































































































































































































































































































