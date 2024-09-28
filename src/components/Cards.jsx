import React from 'react'

function Cards({image , title , username , date , description , button1 , button2}) {

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 border border-gray-300 shadow-lg rounded-lg">
        {/* User Image and Title Side by Side  */}
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
              <span>
               {date}
              </span>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="mt-4">
          <p>
            {description}
          </p>
        </div>
        <div className="mt-5">
          <button className="text-primary">{button1}</button>
          <button className="pl-6 text-primary">{button2}</button>
        </div>
      </div>
    </>
  );
}

export default Cards