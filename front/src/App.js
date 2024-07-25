import React, { useContext } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
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
      {_id && <Navbar/>}
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/table' element={<Table/>}/>
        <Route path='/usermode' element={<Usermode/>}/>
        <Route path='/usermodeleave' element={<UsermodeLeave/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
