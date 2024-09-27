import React from 'react'

function Cards() {

    const currentDate = new Date();

    const month = currentDate.toLocaleString("default", { month: "long" });
    const date = currentDate.getDate();
    const year = currentDate.getFullYear();


  return (
    <>
      <div className="max-w-2xl mx-auto p-6 border border-gray-300 shadow-lg rounded-lg">
        {/* User Image and Title Side by Side  */}
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-md overflow-hidden border-2 border-gray-300">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/react-blogging-app-39602.appspot.com/o/profile?alt=media&token=576b6648-56e1-4592-8ffb-56c6f7303cf9"
              alt="User"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Title */}
          <div className="ml-4">
            <h2 className="text-xl font-bold">Blog Title Here</h2>
            {/* Username and Date */}
            <div className="text-sm text-gray-600">
              <span className="font-medium">John Doe</span> •{" "}
              <span>
                {month}, {date},{year}
              </span>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="mt-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum amet
            nihil minus iure! Id pariatur, officiis quod eum praesentium
            asperiores nisi obcaecati consectetur iste ratione odit voluptate
            veritatis, iure nostrum! Cupiditate, vero dignissimos debitis
            possimus deserunt libero eveniet voluptatem dolore molestiae,
            necessitatibus pariatur, similique accusantium dolores aperiam
            numquam? In perferendis simiitiis, dicta quod. Vitae minima et
            libero debitis. Dicta, animi.nemutem sit nostrum, laboriosam
            suscipit mollitia illo officiis repellat ab repellendus vitae ipsam
            id odio sint. Aspernatur, doloremque repellat? Omnis suscipit
            deserunt quas reiciendis asperiores est. Sequi, sit quis quasi in
            nisi unde odio, exercitationem esse praesentium ducimus voluptate
            laborum doloremque nemo officiis consequuntur eveniet id rerum at
            tempore?
          </p>
        </div>
        <div className="mt-5">
          <button className="text-primary">Edit</button>
          <button className="pl-6 text-primary">delete</button>
        </div>
      </div>
    </>
  );
}

export default Cards