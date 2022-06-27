import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./navbar.css"
import {FaBars} from 'react-icons/fa'
import {ImCross} from 'react-icons/im'

const StudentNavbar = () => {

  const [mobile, setMobile] = useState(false)
  const history = useNavigate ()

  function logout(){
    localStorage.clear()
    history('/', { replace: true })
    window.location.reload(true)
  }

  return (
  <nav className='nav-bar'>
    
      <h3 className='logo'>Student</h3>
      <ul className={mobile ? 'nav-links-mobile':'nav-links'} onClick={()=>setMobile(false)}>
        <Link to ='/'><li>Home</li></Link>
        <Link to ='/profile'><li>Profile</li></Link>
        <li onClick={logout}>Logout</li>
      </ul>
      <button className='menu-icon' onClick={()=>setMobile(!mobile)}>
      {mobile ? <ImCross/>:<FaBars />}
      </button>

  </nav>
  )
}

export default StudentNavbar