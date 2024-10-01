import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/Firebase/firebaseConfig';
import { json, useNavigate } from 'react-router-dom';

function Home() {

  //show greeting to user according to the time 

  const [greeting, setGreeting] = useState('');
  const Greeting = () => {

  useEffect(() => {
    const currentHour = new Date().getHours();
    let message;

    if (currentHour < 12) {
      message = 'Good Morning Readers! ☀️';
    } else if (currentHour < 18) {
      message = 'Good Afternoon Readers! 😎';
    } else {
      message = 'Good Evening Readers! 🌙';
    }

    setGreeting(message);
  }, []); // This e

}

Greeting()




  const [homeCardData , setHomeCardData] = useState([]);

  //navigate 

  const navigate = useNavigate()

 

  //get data from the firebase

  
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "userblogs"));
      querySnapshot.forEach((doc) => {
        homeCardData.push(doc.data());
        setHomeCardData([...homeCardData]);
        console.log(homeCardData);
        
      
        
      });
    };

  useEffect(() => {

    getData()

  } , [])


   const singleBlog = (index) => {
     console.log("single blog clicked", index);
     console.log(homeCardData[index]);
     
     let storeSingleBlogToLocalStore=[];

     storeSingleBlogToLocalStore.push(homeCardData[index])
     localStorage.setItem('userSingleBlog' , JSON.stringify(storeSingleBlogToLocalStore))
     navigate("/singleBlog");
     
   };



  

  









  return (
    <>
      {/* <div className="mt-4">
        <h1 className="text-3xl font-semibold text-center">{greeting}</h1>
      </div>

      <div className="mt-[40px]">
        <h1 className="text-2xl font-bold text-center">All Blogs</h1>
      </div>

      <div className="mt-5">
        {homeCardData.length != 0 ? (
          homeCardData.map((item, index) => {
            return (
              <div className="mt-3" key={index}>
                <Cards
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  username={item.userName}
                  image={item.image}
                  onButtonClick={() => singleBlog(index)}
                  button={"All From This User"}
                />
              </div>
            );
          })
        ) : (
          <div className="text-center m-[20vh]">
            <span className="loading loading-spinner text-warning loading-lg"></span>
          </div>
        )}
      </div> */}

      <div className="mt-4 px-4 md:px-8 lg:px-16">
        <h1 className="text-2xl font-semibold text-center">{greeting}</h1>
      </div>

      <div className="mt-10 px-4 md:px-8 lg:px-16">
        <h1 className="text-2xl font-bold text-center">All Blogs</h1>
      </div>

      <div className="mt-5 px-4 md:px-8 lg:px-16">
        {homeCardData.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {homeCardData.map((item, index) => (
              <div className="mt-3" key={index}>
                <Cards
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  username={item.userName}
                  image={item.image}
                  onButtonClick={() => singleBlog(index)}
                  button={"All From This User"}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center my-10">
            <span className="loading loading-spinner text-warning loading-lg"></span>
          </div>
        )}
      </div>
    </>
  );
}

export default Home