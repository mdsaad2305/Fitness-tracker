import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const EditLogs = ({ log }) => {
  const [muscle, setMuscle] = useState(log.muscle);
  const [difficulty, setDifficulty] = useState(log.difficulty);
  const [repetitions, setRepetitions] = useState(log.repetitions);
  const [sets, setSets] = useState(log.sets);
  const [notes, setNotes] = useState(log.notes);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateExercise = async (e) => {
    e.preventDefault();
    try {
      if (!log.log_id) {
        console.error("Invalid log ID");
        console.log({log});
        return; 
      }
  
      const updatedExercise = {
        muscle: muscle,
        difficulty: difficulty,
        repetitions: repetitions,
        sets: sets,
        notes: notes,
      };
  
      console.log("updatedExercise:", updatedExercise);
  
      await axios.put(`https://fitness-tracker-api-nr5n.onrender.com/${log.log_id}`, updatedExercise);
  
      setIsModalOpen(false);
      window.location = '/';
    } catch (error) {
      console.error(error);
    }
  };

  /*re-initialising inputs to its original value when user changes the inputs while editing
  , then cancels or exits the modal */
  const setAllInputs = async(e) => {
    setMuscle(log.muscle)
    setDifficulty(log.difficulty)
    setRepetitions(log.repetitions)
    setSets(log.sets)
    setNotes(log.notes)
  }

  return (
    <>
      <button
        className="bg-blue-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-blue-600 transition duration-300 mr-2"
        onClick={() => {
          setIsModalOpen(true)
          setAllInputs()
          }
        }
      >
        Edit
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Exercise Modal"
        className="w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white mx-auto mt-10 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Edit Exercise</h2>
        <h3 className=" text-xl font-semibold mb-3">{log.exercise_name}</h3>
        <form onSubmit={updateExercise}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold" htmlFor="muscle">
              Muscle:
            </label>
            <input
              type="text"
              id="muscle"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={muscle}
              onChange={(e) => setMuscle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold" htmlFor="difficulty">
              Difficulty:
            </label>
            <input
              type="text"
              id="difficulty"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold" htmlFor="repetitions">
              Repetitions:
            </label>
            <input
              type="number"
              id="repetitions"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={repetitions}
              onChange={(e) => setRepetitions(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold" htmlFor="sets">
              Sets:
            </label>
            <input
              type="number"
              id="sets"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold" htmlFor="notes">
              Notes:
            </label>
            <textarea
              id="notes"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mr-2">
              Save Changes
            </button>
            <button
              className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditLogs;
