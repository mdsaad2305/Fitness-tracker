import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-center items-center">
        <span className="text-white font-bold text-xl">Fitness-tracker</span>
      </div>
      <div className="flex justify-center mt-4">
        <Link
          to="/"
          className="text-white border border-gray-200 px-4 py-2 mx-2 hover:bg-gray-200 hover:text-blue-500 rounded-lg"
        >
          Tracker Home
        </Link>
        <Link
          to="/log-exercise"
          className="text-white border border-gray-200 px-4 py-2 mx-2 hover:bg-gray-200 hover:text-blue-500 rounded-lg"
        >
          Log Exercise
        </Link>
        <Link
          to="/add-exercise"
          className="text-white border border-gray-200 px-4 py-2 mx-2 hover:bg-gray-200 hover:text-blue-500 rounded-lg"
        >
          Add Exercise
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

