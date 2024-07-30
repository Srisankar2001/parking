import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { Navbar } from './Components/Navbar/Navbar';
import { AppContext } from './Context/AppContext';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { Table } from './Components/Table/Table';
import { Usermode } from './Components/Usermode/Usermode';
import { UsermodeLeave } from './Components/UsermodeLeave/UsermodeLeave';


function App() {
  const _id = useContext(AppContext)
  return (
    <div className="App">
      <Router>
        {_id && <Navbar />}
        <Routes>
          {!_id && <Route path='/' element={<Login />} />}
          {!_id && <Route path='/register' element={<Register />} />}

          {_id && <Route path='/' element={<Dashboard />} />}
          {_id && <Route path='/table' element={<Table />} />}
          {_id && <Route path='/usermode' element={<Usermode />} />}
          {_id && <Route path='/usermodeleave' element={<UsermodeLeave />} />}
          {_id && <Route path='*' element={<Navigate to="/" />} />}

          {!_id && <Route path='*' element={<Navigate to="/" />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
