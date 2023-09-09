import React, { useState, useEffect } from "react";
import axios from "axios";

const LogExercise = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [muscle, setMuscle] = useState("chest");
  const [difficulty, setDifficulty] = useState("easy");
  const [repetitions, setRepetitions] = useState(0);
  const [sets, setSets] = useState(0);
  const [notes, setNotes] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://fitness-tracker-api-nr5n.onrender.com/log-exercise")
      .then((response) => {
        setExerciseOptions(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const logData = {
      exercise_id: selectedOption,
      muscle,
      difficulty,
      repetitions,
      sets,
      notes,
    };

    try {
      await axios.post("https://fitness-tracker-api-nr5n.onrender.com/log-exercise", logData);
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-left ml-4">
        <h1 className="text-2xl font-semibold mb-4">Log Exercise</h1>
        <form onSubmit={handleSubmit}>
          <div className="border rounded-lg p-4 w-96">
            <div className="mb-4">
              <label htmlFor="exerciseType" className="block text-gray-600 font-semibold">
                Exercise Type
              </label>
              <select
                id="exerciseType"
                value={selectedOption}
                onChange={handleOptionChange}
                required
                className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select an option</option>
                {exerciseOptions.map((exercise) => (
                  <option key={exercise.exercise_id} value={exercise.exercise_id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="muscle" className="block text-gray-600 font-semibold">
                Muscle
              </label>
              <select
                id="muscle"
                value={muscle}
                onChange={(e) => setMuscle(e.target.value)}
                required
                className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="chest">Chest</option>
                <option value="shoulder">Shoulder</option>
                <option value="back">Back</option>
                <option value="bicep">Bicep</option>
                <option value="tricep">Tricep</option>
                <option value="legs">Legs</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="difficulty" className="block text-gray-600 font-semibold">
                Difficulty
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
                className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="difficult">Difficult</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="repetitions" className="block text-gray-600 font-semibold">
                Repetitions
              </label>
              <input
                type="number"
                id="repetitions"
                value={repetitions}
                onChange={(e) => setRepetitions(e.target.value)}
                required
                className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="sets" className="block text-gray-600 font-semibold">
                Sets
              </label>
              <input
                type="number"
                id="sets"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                required
                className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="notes" className="block text-gray-600 font-semibold">
                Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-32 px-2 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Log Exercise
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogExercise;
