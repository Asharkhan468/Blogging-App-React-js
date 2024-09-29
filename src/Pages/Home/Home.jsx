import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/Firebase/firebaseConfig';
import { json, useNavigate } from 'react-router-dom';

function Home() {

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
    //  navigate("/singleBlog");
     
   };



  

  









  return (
   <>
   <div className='mt-4'>
    <h1 className='text-3xl font-bold text-center'>All Blogs</h1>
   </div>

   <div className='mt-5'>
    {
      homeCardData ? homeCardData.map((item , index) => {
        return(
          <div className='mt-3' key={index}>
          <Cards title={item.title} description={item.description} date={item.date} username={item.userName} image={item.image} onButtonClick={() => singleBlog(index)} button={'All From This User'}/>
          </div>
        )
      }):<h1 className='text-5xl'>Loading...</h1>
    }
   </div>
   


   </>
  )
}

export default Home