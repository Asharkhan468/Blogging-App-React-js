// import React from 'react'

// function Cards({image , title , username , date , description , onButtonClick , editBtn , deleteBtn , button , onEditBtn , onDeleteBtn}) {

  

//   return (
//     <>
//       <div className="max-w-2xl mx-auto p-6 border border-gray-300 shadow-lg rounded-lg">
//         {/* User Image and Title Side by Side  */}
//         <div className="flex items-center">
//           <div className="w-16 h-16 rounded-md overflow-hidden border-2 border-gray-300">
//             <img
//               src={image}
//               alt="User"
//               className="object-cover w-full h-full"
//             />
//           </div>
//           {/* Title */}
//           <div className="ml-4">
//             <h2 className="text-xl font-bold">{title}</h2>
//             {/* Username and Date */}
//             <div className="text-sm text-gray-600">
//               <span className="font-medium">{username}</span> •{" "}
//               <span>
//                {date}
//               </span>
//             </div>
//           </div>
//         </div>
//         {/* Description */}
//         <div className="mt-4">
//           <p>
//             {description}
//           </p>
//         </div>
//         <div className="mt-5">
//           <button onClick={onButtonClick} className="text-primary">{button}</button>
//           <button onClick={onEditBtn} className="pl-6 text-primary">{editBtn}</button>
//           <button onClick={onDeleteBtn} className="pl-6 text-primary">{deleteBtn}</button>
          
//         </div>
//       </div>
//     </>
//   );
// }

// export default Cards





















import React, { useState } from "react";

function Cards({
  image,
  title,
  username,
  date,
  description,
  onButtonClick,
  editBtn,
  deleteBtn,
  button,
  onEditBtn,
  onDeleteBtn,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle full description view
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to display limited words
  const getTextPreview = (text) => {
    const words = text.split(" ");
    if (words.length > 10 && !isExpanded) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return text;
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 border border-gray-300 shadow-lg rounded-lg">
        {/* User Image and Title Side by Side */}
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-md overflow-hidden border-2 border-gray-300">
            <img
              src={image}
              alt="User"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Title */}
          <div className="ml-4">
            <h2 className="text-xl font-bold">{title}</h2>
            {/* Username and Date */}
            <div className="text-sm text-gray-600">
              <span className="font-medium">{username}</span> •{" "}
              <span>{date}</span>
            </div>
          </div>
        </div>

        {/* Description with limited words */}
        <div className="mt-4">
          <p>{getTextPreview(description)}</p>
          {description.split(" ").length > 10 && (
            <button onClick={toggleText} className="text-blue-500">
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-5">
          <button onClick={onButtonClick} className="text-primary">
            {button}
          </button>
          <button onClick={onEditBtn} className="pl-6 text-primary">
            {editBtn}
          </button>
          <button onClick={onDeleteBtn} className="pl-6 text-primary">
            {deleteBtn}
          </button>
        </div>
      </div>
    </>
  );
}

export default Cards;
