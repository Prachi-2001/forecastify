import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between p-4 bg-gray-600">
        <div className="flex">
          <img className="w-10 h-10" src="/logo.png" alt="" />
          <Link to="/">
            <h2 className="font-bold ml-2 text-white sm:text-3xl text-xl">
              Forecastify
            </h2>
          </Link>
        </div>
        <div>
          <Link to="/search" target="_blank">
            <button className="p-2 bg-cyan-500 text-sm sm:text-md text-white rounded-md">
              Weather Search
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
