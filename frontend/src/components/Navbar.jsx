import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"
import {FaBars} from 'react-icons/fa'
import {ImCross} from 'react-icons/im'

const Header = () => {

  const [mobile, setMobile] = useState(false)

  return (
  <nav className='nav-bar'>
    
      <h3 className='logo'>Logo</h3>
      <ul className={mobile ? 'nav-links-mobile':'nav-links'} onClick={()=>setMobile(false)}>
        <Link to ='/becomeTeacher'><li>Become a Teacher</li></Link>
        <Link to ='/register'><li>Register</li></Link>
        <Link to ='/login'><li>Login</li></Link>
      </ul>
      <button className='menu-icon' onClick={()=>setMobile(!mobile)}>
      {mobile ? <ImCross/>:<FaBars />}
      </button>

  </nav>
  )
}

export default Header