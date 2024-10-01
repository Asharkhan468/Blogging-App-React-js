import React from 'react'

function Profile() {
  return (
    <>

    <div className='text-center font-semibold text-3xl mt-3'>
      <h1>My Profile</h1>
    </div>

    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 mb-8 text-center">
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/150"
            alt="User Profile"
            className="w-32 h-32 rounded-full border-4 border-indigo-500"
          />
        </div>
        <h2 className="text-2xl font-bold mt-4">Ashar Khan</h2>
        <p className="text-gray-600">ashar.khan@222.com</p>
      </div>

      {/* User Posts */}
     
    </div>
    </>
  );
}

export default Profile