import React, { useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'

import {Logout} from "../../Functions/Logout"
import home from "../../Assets/home.png"
import table from "../../Assets/table.png"
import user from "../../Assets/user.png"
import logout from "../../Assets/logout.png"
import login from "../../Assets/login.png"
import parking from "../../Assets/parking.png"
import no_parking from "../../Assets/no-parking.png"

export const Navbar = () => {
  const [state, setState] = useState("home")
  const [isUsermode, setIsUsermode] = useState(false)
  return (
    <nav className='navbar'>
      <ul>
       {!isUsermode &&  <li className={state === "home" ? 'selected' : null} onClick={() => {
          setState("home")
          setIsUsermode(false)
        }}><Link to="/dashboard"><img src={home} alt='' /><span>Dashboard</span></Link></li>}
        {!isUsermode && <li className={state === "table" ? 'selected' : null} onClick={() => { 
          setState("table") 
          setIsUsermode(false)
          }}><Link to="/table" ><img src={table} alt='' /><span>Table</span></Link></li>}
        {!isUsermode && <li className={state === "user" ? 'selected' : null} onClick={() => {
          setState("user")
          setIsUsermode(true)
        }}><Link to="/usermode" ><img src={user} alt='' /><span>User Mode</span></Link></li>}
        {isUsermode && <li className={state === "park" ? 'selected' : null} onClick={() => {
          setState("park")
          setIsUsermode(true)
        }}><Link to="/usermode" ><img src={parking} alt='' /><span>Park</span></Link></li>}
       {isUsermode &&  <li className={state === "leave" ? 'selected' : null} onClick={() => {
          setState("leave")
          setIsUsermode(true)
        }}><Link to="/usermodeleave" ><img src={no_parking} alt='' /><span>Leave</span></Link></li>}
      </ul>
      <ul>
        { isUsermode ?
          <li><Link to="/"><img src={login} alt='' /><span>Login</span></Link></li>
          :
          <li onClick={()=>{Logout()}}><Link to="/"><img src={logout} alt='' /><span>Logout</span></Link></li>}
      </ul>
    </nav>
  )
}
