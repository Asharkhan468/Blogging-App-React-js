import React, { useState, useEffect } from "react";

const SuccessAlert = ({ message, visible, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      // Automatically close the alert after 3 seconds
      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, 3000);
      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [visible, onClose]);

  return (
    show && (
      <div className="fixed top-5 right-5 max-w-sm w-full bg-green-500 text-white p-4 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out z-50">
        <div className="flex justify-between items-center">
          <p className="font-semibold">{message}</p>
          <button onClick={() => setShow(false)} className="ml-4">
            ✖
          </button>
        </div>
        <div className="h-1 bg-green-300 rounded mt-2 animate-pulse"></div>
      </div>
    )
  );
};

export default SuccessAlert;
