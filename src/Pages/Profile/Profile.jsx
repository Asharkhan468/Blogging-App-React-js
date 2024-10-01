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
        <h2 className="text-2xl font-bold mt-4">John Doe</h2>
        <p className="text-gray-600">john.doe@example.com</p>
      </div>

      {/* User Posts */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">My First Post</h3>
          <p className="text-gray-600">Lorem ipsum dolor sit amet...</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Learning React</h3>
          <p className="text-gray-600">
            React is a powerful JavaScript library...
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Understanding Redux</h3>
          <p className="text-gray-600">
            Redux helps in managing application state...
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">
            My Journey with JavaScript
          </h3>
          <p className="text-gray-600">
            JavaScript has evolved over the years...
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Profile