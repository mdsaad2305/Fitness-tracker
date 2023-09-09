import React from "react";
import { useState } from "react";
import axios from "axios";

const AddExercise = () => {
  const [exercise, setExercise] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = axios.post("https://fitness-tracker-api-nr5n.onrender.com/add-exercise", {
        exercise,
      });

      window.location = '/';

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="text-left mt-8">
        <h1 className="text-2xl font-semibold mb-4">Add Exercise</h1>
        <div className="border rounded-lg p-4">
          <input
            type="text"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            placeholder="Enter exercise..."
            className="w-48 px-2 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mt-2">
          <button
            type="submit"
            onClick={onSubmitForm}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExercise;
