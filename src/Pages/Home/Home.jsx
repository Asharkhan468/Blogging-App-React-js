import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/Firebase/firebaseConfig';

function Home() {

  const [homeCardData , setHomeCardData] = useState([]);

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
          <Cards title={item.title} description={item.description} date={'September, 12,2024'} username={'Ashar khan'} button1={'See All From This User'}/>
          </div>
        )
      }):<h1 className='text-5xl'>Loading...</h1>
    }
   </div>
   


   </>
  )
}

export default Home