import React , {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import Cards from '../../components/Cards';
import { addDoc, collection, query, where, getDocs } from "firebase/firestore"; 
import { db , auth } from '../../config/Firebase/firebaseConfig';
import {onAuthStateChanged } from "firebase/auth";


function Dashboard() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //create a state for card data

  const [cardData, setcardData] = useState([]);

  //genrate a date for the user blog

  const currentDate = new Date();

  const month = currentDate.toLocaleString("default", { month: "long" });
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  const userBlog = (data) => {
    //use onauth state change for user uid fo only loggedin user blogs

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        const getUserImageAndName = async () => {
          const q = query(collection(db, "user"), where("uid", "==", uid));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            //store the blog and user image name etc in db

            const storeBlogToDb = async () => {
              const docRef = await addDoc(collection(db, "userblogs"), {
                userName: doc.data().userName,
                image: doc.data().profile,
                title: data.title,
                description: data.description,
                date: date,
            
              });
              console.log("Document written with ID: ", docRef.id);
            };

            storeBlogToDb();

            //get the above stored data from firestore

            const getStoredData = async () => {
              const querySnapshot = await getDocs(collection(db, "userblogs"));
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setcardData([doc.data() , ...cardData]);
                console.log(cardData);
                
              });
            };
            getStoredData();
          });
        };

        getUserImageAndName();

        return;
      }
    });
  };

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

     {
      cardData.length!=0 ? cardData.map((item) => {
        return(
          <div>
            <Cards title={item.title} description={item.description} image={item.image} username={item.userName}/>
          </div>
        )

      }):<h1>No Blog upload</h1>     }
    </>
  );
}

export default Dashboard