import React, { useEffect, useState } from "react";
import axios from "axios";
import EditLogs from "./EditLogs";

const Display = () => {
  const [logsData, setLogsData] = useState([]);

  useEffect(() => {
    axios
      .get("https://fitness-tracker-api-nr5n.onrender.com/")
      .then((response) => {
        setLogsData(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const deleteLog = async (log_id) => {
    try {
      await axios.delete(`https://fitness-tracker-api-nr5n.onrender.com/${log_id}`);
      setLogsData((prevLogsData) => prevLogsData.filter((log) => log.log_id !== log_id));
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Exercise Logs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Exercise Name</th>
              <th className="px-4 py-2">Muscle</th>
              <th className="px-4 py-2">Difficulty</th>
              <th className="px-4 py-2">Repetitions</th>
              <th className="px-4 py-2">Sets</th>
              <th className="px-4 py-2">Notes</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logsData.map((log, index) => ( // log gets the individual items in logsdata and index is well the index
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="px-4 py-2 text-center">{log.exercise_name}</td>
                <td className="px-4 py-2 text-center">{log.muscle}</td>
                <td className="px-4 py-2 text-center">{log.difficulty}</td>
                <td className="px-4 py-2 text-center">{log.repetitions}</td>
                <td className="px-4 py-2 text-center">{log.sets}</td>
                <td className="px-4 py-2 text-center">{log.notes}</td>
                <td className="px-4 py-2 text-center">
                  <EditLogs log = {log}/>
                  <button
                    className="bg-red-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300"
                    onClick={() => deleteLog(log.log_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Display;
