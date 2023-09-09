import './App.css';
import AddExercise from './components/AddExercise';
import LogExercise from './components/LogExercise';
import Navbar from './components/Navbar';
import Display from './components/Display';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' Component={Display} />
          <Route path="/add-exercise" Component={AddExercise} />
          <Route path="/log-exercise" Component={LogExercise} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

