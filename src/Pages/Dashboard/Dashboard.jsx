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

  // User UID
  const [userUid, setUserUid] = useState(null);
  const [buttonText, setButtonText] = useState(" Publish Blog");
  const currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();
  const blogDate = `${month}, ${date}, ${year}`;
  const [cardData, setCardData] = useState([]);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUserUid(uid);
        const q = query(collection(db, "userblogs"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCardData(newData);
      }
    });
  }, [cardData]);

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
              data.title = "";
              setButtonText(" Publish Blog");
            };

            getData();
          });
        };

        getUserImageName();
      }
    });
  };

  // Get updated data
  const getUpdatedData = async () => {
    const q = query(collection(db, "userblogs"), where("uid", "==", userUid));
    const querySnapshot = await getDocs(q);
    const newData = querySnapshot.docs.map((doc) => doc.data());
    setCardData(newData);
  };

  const deleteBtn = async (index) => {
    console.log("delete button clicked!", index);
    console.log(cardData[index].id);

    const deleteDataFromFirestore = async () => {
      await deleteDoc(doc(db, "userblogs", cardData[index].id));
    };

    deleteDataFromFirestore();
    getUpdatedData();
    alert("Blog deleted successfully!");
  };

  // Edit blog
  const editBtn = async (index) => {
    setEditData({
      title: cardData[index].title,
      description: cardData[index].description,
    });
    setCurrentEditIndex(index);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    const washingtonRef = doc(db, "userblogs", cardData[currentEditIndex].id);
    await updateDoc(washingtonRef, {
      title: editData.title,
      description: editData.description,
    });

    getUpdatedData();
    setIsEditing(false);
    alert("Blog updated successfully!");
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
          className="textarea textarea-bordered textarea-lg text-base md:text-lg w-full mb-4"
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

      {cardData.length > 0 ? (
        cardData.map((item, index) => (
          <div key={index} className="mt-5">
            <Cards
              title={item.title}
              description={item.description}
              image={item.image}
              username={item.userName}
              date={item.date}
              editBtn="Edit"
              deleteBtn="Delete"
              onDeleteBtn={() => deleteBtn(index)}
              onEditBtn={() => editBtn(index)}
            />
          </div>
        ))
      ) : (
        <h1 className="text-black">No Blog Uploaded</h1>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 m-[30vh]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              placeholder="Updated title"
              className="input input-bordered text-base w-full mb-4"
            />
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              placeholder="Updated description"
              className="textarea textarea-bordered text-base w-full mb-4"
            ></textarea>
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="btn btn-primary text-white"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-secondary text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;

















































































































































































































































































































































































































































































